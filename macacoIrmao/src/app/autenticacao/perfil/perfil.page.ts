import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { AngularFireDatabase } from '@angular/fire/database';
import { Perfil } from '../../modelos/perfil';
import { NavController } from '@ionic/angular';
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

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.verificaSMS();
  }

  homePage(){
    this.navCtrl.navigateForward('/home');
  }

  verificaSMS(){
    (<any>window).AccountKitPlugin.loginWithPhoneNumber({
      useAccessToken: true,
      defaultCountryCode: "IN",
      facebookNotificationsEnabled: true,
    }, data => {
    (<any>window).AccountKitPlugin.getAccount(
      info => this.userInfo = info,
      err => console.log(err));
    });
  }

  criarPerfil(){
    this.afAuth.authState.subscribe(auth => {
      this.user = 'perfil/' + auth.uid + '/';
      var setUser = this.afDatabase.object(this.user).set(this.perfil);
      setUser.then(() => this.homePage());
    })
  }
}
