import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import { Perfil } from '../../modelos/perfil';
import {NavController,MenuController,Platform,AlertController} from '@ionic/angular'; 
import { Alert } from 'selenium-webdriver';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  private firebasePlugin: any;
  perfil = {} as Perfil;
  user: string;
  userInfo: string;
  sms: string;
  verificationId: any;
  codigoEnviado: boolean;
  sucesso: boolean;

  constructor(private afAuth: AngularFireAuth, private navCtrl: NavController, 
    private afs: AngularFirestore, private menu:MenuController, private platform: Platform,private alertController: AlertController) {
      this.perfil.celular = '';
      this.sms = '';
      this.codigoEnviado = null;
      this.sucesso = null;
      this.verificationId = '';
    }

  ngOnInit() {
    this.platform.ready().then(_ =>{
      this.firebasePlugin = (<any>window).cordova.plugins.firebase;
    })
  }

  verificarSMS(){
    if(this.verificationId){
    this.sucesso = true;
    }
    /*this.platform.ready().then(_ => {
      this.firebasePlugin.auth.signInWithVerificationId(this.verificationId, this.sms).then(userInfo => {
        console.log(userInfo);
        this.sucesso = true;
      })
      .catch(error => {
        console.log(error);
      })
    })*/
  }

  enviarSMS(){
    this.platform.ready().then(_ => {
      this.firebasePlugin.auth.verifyPhoneNumber(this.perfil.celular,0).then(verificationId =>{
        this.codigoEnviado = true;
        this.verificationId = verificationId;
      })
      .catch(error => {
        console.log(error);
      })
  })
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
      var setUser = this.afs.collection('perfil').collection('admin').doc(this.user).set(this.perfil); 
      setUser.then(() => this.homePage());    
    })
  }
}
