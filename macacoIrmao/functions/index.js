const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.notificacao = functions.firestore
    .document('ocorrencia/{ocorrenciaId}')
    .onCreate((snap,context) => {
     var d = new Date();
     var dl = d.toLocaleString('pt-BR',{timeZone: "America/Sao_Paulo"});
     snap.ref.update({dataAtual: dl});
     let payload = {
          notification: {
              title: 'Nova ocorrência',
              body: 'Uma nova ocorrência foi registrada.',
              click_action: 'FCM_PLUGIN_ACTIVITY'
          }
      }
          return admin.messaging().sendToTopic("admin",payload).then(response => {
              console.log('Notificação enviada com sucesso.', response);
          }).catch(error => {
              console.log('Erro:', error);
          })
        }
    )