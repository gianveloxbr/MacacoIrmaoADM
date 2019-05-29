import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ModalController,ToastController,Platform,NavParams } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
 
@Component({
  selector: 'app-modal-mapa',
  templateUrl: './modal-mapa.page.html',
  styleUrls: ['./modal-mapa.page.scss'],
})
export class ModalMapaPage implements OnInit {
  public userID: string;
  public logradouro: string;
  public bairro: string;
  public cidade: string;
  public municipio: string;
  public estado: string;
  public pais: string;
  constructor(public modalController: ModalController,public toastCtrl: ToastController,
    private navParams: NavParams, private afs:AngularFirestore, private afAuth:AngularFireAuth) { 

  }

  dismiss(){
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.userID = this.navParams.data.userID;
    this.getDadosUser();
  }

  async getDadosUser(){
    this.afs.collection('ocorrencia').ref.where("idUsuario", "==", this.userID).get().then((doc) => {
      doc.forEach((dt)=> {
        this.logradouro = dt.data().logradouro;
        this.bairro = dt.data().bairro;
        this.cidade = dt.data().cidade;
        this.municipio = dt.data().municipio;
        this.estado = dt.data().estado;
        this.pais = dt.data().pais;
      })
    })
  }
 
  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
}
