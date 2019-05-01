import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AutenticacaoService } from '../services/autenticacao.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit{
  
  dados: Observable<any>
  
  constructor(afDatabase: AngularFireDatabase,authService:AutenticacaoService) {
    var user = authService.dadosUsuario().uid;
    this.dados = afDatabase.object('perfil/{user}/nome').valueChanges();
  }
  ngOnInit(){

  }

}
