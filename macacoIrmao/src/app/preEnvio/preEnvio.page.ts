import { Component, OnInit } from '@angular/core';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Ocorrencia } from '../modelos/ocorrencia';
import { mobiscroll, MbscSelectOptions } from '@mobiscroll/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController,Platform} from '@ionic/angular'; 
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

mobiscroll.settings = {
  lang: 'pt-BR',
  theme: 'ios'
};

const remoteData = {
  url: 'https://api.myjson.com/bins/99pc2',
  type: 'json'
};

@Component({
  selector: 'app-preEnvio',
  templateUrl: 'preEnvio.page.html',
  styleUrls: ['preEnvio.page.scss'],
})

export class PreEnvioPage implements OnInit{
  public downloadUrl:Observable<string>;
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
    private afs: AngularFirestore, private camera: Camera,private platform: Platform, private file: File,
    private afStorage: AngularFireStorage){
    
  }

  ngOnInit(){
    this.tirarFoto();
    this.getGeolocation();
  }

  //Endereco
  getGeolocation(){
    this.geoLocation.getCurrentPosition().then((resp) => {
      this.ocorrencia.latitude = resp.coords.latitude;
      this.ocorrencia.longitude = resp.coords.longitude; 
      this.accuracy = resp.coords.accuracy; 
      this.getGeoencoder(this.ocorrencia.latitude,this.ocorrencia.longitude);
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

   async tirarFoto(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true
      };

      try{
        const fileUri: string = await this.camera.getPicture(options);
        let file: string;
        if(this.platform.is('ios')){
          file = fileUri.split('/').pop();
        }else{
          file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.indexOf('?'));
        }
        const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));
        const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path,file);
        const blob: Blob = new Blob([buffer], {type: 'image/jpeg'});

        this.uploadFoto(blob);
      }catch(error){
        console.log(error);
      }
   }

   uploadFoto(blob: Blob){
      const ref = this.afStorage.ref('ocorrencias/{this.hashOcorrencia}.jpg');
      const task = ref.put(blob);

      task.snapshotChanges().pipe(
        finalize(() => this.downloadUrl = ref.getDownloadURL())
      ).subscribe();

      this.ocorrencia.imageUrl = JSON.stringify(this.downloadUrl);
      console.log(this.ocorrencia.imageUrl);
   }
}
