import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, ModalController } from '@ionic/angular';
import { AutenticacaoService } from './services/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Fotos Enviadas',
      url: '/envios',
      icon: 'send'
    },
    {
      title: 'Localização',
      url: '/localizacao',
      icon: 'map'
    },
    {
      title: 'Sobre o App',
      url: '/sobre',
      icon: 'information-circle-outline'
    },
    {
      title: 'Admin',
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
    private authService: AutenticacaoService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(this.authService.dadosUsuario()){
        this.userEmail = this.authService.dadosUsuario().email;
      }else{
        this.navCtrl.navigateBack('');
      }
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
