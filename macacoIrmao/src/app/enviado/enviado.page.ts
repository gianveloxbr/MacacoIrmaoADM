import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';Component({
  selector: 'app-enviado',
  templateUrl: './enviado.page.html',
  styleUrls: ['./enviado.page.scss'],
})
export class EnviadoPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  homepage(){
    this.navCtrl.navigateForward('/home');
  }

}
