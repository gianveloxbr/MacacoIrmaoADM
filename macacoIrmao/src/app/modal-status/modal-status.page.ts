import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {Ocorrencia} from '../modelos/ocorrencia';

@Component({
  selector: 'app-modal-status',
  templateUrl: './modal-status.page.html',
  styleUrls: ['./modal-status.page.scss'],
})
export class ModalStatusPage implements OnInit {

  constructor(public modalController: ModalController, public alertController: AlertController, private afAuth: AngularFireAuth,
    private afs: AngularFirestore, private navParams: NavParams) { }
  public idOcorrencia: string;
  ocorrencia = {} as Ocorrencia;
  ngOnInit() {
    this.idOcorrencia = this.navParams.data.idOcorrencia;
  }

  dismiss(){
    this.modalController.dismiss();
  }
  
  alteraStatus(){
    this.afAuth.authState.subscribe(auth => {
      var updateStatus = this.afs.collection('ocorrencia').ref.where("idOcorrencia", "==", this.idOcorrencia);
      updateStatus.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.afs.collection('ocorrencia').doc(doc.id).set({status: this.ocorrencia.status});
        })
      })
      this.alerta();
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
