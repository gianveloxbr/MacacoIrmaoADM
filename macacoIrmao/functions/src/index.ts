import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const novaOcorrenciaNotificacao = functions.firestore
.document('{ocorrencias/{ocorrenciaId}}')
.onCreate(async event => {
    const data = event.data();
    const userId = data.userId
    const usuario = data.nomeSobrenome

    const payload = {
        notification: {
            title: 'Nova Ocorrência',
            body: '${usuario} enviou uma nova ocorrência'
        }
    }

    const db = admin.firestore()
    const notificationsRef = db.collection('notificacoes').where('idOcorrencia', '==', userId)

    const notifications = await notificationsRef.get();

    const tokens = [];

    notifications.forEach(result => {
        const token = result.data().token;
        tokens.push(token)
    })

    return admin.messaging().sendToDevice(tokens, payload)
})