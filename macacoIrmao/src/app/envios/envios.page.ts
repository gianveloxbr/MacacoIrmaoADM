import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth'; 

@Component({
  selector: 'app-envios',
  templateUrl: 'envios.page.html',
  styleUrls: ['envios.page.scss'],
})
export class EnviosPage implements OnInit{
  userUid: string;
  public imgUrl = [];
  public imgData = [];
  public imgDatas = [];
  constructor(private afs: AngularFirestore,private afAuth: AngularFireAuth) {
  }
  ngOnInit(){
    this.getEnvios();
  }

  async getEnvios(){
    this.afAuth.authState.subscribe(auth => {
      this.userUid = auth.uid;
      var getOcorrencia = this.afs.collection('ocorrencia');
      getOcorrencia.ref.where("idUsuario", "==", this.userUid).get().then((doc) => {
        doc.forEach((img) => {
          this.imgUrl = img.data().imageUrl;
          this.imgData.push(this.imgUrl);
          this.imgDatas = this.imgData;
        })
      })
    })
  }
}