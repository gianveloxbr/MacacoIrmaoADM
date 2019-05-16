import { Component, OnInit } from '@angular/core';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Ocorrencia } from '../modelos/ocorrencia';
import { mobiscroll, MbscSelectOptions } from '@mobiscroll/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController} from '@ionic/angular'; 

mobiscroll.settings = {
  lang: 'pt-BR',
  theme: 'ios'
};

const remoteData = {
  url: 'https://trial.mobiscroll.com/content/countries.json',
  type: 'json'
};

@Component({
  selector: 'app-preEnvio',
  templateUrl: 'preEnvio.page.html',
  styleUrls: ['preEnvio.page.scss'],
})

export class PreEnvioPage implements OnInit{
  ocorrencia = {} as Ocorrencia;
  accuracy: number;
  user: string;
  hashOcorrencia: string;
  //Select Países
  desktopFilterSettings: MbscSelectOptions = {
    display: 'bubble',
    touchUi: false,
    data: remoteData,
    filter: true,
    group: {
        groupWheel: false,
        header: false
    },
    width: 400
};

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  }
  constructor(private webview: WebView, private geoLocation: Geolocation, private nativeGeocoder: NativeGeocoder,private afAuth: AngularFireAuth, private navCtrl: NavController, 
    private afs: AngularFirestore){
    
  }

  ngOnInit(){
    this.getGeolocation();
  }

  //Endereco
  getGeolocation(){
    this.geoLocation.getCurrentPosition().then((resp) => {
      this.ocorrencia.latitude = resp.coords.latitude;
      this.ocorrencia.longitude = resp.coords.longitude; 
      this.accuracy = resp.coords.accuracy; 
      this.getGeoencoder(this.latitude,this.longitude);
     }).catch((error) => {
       alert('Error getting location'+ JSON.stringify(error));
     });
  }

  getGeoencoder(latitude,longitude){
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result: NativeGeocoderResult[]) => {
      this.ocorrencia.endereco = this.generateEndereco(result[0]);
    })
    .catch((error: any) => {
      alert('Erro ao localizar: '+ JSON.stringify(error));
    });
  }

  generateEndereco(addressObj){
      let obj = [];
      let address = "";
      for (let key in addressObj) {
        obj.push(addressObj[key]);
      }
      obj.reverse();
      for (let val in obj) {
        if(obj[val].length)
        address += obj[val]+', ';
      }
    return address.slice(0, -2);
  }

  enviado(){
    this.navCtrl.navigateForward('/enviado');
  }

   enviarDados(){
    this.hashOcorrencia = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.afAuth.authState.subscribe(auth => {
      this.ocorrencia.idUsuario = auth.uid;
      var setOcorrencia = this.afs.collection('ocorrencia').doc(this.hashOcorrencia).set(this.ocorrencia);
      setOcorrencia.then(() => this.enviado());
    })
   }
}
