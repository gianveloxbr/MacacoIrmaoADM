"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.novaOcorrenciaNotificacao = functions.firestore
    .document('ocorrencias/{ocorrenciaId}')
    .onCreate(async (event, context) => {
    const dataUser = event.data();
    console.log(dataUser);
    const userId = context.params.userId;
    const payload = {
        notification: {
            title: 'Nova Ocorrência',
            body: 'Uma nova ocorrência foi enviada.'
        }
    };
    const db = admin.firestore();
    const notificationsRef = db.collection('notificacoes').where('userId', '==', userId);
    const notifications = await notificationsRef.get();
    const tokens = [];
    notifications.forEach(result => {
        const token = result.data().token;
        tokens.push(token);
    });
    return admin.messaging().sendToDevice(tokens, payload);
});
//# sourceMappingURL=index.js.map