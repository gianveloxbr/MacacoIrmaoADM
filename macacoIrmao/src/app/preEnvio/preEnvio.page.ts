import { Component, OnInit } from '@angular/core';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-preEnvio',
  templateUrl: 'preEnvio.page.html',
  styleUrls: ['preEnvio.page.scss'],
})



export class PreEnvioPage implements OnInit{
  constructor(private camera:Camera, private webview: WebView){
    
  }

  ngOnInit(){
    this.tirarFoto();
  }

  tirarFoto(){
    const options: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((url) => {
      let imagem = this.webview.convertFileSrc(url);
    }, (err) => {
      console.log('Erro:' + err);
    });
  }
}
