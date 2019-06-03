const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.notificacao = functions.firestore
    .document('ocorrencia/{ocorrenciaId}')
    .onCreate((snap,context) => {

        const data = snap.data();
        const idAdmin = data.context.idAdmin
        

          const db = admin.firestore()
      
          // send a notification to each device token
      
          return Promise.all([admin.database().ref('admin').once('value')]).then(
              results => {
                  const token = results[1];
                  if(!token.hasChildren()) return null;
                  let payload = {
                    notification: {
                        title:'Nova Ocorrência',
                        body:'Uma nova Ocorrência foi registrada'
                    }
                }
                const tokens = Object.keys(token.val());
                return admin.messaging().sendToDevice(tokens,payload);
              }
          )
    })
