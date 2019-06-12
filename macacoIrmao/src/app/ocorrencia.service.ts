import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  constructor(private afs:AngularFirestore,private db:AngularFireDatabase) { }

  getOcorrencia(){
    let afsRef = this.afs.collection('ocorrencia', ref => ref.orderBy('dataISO', 'desc'));
    return afsRef.snapshotChanges();
  }
}
