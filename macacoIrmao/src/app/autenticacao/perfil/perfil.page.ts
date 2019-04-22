import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { AngularFireDatabase } from '@angular/fire/database';
import { Perfil } from '../../modelos/perfil';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfil = {} as Perfil;

  user: string;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  criarPerfil(){
    this.afAuth.authState.subscribe(auth => {
      this.user = 'perfil/' + auth.uid + '/';
      console.log(this.user);
      this.afDatabase.object(this.user).set(this.perfil)
      .then(() => this.navCtrl.navigateForward('/home'))
    })
  }
}
