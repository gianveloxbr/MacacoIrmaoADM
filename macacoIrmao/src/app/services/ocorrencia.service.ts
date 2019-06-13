import { Injectable } from '@angular/core';
import {Ocorrencia} from '../ocorrencia';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  constructor(private afs: AngularFirestore) { }

  getOcorrencia(){
    let afsRef = this.afs.collection('ocorrencia', ref => ref.orderBy('dataISO', 'desc'));
    return afsRef.snapshotChanges();
  }
}
