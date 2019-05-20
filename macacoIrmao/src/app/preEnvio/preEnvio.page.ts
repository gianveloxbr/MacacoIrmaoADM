import { Component, OnInit } from '@angular/core';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Ocorrencia } from '../modelos/ocorrencia';
import { mobiscroll, MbscSelectOptions } from '@mobiscroll/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController,Platform} from '@ionic/angular'; 
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

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
  constructor(private webview: WebView,private afAuth: AngularFireAuth, private navCtrl: NavController, 
    private afs: AngularFirestore, private camera: Camera,private platform: Platform, private file: File,
    private afStorage: AngularFireStorage, private geo: Geolocation, private natGeo: NativeGeocoder){
    
  }

  ngOnInit(){
    this.hashGen();
    this.recebeCoordenadas();
    this.tirarFoto();
  }

  hashGen(){
    this.hashOcorrencia = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  enviado(){
    this.navCtrl.navigateForward('/enviado');
  }

   enviarDados(){
    this.afAuth.authState.subscribe(auth => {
      this.ocorrencia.idUsuario = auth.uid;
      var setOcorrencia = this.afs.collection('ocorrencia').doc(this.hashOcorrencia).set(this.ocorrencia);
      setOcorrencia.then(() => this.enviado());
    })
   }

   async tirarFoto(){
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true
      };

      try{
        const fileUri: string = await this.camera.getPicture(options);
        let file: string;
        file = fileUri.split('/').pop();
        const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));
        const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path,file);
        const blob: Blob = new Blob([buffer], {type: 'image/jpeg'});

        this.uploadFoto(blob);
      }catch(error){
        console.log(error);
      }
   }

   uploadFoto(blob: Blob){
      const ref = this.afStorage.ref('ocorrencias/' + this.hashOcorrencia + '.jpg');
      const task = ref.put(blob);

      task.snapshotChanges().pipe(
        finalize(() => this.downloadUrl = ref.getDownloadURL())
      ).subscribe();
   }

  //Localização
  recebeCoordenadas(){
    this.geo.getCurrentPosition().then((resp) => {
      this.ocorrencia.latitude = resp.coords.latitude;
      this.ocorrencia.longitude = resp.coords.longitude;
      this.buscaEndereco(this.ocorrencia.latitude,this.ocorrencia.longitude);
    }).catch((error) => {
      console.log(error);
    })
  }

  buscaEndereco(lat,lon){
    let geoOptions: NativeGeocoderOptions = {
      useLocale: true,
      maxResults:1
    }
   this.natGeo.reverseGeocode(lat,lon,geoOptions)
   .then((res:NativeGeocoderResult[]) => {
      this.ocorrencia.endereco = JSON.stringify(res[0]);
   }).catch((error) => {
      console.log(error);
   })
  }
}
