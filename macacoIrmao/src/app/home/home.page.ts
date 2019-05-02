import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { AutenticacaoService } from '../services/autenticacao.service';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';

export interface Item { nome:String;}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit{

  private dados: AngularFirestoreDocument<Item>;
  item: Observable<Item>;
  constructor(afs: AngularFirestore,authService:AutenticacaoService,private menu:MenuController) {
    var user = authService.dadosUsuario().uid;
    this.dados = afs.doc<Item>('perfil/{user}');
    this.item = this.dados.valueChanges();
  }
  ngOnInit(){
    this.menu.enable(true);
  }

}
