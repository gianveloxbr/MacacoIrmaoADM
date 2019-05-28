import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFotoPage } from '../modal-foto/modal-foto.page';
import { ModalMapaPage } from '../modal-mapa/modal-mapa.page';
import { ModalStatusPage } from '../modal-status/modal-status.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {OcorrenciaService} from '../services/ocorrencia.service';
import {Ocorrencia} from '../ocorrencia';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  ocorrencias: Ocorrencia[];
  constructor(public modalController: ModalController,private afAuth:AngularFireAuth,
    private afs: AngularFirestore, private ocorrenciaService: OcorrenciaService) { 

  }

  ngOnInit() {
    this.ocorrenciaService.getOcorrencia().subscribe(data => {
      this.ocorrencias = data.map(e => {
        return {
          id: e.payload.doc.id,
          userID: e.payload.doc.data()['idUsuario'],
          img: e.payload.doc.data()['imageUrl'],
          lat: e.payload.doc.data()['latitude'],
          lon: e.payload.doc.data()['longitude'],
          status: e.payload.doc.data()['status']
        } as Ocorrencia;
      })
      console.log(Ocorrencia);
    });
  }

  async showModalFoto(image){
    const modal = await this.modalController.create({
      component: ModalFotoPage,
      componentProps: {
        "urlImage": JSON.stringify(image)
      }
    });
    await modal.present();
  }

  async showModalMapa(lati,long){
    const modal = await this.modalController.create({
      component: ModalMapaPage,
      componentProps: {
        userLat: lati,
        userLon: long
      }
    });

    await modal.present();
  }

  async showModalStatus(ocorStatus){
    const modal = await this.modalController.create({
      component: ModalStatusPage,

      componentProps: {
        idOcorrencia:ocorStatus
      }
    });

    await modal.present();
  }

  /*async getOcorrencia(){
    this.afAuth.authState.subscribe(auth => {
      var getOcor = this.afs.collection('ocorrencia');
      getOcor.ref.get().then((doc) => {
        doc.forEach((info) => {
          /*console.log(this.userUID[info.id] = info.data().idUsuario);
          console.log(this.userIMG[info.id] = info.data().imageUrl);
          console.log(this.userLat[info.id] = info.data().latitude);
          console.log(this.userLon[info.id] = info.data().longitude);
          console.log(info.id + '=' + info.data().imageUrl);
          this.userUID = info.data().idUsuario;
          this.userLat = info.data().latitude;
          this.ocorData.push(this.userUID,this.userLat);
          this.ocorDatas = this.ocorData;
        })          

      })
    })*/

  
}
