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

  async getDeviceToken(){
    let token;
    token = await this.fcm.getToken();
    console.log(this.adminUid);
    return this.sendFirestoreToken(token);
  }

  getAdminUid(){
    this.afAuth.authState.subscribe(auth => {
      this.adminUid = auth.uid;
    })
  }

  sendFirestoreToken(token){
    const adminRef = this.afs.collection('admin')
    return adminRef.doc(this.adminUid).update({idAdmin: this.adminUid, token: token});
  }
}
