import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import api from "./api";

admin.initializeApp();

// Expose the API as a function
export const api = functions.https.onRequest(api);

// You can add other functions here, for example:
// export const scheduledFunction = functions.pubsub.schedule('every 24 hours').onRun((context) => {
//   console.log('This will be run every 24 hours!');
//   return null;
// });
