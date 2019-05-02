import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import { Perfil } from '../../modelos/perfil';
import { NavController,MenuController } from '@ionic/angular';
import { HomePage } from 'src/app/home/home.page';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfil = {} as Perfil;

  user: string;

  userInfo: string;

  constructor(private afAuth: AngularFireAuth, private navCtrl: NavController, 
    private afs: AngularFirestore, private menu:MenuController) { 
    }

  ngOnInit() {
  }

  ionViewWillEnter() {
    //Desativa Menu lateral na tela de login
    this.menu.enable(false);
  }

  homePage(){
    this.navCtrl.navigateForward('/home');
  }

  criarPerfil(){
    this.afAuth.authState.subscribe(auth => {
      this.user = auth.uid;
      var setUser = this.afs.collection('perfil').doc(this.user).set(this.perfil); 
      setUser.then(() => this.homePage());    
    })
  }
}
