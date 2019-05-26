import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ModalController,ToastController,Platform } from '@ionic/angular';
 
@Component({
  selector: 'app-modal-mapa',
  templateUrl: './modal-mapa.page.html',
  styleUrls: ['./modal-mapa.page.scss'],
})
export class ModalMapaPage implements OnInit {
  public userLat: number;
  public userLon: number;
  constructor(public modalController: ModalController,public toastCtrl: ToastController) { 

  }

  dismiss(){
    this.modalController.dismiss();
  }

  ngOnInit() {
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
