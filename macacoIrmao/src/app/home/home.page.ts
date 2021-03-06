import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { AutenticacaoService } from '../services/autenticacao.service';
import { Observable } from 'rxjs';
import { MenuController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { FcmService } from '../services/fcm.service';
import { FCM } from '@ionic-native/fcm/ngx';

export interface Item { nome:String;}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit{
  public nome: string;
  user: string;
  constructor(private afs: AngularFirestore,
    private authService:AutenticacaoService,
    private menu:MenuController,
    private afAuth: AngularFireAuth,
    private fcms: FcmService,
    private fcm: FCM,
    private navCtrl:NavController) {
  }
  ngOnInit(){
    this.menu.enable(true);
    this.getUserData();
    this.fcms.getAdminUid();
  }

  getUserData(){
    this.afAuth.authState.subscribe(auth => {
      this.user = auth.uid;
      var getUser = this.afs.collection('admin').doc(this.user);
      getUser.ref.get().then((doc) =>{
        if (doc.exists) {
           this.nome = doc.data().nome;
        } else {
          console.log('Oops');
        }
    }).catch(function(error) {
        console.log("Erro ao obter documento:", error);
    })      
    })
  }
}
