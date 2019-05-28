import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-foto',
  templateUrl: './modal-foto.page.html',
  styleUrls: ['./modal-foto.page.scss'],
})
export class ModalFotoPage implements OnInit {
  public urlImage: string;
  constructor(public modalController: ModalController,private navParams: NavParams) { 

  }

  dismiss(){
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.urlImage = this.navParams.data.urlImage;
  }

}
