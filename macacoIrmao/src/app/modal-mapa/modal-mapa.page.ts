import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ModalController,ToastController,Platform } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
 
declare var google;

@Component({
  selector: 'app-modal-mapa',
  templateUrl: './modal-mapa.page.html',
  styleUrls: ['./modal-mapa.page.scss'],
})
export class ModalMapaPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address:string;
  constructor(public modalController: ModalController,public toastCtrl: ToastController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) { 

  }

  dismiss(){
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.carregarMapa();
  }

 carregarMapa(){
  this.geolocation.getCurrentPosition().then((resp) => {
    let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.map.addListener('tilesloaded', () => {
      console.log('accuracy',this.map);
      this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
    });

  }).catch((error) => {
    console.log('Error getting location', error);
  });
}

getAddressFromCoords(lattitude, longitude) {
  console.log("getAddressFromCoords "+lattitude+" "+longitude);
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
    .then((result: NativeGeocoderResult[]) => {
      this.address = "";
      let responseAddress = [];
      for (let [key, value] of Object.entries(result[0])) {
        if(value.length>0)
        responseAddress.push(value);

      }
      responseAddress.reverse();
      for (let value of responseAddress) {
        this.address += value+", ";
      }
      this.address = this.address.slice(0, -2);
    })
    .catch((error: any) =>{ 
      this.address = "Address Not Available!";
    });
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
