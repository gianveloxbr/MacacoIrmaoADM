import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enviado',
  templateUrl: './enviado.page.html',
  styleUrls: ['./enviado.page.scss'],
})
export class EnviadoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  homepage(){
    this.navCtrl.navigateForward('/home');
  }

}
