import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  constructor(private afs:AngularFirestore) { }

  getOcorrencia(){
    let afsRef = this.afs.collection('ocorrencia', ref => ref.orderBy('dataISO', 'desc'));
    return afsRef;
  }
}
