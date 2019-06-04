import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, ModalController } from '@ionic/angular';
import { AutenticacaoService } from './services/autenticacao.service';
import { Perfil } from './modelos/perfil';
import { Environment } from '@ionic-native/google-maps';
import { FCM } from '@ionic-native/fcm/ngx';
import { FcmService } from './services/fcm.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  perfil = {} as Perfil;

  
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Sobre o App',
      url: '/sobre',
      icon: 'information-circle-outline'
    },
    {
      title: 'Administrador',
      url: '/admin',
      icon: 'glasses'
    }
  ];
  

  userEmail: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private authService: AutenticacaoService,
    private fcm: FCM,
    private fcms: FcmService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(this.authService.dadosUsuario()){        
       console.log('ok');
      }else{
        this.navCtrl.navigateBack('');
      }
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE':'AIzaSyCzj_-lvznr3ry-5fqvKPFTODGHQCatoso',
        'API_KEY_FOR_BROWSER_DEBUG':'AIzaSyCzj_-lvznr3ry-5fqvKPFTODGHQCatoso'
      });
      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if(data.wasTapped){
          console.log("Received in background");
          this.router.navigateByUrl('/admin');
        } else {
          console.log("Received in foreground");
          this.router.navigateByUrl('/admin');
        };
      })
    });
  }
  logoff(){
    this.authService.logoffUsuario()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }
}
