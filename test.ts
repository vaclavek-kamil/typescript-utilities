import { delay, useStateLogger } from ".";

const { stateLogger, log } = useStateLogger();

// Define a single constant for delay time
const DELAY_TIME = 3000; // You can change this value to any delay you'd like

(async () => {
  stateLogger(`Current progress: 1/40`);
  await delay(DELAY_TIME);

  stateLogger(`Current progress: 2/40`);
  await delay(DELAY_TIME * 1.5); // Example of changing delay by multiplying the constant

  log("Update: Everything’s moving quickly!");
  await delay(DELAY_TIME);

  stateLogger(`Current progress: 3/40`);
  await delay(DELAY_TIME * 0.75);

  stateLogger(`Current progress: 4/40`);
  await delay(DELAY_TIME * 1.2);

  stateLogger(`Current progress: 5/40`);
  await delay(DELAY_TIME * 0.8);

  stateLogger(`Current progress: 6/40`);
  await delay(DELAY_TIME * 0.9);

  stateLogger(`Current progress: 7/40`);
  await delay(DELAY_TIME * 0.7);

  stateLogger(`Current progress: 8/40`);
  await delay(DELAY_TIME);

  stateLogger(`Current progress: 9/40`);
  await delay(DELAY_TIME * 1.5);

  stateLogger(`Current progress: 10/40`);
  await delay(DELAY_TIME * 1.3);

  log("Things are moving fast now. Almost halfway!");
  await delay(DELAY_TIME * 1.5);

  stateLogger(`Current progress: 11/40`);
  await delay(DELAY_TIME);

  stateLogger(`Current progress: 12/40`);
  await delay(DELAY_TIME * 0.75);

  stateLogger(`Current progress: 13/40`);
  await delay(DELAY_TIME * 1.2);

  stateLogger(`Current progress: 14/40`);
  await delay(DELAY_TIME * 0.9);

  stateLogger(`Current progress: 15/40`);
  await delay(DELAY_TIME * 0.8);

  stateLogger(`Current progress: 16/40`);
  await delay(DELAY_TIME);

  log("Update: We're halfway there, doing great!");
  await delay(DELAY_TIME);

  stateLogger(`Current progress: 17/40`);
  await delay(DELAY_TIME * 0.75);

  stateLogger(`Current progress: 18/40`);
  await delay(DELAY_TIME * 1.1);

  stateLogger(`Current progress: 19/40`);
  await delay(DELAY_TIME * 0.9);

  stateLogger(`Current progress: 20/40`);
  await delay(DELAY_TIME * 1.5);

  stateLogger(`Current progress: 21/40`);
  await delay(DELAY_TIME * 0.8);

  stateLogger(`Current progress: 22/40`);
  await delay(DELAY_TIME);

  stateLogger(`Current progress: 23/40`);
  await delay(DELAY_TIME * 0.75);

  stateLogger(`Current progress: 24/40`);
  await delay(DELAY_TIME * 0.9);

  log("Final stretch, we’re almost there!");
  await delay(DELAY_TIME);

  stateLogger(`Current progress: 25/40`);
  await delay(DELAY_TIME * 0.8);

  stateLogger(`Current progress: 26/40`);
  await delay(DELAY_TIME * 1.2);

  stateLogger(`Current progress: 27/40`);
  await delay(DELAY_TIME * 0.7);

  stateLogger(`Current progress: 28/40`);
  await delay(DELAY_TIME * 1.5);

  stateLogger(`Current progress: 29/40`);
  await delay(DELAY_TIME);

  stateLogger(`Current progress: 30/40`);
  await delay(DELAY_TIME * 0.8);

  stateLogger(`Current progress: 31/40`);
  await delay(DELAY_TIME * 0.9);

  stateLogger(`Current progress: 32/40`);
  await delay(DELAY_TIME * 0.75);

  stateLogger(`Current progress: 33/40`);
  await delay(DELAY_TIME * 1.3);

  stateLogger(`Current progress: 34/40`);
  await delay(DELAY_TIME);

  log("We’re almost there! A couple more to go.");
  await delay(DELAY_TIME);

  stateLogger(`Current progress: 35/40`);
  await delay(DELAY_TIME * 0.9);

  stateLogger(`Current progress: 36/40`);
  await delay(DELAY_TIME * 0.8);

  stateLogger(`Current progress: 37/40`);
  await delay(DELAY_TIME * 1.2);

  stateLogger(`Current progress: 38/40`);
  await delay(DELAY_TIME);

  stateLogger(`Current progress: 39/40`);
  await delay(DELAY_TIME * 0.75);

  stateLogger(`Current progress: 40/40`);
  await delay(DELAY_TIME * 0.9);

  log("All done! Great work, you've made it!");
  await delay(DELAY_TIME);
})();
