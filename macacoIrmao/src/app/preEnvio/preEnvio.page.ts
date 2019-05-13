import { Component, OnInit } from '@angular/core';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-preEnvio',
  templateUrl: 'preEnvio.page.html',
  styleUrls: ['preEnvio.page.scss'],
})



export class PreEnvioPage implements OnInit{

  latitude: number;
  longitude: number;
  accuracy: number;
  endereco: string;

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  }
  constructor(private camera:Camera, private webview: WebView, private androidPermissions:AndroidPermissions,
    private geoLocation: Geolocation, private nativeGeocoder: NativeGeocoder){
    
  }

  ngOnInit(){
    this.checaPermissao();
    this.getGeolocation();
  }

  //Endereco
  getGeolocation(){
    this.geoLocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude; 
      this.accuracy = resp.coords.accuracy; 
      this.getGeoencoder(this.latitude,this.longitude);
     }).catch((error) => {
       alert('Error getting location'+ JSON.stringify(error));
     });
  }

  getGeoencoder(latitude,longitude){
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result: NativeGeocoderResult[]) => {
      this.endereco = this.generateEndereco(result[0]);
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

  //Checa se usuário possui permissão para usar câmera
  checaPermissao(){    
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => this.tirarFoto(),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );    
  }

  tirarFoto(){
    const options: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((url) => {
      let imagem = this.webview.convertFileSrc(url);
    }, (err) => {
      console.log('Erro:' + err);
    });
  }
}
