import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  adminUid: string;
  constructor(private afs:AngularFirestore, private fcm:FCM, private afAuth: AngularFireAuth) { }

  async getAdminUid(){
    this.afAuth.authState.subscribe(auth => {
      this.adminUid = auth.uid;
    })
    this.subscribeTopicNotif();
  }

  subscribeTopicNotif(){
    this.fcm.subscribeToTopic('admin');
    console.log('subscribed!');
  }
}
