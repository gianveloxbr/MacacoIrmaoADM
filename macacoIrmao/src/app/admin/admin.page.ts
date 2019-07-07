import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFotoPage } from '../modal-foto/modal-foto.page';
import { ModalMapaPage } from '../modal-mapa/modal-mapa.page';
import { ModalStatusPage } from '../modal-status/modal-status.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {OcorrenciaService} from '../services/ocorrencia.service';
import {Ocorrencia} from '../ocorrencia';
import { OrderPipe } from 'ngx-order-pipe'; // <- import OrderModule

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  ocorrencias: Ocorrencia[];
  dataReturned:any;
  dataReturnedStatus:any;
  dataReturnedLocation:any;
  constructor(public modalController: ModalController,private afAuth:AngularFireAuth,
    private afs: AngularFirestore, private ocorrenciaService: OcorrenciaService,private order: OrderPipe) { 

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
          status: e.payload.doc.data()['status'],
          nomeSobrenome: e.payload.doc.data()['nomeSobrenome'],
          celular: e.payload.doc.data()['celular'],
          dataDia: e.payload.doc.data()['dataDia'],
          dataHora: e.payload.doc.data()['dataHora'],
          dataIso: e.payload.doc.data()['dataISO'],
          estadoAnimal: e.payload.doc.data()['estadoAnimal'],
        } as Ocorrencia;
      })
    });
  }

  async showModalFoto(image){
    const modal = await this.modalController.create({
      component: ModalFotoPage,
      componentProps: {
        "urlImage": image
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if(dataReturned != null){
        this.dataReturned = dataReturned.data;
      }
    })
    await modal.present();
  }

  async showModalMapa(user){
    const modal = await this.modalController.create({
      component: ModalMapaPage,
      componentProps: {
        "userID": user
      }
    });

    modal.onDidDismiss().then((dataReturnedLocation) => {
      if(dataReturnedLocation != null){
        this.dataReturnedLocation = dataReturnedLocation.data;
      }
    })

    await modal.present();
  }

  async showModalStatus(ocorStatus){
    const modal = await this.modalController.create({
      component: ModalStatusPage,

      componentProps: {
        "idOcorrencia":ocorStatus
      }
    });

    modal.onDidDismiss().then((dataReturnedStatus) => {
      if(dataReturnedStatus != null){
        this.dataReturnedStatus = dataReturnedStatus.data;
      }
    })

    await modal.present();
  }  
}
