const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.notificacao = functions.firestore
    .document('ocorrencia/{ocorrenciaId}')
    .onCreate(() => {
        const payload = {
            notification: {
                title:'Nova Ocorrência',
                body:'Uma nova Ocorrência foi registrada'
            }
        }

        var pushToken = "";
        return functions.firestore.collection('admin/{user-ID}')
        .then((doc) => {
            pushToken = doc.data().tokenID;
            return admin.messaging().sendToDevice(pushToken, payload)
        })
    })