import { Component } from '@angular/core';
import {GoogleMap,GoogleMaps, Environment, GoogleMapOptions} from '@ionic-native/google-maps/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-localizacao',
  templateUrl: 'localizacao.page.html',
  styleUrls: ['localizacao.page.scss'],
})
export class LocalizacaoPage {
  latitude: number
  longitude: number
  map: GoogleMap
  constructor(private geolocation: Geolocation) { }
  loadMap(){
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_DEBUG':'AIzaSyCYkAKAOKKSKX19-55BrL7N8lOk_i7tZk0',
      'API_KEY_FOR_BROWSER_RELEASE':'AIzaSyCYkAKAOKKSKX19-55BrL7N8lOk_i7tZk0'
    })
    this.geolocation.getCurrentPosition().then((resp) =>{
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      debugger
      console.log('Lat:' + this.latitude + 'Lng:' + this.longitude);
      let options: GoogleMapOptions = {
        camera:{
          target:{lat: this.latitude, lng: this.longitude}
        }
      }
      this.map = GoogleMaps.create('map_canvas', options);
    })
  }
}
