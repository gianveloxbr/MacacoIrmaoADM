import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-modal-status',
  templateUrl: './modal-status.page.html',
  styleUrls: ['./modal-status.page.scss'],
})
export class ModalStatusPage implements OnInit {

  constructor(public modalController: ModalController, public alertController: AlertController, private afAuth: AngularFireAuth,
    private afs: AngularFirestore) { }
  public idOcorrencia: string;
  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }
  
  alteraStatus(){
    this.afAuth.authState.subscribe(auth => {
      var updateStatus = this.afs.collection('ocorrencia').ref.where("idOcorrencia", "==", this.idOcorrencia);
      updateStatus.get().then((doc) => {
        
      })
    })
  }
  async alerta(){
    const alerta = await this.alertController.create({
      header: 'Alteração de Status',
      message: 'Alteração efetuada com sucesso.',
      buttons: ['OK']
    });

    await alerta.present();
  }

}
