const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.notificacao = functions.firestore
    .document('ocorrencia/{ocorrenciaId}')
    .onCreate((snap,context) => {
     var d = new Date();
     var data = d.toLocaleString('pt-BR',{timeZone: "America/Sao_Paulo"});
     var iso = Date.parse(data);
     var isoFinal = iso * -1;
     var dataD = dataDia(data);
     var dataH = dataHora(data);
     function dataDia(data){
        let dataSplit = data.split(' ');
        let dataDia = dataSplit[0].split('-').reverse();
        if(dataDia[1].length == 1){
          dataDia[1] = '0' + dataDia[1];
        }
        let dataDiaFinal = dataDia.join('/');
        return dataDiaFinal;
      }
    
     function dataHora(hora){
        let horaSplit = hora.split(' ');
        let horaFinal = horaSplit[1];
        return horaFinal;
      }
     snap.ref.update({dataDia: dataD, dataHora: dataH, dataISO: isoFinal});
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