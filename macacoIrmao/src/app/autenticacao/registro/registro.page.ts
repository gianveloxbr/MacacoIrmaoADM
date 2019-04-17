import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  
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

  tryRegistro(value){
    this.authService.registrarUsuario(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Sua conta foi criada com sucesso. Por favor, faça o login.";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }
 
  goPaginaLogin(){
    this.navCtrl.navigateBack('');
  }

}
