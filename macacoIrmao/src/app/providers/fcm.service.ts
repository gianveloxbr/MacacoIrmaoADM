import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  hashNotification: string;
  constructor(private firebaseNative: Firebase, private afs: AngularFirestore, private platform: Platform) { }

  async getToken() {
    let token;

    if(this.platform.is('android')){
      token = await this.firebaseNative.getToken();
    }

    if(this.platform.is('ios')){
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    return this.saveTokenToFirestore(token);
  }

  private saveTokenToFirestore(token){
    if(!token) return;
    const notificationsRef = this.afs.collection('notifcacoes')

    const docData = {
      token,
      userId: 'admin',
    }

    return notificationsRef.doc(token).set(docData)
  }

  listenToNotifications(){
    return this.firebaseNative.onNotificationOpen();
  }
}
