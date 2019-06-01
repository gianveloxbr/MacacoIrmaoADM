import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaNotificacaoService {

  constructor(private afAuth: AngularFireAuth, private afs:AngularFirestore, private firebase: Firebase, private platform: Platform) { }
  
}
