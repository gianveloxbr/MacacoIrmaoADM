import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private firebaseNative: FirebaseApp, private afs: AngularFirestore, private platform: Platform) { }

  async getToken() {
  }

  private saveTokenToFirestore(token){

  }

  listenToNotifications(){

  }
}
