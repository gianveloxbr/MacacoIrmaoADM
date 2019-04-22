import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  constructor(
    private navCtrl: NavController,
    private authService: AutenticacaoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
 
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email é necessário' },
      { type: 'pattern', message: 'Por favor, digite um email válido.' }
    ],
    'password': [
      { type: 'required', message: 'Senha é necessária.' },
      { type: 'minlength', message: 'A senha necessita ter no mínimo 5 caracteres.' }
    ]
  };

  loginUsuario(value){
    this.authService.loginUsuario(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.navCtrl.navigateForward('/perfil');
    }, err => {
      this.errorMessage = err.message;
    })
  }
 
  goToPaginaRegistro(){
    this.navCtrl.navigateForward('/registro');
  }


}
