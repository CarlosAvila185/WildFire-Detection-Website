/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.syncPreviousAndDelay = functions.database
  .ref('/nodes/{nodeId}/lastUpdated')
  .onUpdate(async (change, context) => {
    const oldTs = change.before.val();  // previous lastUpdated
    const newTs = change.after.val();   // new lastUpdated

    // If there was no prior timestamp, nothing to do
    if (!oldTs) return null;

    const delayMs = newTs - oldTs - 2000;
    const nodeRef = change.after.ref.parent; // points at /nodes/{nodeId}

    // Atomically write both fields
    return nodeRef.update({
      previousUpdated: oldTs,
      delay: delayMs
    });
  });


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
