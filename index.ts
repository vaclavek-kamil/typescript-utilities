const CONSTANTS = {
  useStateLogger: {
    lookBackLimit: 50,
  },
};

export interface DelayConfig {
  pathToCurrentTokens: string[]; //   these paths will be used on the callback response to navigate through the data structure and access the values
  pathToMaxTokens: string[]; //   which will be used to determine whether the execution needs to be slown down and by what amount
  delay: number; //    ms
  activateAtPercentage: number; // determines the percentage of API
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Starts a specified amount of concurent threads, executing the passed fallback
 * with the items from the passed data array as the argument.
 * @param data - Array of inputs for the callback
 * @param threads - Amount of concurent threads
 * @param [delayConfig] - Configuraion object for the delay
 * @param delayConfig.pathToCurrentTokens - Array of keys defining the path to the current amount of api tokens withing the object returned by the callback.
 * @param delayConfig.pathToMaxTokens - Array of keys defining the path to the maximal amount of api tokens withing the object returned by the callback.
 * @param delayConfig.activateAtPercentage - When the current tokens fall under this percentage, the delay will be applied within the thread before executing the next callback.
 * @param delayConfig.delay - Miliseconds the delay will span
 */

export const executeConcurently = async (
  callback: (...arg: any) => Promise<any>,
  data: any[],
  threads: number,
  delayConfig?: DelayConfig,
) => {
  //create queues
  let queues: Array<Array<(...arg: any) => any>> = [];
  let assigner = 0;
  for (const item of data) {
    queues[assigner]
      ? queues[assigner].push(item)
      : (queues[assigner] = [item]);
    assigner++;
    assigner >= threads && (assigner = 0);
  }

  const executeQueue = async (queueOfItems: Array<any>) => {
    for (let i = 0; i < queueOfItems.length; i++) {
      const response = await callback(queueOfItems[i]);

      if (!delayConfig?.pathToCurrentTokens || !delayConfig?.pathToMaxTokens) {
        continue;
      }

      const currentTokens: any = accessNestedValueWithDynamicPath(
        response,
        delayConfig.pathToCurrentTokens,
      );
      const maxTokens: any = accessNestedValueWithDynamicPath(
        response,
        delayConfig.pathToMaxTokens,
      );

      if (
        currentTokens <
        maxTokens * (delayConfig.activateAtPercentage / 100)
      ) {
        await delay(delayConfig.delay);
      }
    }
  };

  await Promise.all(queues.map((queue) => executeQueue(queue)));
};

export const accessNestedValueWithDynamicPath = (
  currentValue: any,
  path: string[],
): any => {
  if (!currentValue) {
    return undefined;
  }
  if (path.length == 1) {
    return currentValue;
  }

  path.shift();
  return accessNestedValueWithDynamicPath(currentValue[path[0]], path);
};

type lineCharacter = string & { length: 1 };

export interface StateLoggerLineConfig {
  startEdge: string;
  endEdge: string;
  sideCharacter: lineCharacter;
  lineCharacters: lineCharacter[];
}

export interface Log {
  content: string;
  lineSpan: number;
}

export const useStateLogger = () => {
  let logs: Log[] = [];

  const log = (input: any) => {
    const terminalWidth = process.stdout.columns || 80;
    console.log(`${input}`);
    logs.push({
      content: `${input}`,
      lineSpan: Math.ceil(`${input}`.length / terminalWidth),
    });
  };

  /**
   * @returns { stateLogger, log } Returns a stateLogger function which rewrites it's previous output and log - a console.log wrapper. This is because using normal console.log would break the functionality of the stateLogger. Multiple stateLoggers can work independently (with separate start and end edges)
   */
  const stateLogger = (
    logString: string,
    lineConfig: StateLoggerLineConfig = {
      startEdge: "| % # =",
      endEdge: "= # % |",
      lineCharacters: [" ", "-"] as lineCharacter[],
      sideCharacter: "|" as lineCharacter,
    },
  ): void => {
    // Compose state logger output
    const terminalWidth = process.stdout.columns || 80;
    const edgeMarkerLength =
      lineConfig.startEdge.length + lineConfig.endEdge.length;
    let middleWidth = terminalWidth - edgeMarkerLength;
    let shouldWrap = false;
    if (logString.length <= terminalWidth + 4) {
      middleWidth = logString.length - edgeMarkerLength + 4;
      shouldWrap = true;
    }
    let middle = "";
    for (let i = 0; i < middleWidth; i++) {
      middle += lineConfig.lineCharacters[i % lineConfig.lineCharacters.length];
    }
    const edgeLineCandidate = `${lineConfig.startEdge}${middle}${lineConfig.endEdge}`;
    const edgeLine =
      edgeLineCandidate.length <= terminalWidth ? edgeLineCandidate : "";

    // Itterate over current logs from end to start. Save logs from after last state log for re-print. Look until the previous state log. During progress through logs array, also delete logs from the console.
    let edgeLinesToDelete = 2;
    let logsToPreserve = [];
    let attempts = CONSTANTS.useStateLogger.lookBackLimit;

    for (const priorLog of logs.reverse()) {
      attempts--;
      logs.pop();

      for (let i = 0; i < priorLog.lineSpan; i++) {
        process.stdout.write("\x1b[1A"); // Move the cursor up by one line
        //process.stdout.write("\x1b[1A"); // Move the cursor up by one line
        //process.stdout.write("\x1b[2K"); // Clear the current line
        process.stdout.write("\x1b[2K"); // Clear the current line
      }

      if (
        priorLog.content.includes(lineConfig.startEdge) &&
        priorLog.content.includes(lineConfig.startEdge)
      ) {
        edgeLinesToDelete--;
      } else if (edgeLinesToDelete == 2) {
        logsToPreserve.push(priorLog);
      }

      // Stop at a certain limit. This is a performance matter.
      if (attempts == 0) {
        break;
      }
    }
    for (const logToPreserve of logsToPreserve) {
      console.log(logToPreserve.content);
    }

    // Trash logs if any are left by chance (error handling prayge style)
    logs.filter(() => false);

    // Output the state logger output
    log(edgeLine);
    log(
      shouldWrap
        ? `${lineConfig.sideCharacter} ${logString} ${lineConfig.sideCharacter}`
        : logString,
    );
    log(edgeLine);
  };
  return { stateLogger, log };
};
