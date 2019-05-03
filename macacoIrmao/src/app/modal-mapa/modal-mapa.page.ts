import { Component, OnInit } from '@angular/core';
import { ModalController,ToastController,Platform } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-modal-mapa',
  templateUrl: './modal-mapa.page.html',
  styleUrls: ['./modal-mapa.page.scss'],
})
export class ModalMapaPage implements OnInit {
  map: GoogleMap;
  local:string;
  constructor(public modalController: ModalController,public toastCtrl: ToastController,
    private platform: Platform) { 

  }

  dismiss(){
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.platform.ready();
    this.carregarMapa();
  }

  carregarMapa() {
    this.map = GoogleMaps.create('map_canvas', {});
    this.localAtual();
  }

  localAtual(){
    this.map.clear();
 
    // Pega sua localização
    this.map.getMyLocation().then((local: MyLocation) => {
      console.log(JSON.stringify(local, null ,2));
 
      // Move a camera para o local
      this.map.animateCamera({
        target: local.latLng,
        zoom: 17,
        duration: 5000
      });
 
      //add a marker
      let marker: Marker = this.map.addMarkerSync({
        title: 'App Febre Amarela',
        snippet: 'Local da Ocorrência',
        position: local.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });
 
      //show the infoWindow
      marker.showInfoWindow();
      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
        (data) => {
            console.log("Click MAP",data);
        }
      );
    })
    .catch(err => {
      //this.loading.dismiss();
      this.showToast(err.error_message);
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
