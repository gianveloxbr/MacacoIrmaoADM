import { Injectable } from '@angular/core';
import {Ocorrencia} from '../ocorrencia';
import { AngularFirestore } from '@angular/fire/firestore';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  constructor(private afs: AngularFirestore,
    private localNotifications: LocalNotifications) { }

  getOcorrencia(){
    return this.afs.collection('ocorrencia').snapshotChanges();
  }

  notificacao(){
    return this.localNotifications.schedule({
      id: 1,
      title: 'Nova Ocorrência',
      text: 'Uma nova ocorrência foi enviada.'
    })
  }
}
