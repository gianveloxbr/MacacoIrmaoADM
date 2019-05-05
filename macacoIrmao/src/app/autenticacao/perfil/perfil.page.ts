import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import { Perfil } from '../../modelos/perfil';
import { NavController,MenuController,Platform,LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  private firebasePlugin: any;
  codeSended: boolean;
  verificationId: any;
  sucesso: boolean;
  perfil = {} as Perfil;
  user: string;
  mensagem: string;

  userInfo: string;

  constructor(private afAuth: AngularFireAuth, private navCtrl: NavController, 
    private afs: AngularFirestore, private menu:MenuController, public loadingCtrl: LoadingController,public platform: Platform) {
      this.perfil.celular = '';
      this.perfil.sms = '';
      this.verificationId = null;
    }

  ionViewDidLoad(){
    this.platform.ready().then( _ => {
      if ( this.platform.is('cordova') ) {
        this.firebasePlugin = (<any>window).cordova.plugins.firebase;
      }
    });
  }
  ngOnInit() {
  }

  verificarSMS(){
    this.platform.ready().then( _ => {
      if ( this.platform.is('cordova') ) {

        console.log(this.verificationId, this.perfil.sms); 
        this.firebasePlugin.auth.signInWithVerificationId(this.verificationId, this.perfil.sms)
        .then(userInfo => {
          console.log("Sucesso: ", userInfo);
          this.mensagem = 'Celular verificado com sucesso, crie seu perfil agora!';
          this.sucesso = true;
        })
        .catch(error => {
          console.log("Erro: ", error); 
        });

      }
    });
  }

  enviarSMS(){
    this.platform.ready().then( _ => {
      if ( this.platform.is('cordova') ) {          
        this.firebasePlugin.auth.verifyPhoneNumber(this.perfil.celular, 0)
        .then(verificationId => {
          console.log("Telefone Verificado: ", verificationId); 
          this.codeSended     = true;
          this.verificationId = verificationId;
        })
        .catch(error => {
          console.log("Erro: ", error); 
        });
      }
    });
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
