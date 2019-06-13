import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ModalController,ToastController,Platform,NavParams } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { HTTP } from  '@ionic-native/http/ngx';
 
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
  public mapURL: string;
  public pontoReferencia: string;
  public cep: string;
  public codigo : string;
  constructor(public modalController: ModalController,public toastCtrl: ToastController,
    private navParams: NavParams, private afs:AngularFirestore, private afAuth:AngularFireAuth,
    private http:HTTP) { 

  }

  dismiss(){
    this.modalController.dismiss();
  }

  getCodigoIBGE(cep){
    var urlCEP = 'https://viacep.com.br/ws/' + cep + '/json/';
   this.http.get(urlCEP,{},{}).then(data => {
     var dataRecebida = JSON.parse(data.data);
     this.codigo = dataRecebida.ibge;
   })
  }

  ngOnInit() {
    this.userID = this.navParams.data.userID;
    this.getDadosUser();
  }

  async getDadosUser(){
    this.afs.collection('ocorrencia').doc(this.userID).ref.get().then((docLocal) => {
      this.logradouro = docLocal.data().logradouro;
      this.bairro = docLocal.data().bairro;
      this.cidade = docLocal.data().cidade;
      this.municipio = docLocal.data().municipio;
      this.estado = docLocal.data().estado;
      this.pais = docLocal.data().pais;
      this.pontoReferencia = docLocal.data().pontoReferencia;
      this.cep = docLocal.data().cep;
      let cepConvertido = this.cep.split('-').join('');
      this.getCodigoIBGE(cepConvertido);
      this.mapURL = 'https://www.google.com/maps/search/?api=1&query=' + docLocal.data().latitude + ',' + docLocal.data().longitude;
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
