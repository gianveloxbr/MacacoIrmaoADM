import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFotoPage } from '../modal-foto/modal-foto.page';
import { ModalMapaPage } from '../modal-mapa/modal-mapa.page';
import { ModalStatusPage } from '../modal-status/modal-status.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public userUID = [];
  public userIMG = [];
  public userLat = [];
  public userLon = [];
  public ocorData = [];
  public ocorDatas = [];
  constructor(public modalController: ModalController,private afAuth:AngularFireAuth,
    private afs: AngularFirestore) { 

  }

  ngOnInit() {
    this.getOcorrencia();
  }

  async showModalFoto(){
    const modal = await this.modalController.create({
      component: ModalFotoPage,
      componentProps: {
        urlImage: this.userIMG
      }
    });

    await modal.present();
  }

  async showModalMapa(){
    const modal = await this.modalController.create({
      component: ModalMapaPage,
      componentProps: {
        userLat: this.userLat,
        userLon: this.userLon
      }
    });

    await modal.present();
  }

  async showModalStatus(){
    const modal = await this.modalController.create({
      component: ModalStatusPage
    });

    await modal.present();
  }

  async getOcorrencia(){
    this.afAuth.authState.subscribe(auth => {
      var getOcor = this.afs.collection('ocorrencia');
      getOcor.ref.get().then((doc) => {
        doc.forEach((info) => {
          this.userUID = info.data().idUsuario;
          this.userIMG = info.data().imageUrl;
          this.userLat = info.data().latitude;
          this.userLon = info.data().longitude;
          this.ocorData.push(this.userUID,this.userIMG,this.userLat,this.userLon);
          this.ocorDatas = this.ocorData;
        })          

      })
    })
  }
}
