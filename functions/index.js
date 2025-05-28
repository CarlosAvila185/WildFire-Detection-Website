const functions = require("firebase-functions");
const admin     = require("firebase-admin");

admin.initializeApp();

exports.syncPreviousAndDelay = functions.database
    .ref("/nodes/{nodeId}/lastUpdated")
    .onUpdate(async (change, context) => {
        const oldTs = change.before.val();  // previous lastUpdated
        const newTs = change.after.val();   // new lastUpdated

        // If there was no prior timestamp, nothing to do
        if (!oldTs) {
            return null;
        }

        // subtracting your 2s offset
        const delayMs = newTs - oldTs - 2000;
        const nodeRef = change.after.ref.parent; // /nodes/{nodeId}

        // Atomically write both fields
        return nodeRef.update({
            previousUpdated: oldTs,
            delay:          delayMs,
        });
    });
