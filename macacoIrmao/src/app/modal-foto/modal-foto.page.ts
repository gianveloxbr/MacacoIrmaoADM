import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-foto',
  templateUrl: './modal-foto.page.html',
  styleUrls: ['./modal-foto.page.scss'],
})
export class ModalFotoPage implements OnInit {

  constructor(public modalController: ModalController) { 

  }

  dismiss(){
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
