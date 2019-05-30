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
.document('ocorrencias/{ocorrenciaId}')
.onCreate(async (event,context) => {
    const dataUser = event.data();
console.log(dataUser);
    const userId = context.params.userId
    const payload = {
        notification: {
            title: 'Nova Ocorrência',
            body: 'Uma nova ocorrência foi enviada.'
        }
    }

    const db = admin.firestore()
    const notificationsRef = db.collection('notificacoes').where('idOcorrencia', '==', userId)

    const notifications = await notificationsRef.get();

    const tokens:string[] = [];

    notifications.forEach(result => {
        const token = result.data().token;
        tokens.push(token)
    })

    return admin.messaging().sendToDevice(tokens, payload)
})