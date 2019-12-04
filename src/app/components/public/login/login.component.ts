import {Component, OnInit} from '@angular/core';

import Swal from 'sweetalert2';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  senha: string;
  mensagem: string;
  emailEnviado: boolean;

  constructor(private authServ: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  async logar() {
    if (!this.email || !this.senha) {
      this.mensagem = 'Usuário ou senha vazios.';
      return;
    }

    try {
      await this.authServ.login(this.email, this.senha);
      await this.router.navigate(['/admin', 'painel']);
    } catch (err) {
      let detalhes = '';
      switch (err.code) {
        case 'auth/user-not-found': {
          detalhes = 'Não existe usuário para o email informado';
          break;
        }
        case 'auth/invalid-email': {
          detalhes = 'Email inválido';
          break;
        }
        case 'auth/wrong-password': {
          detalhes = 'Senha Inválida';
          break;
        }
        default: {
          detalhes = err.message;
          break;
        }
      }
      this.mensagem = `Erro ao logar. ${detalhes}`;
    }
  }

  async enviaLink() {
    const {value: email} = await Swal.fire({
      title: 'Informe o e-mail cadastrado',
      input: 'email',
      inputPlaceholder: 'email',
    });

    if (email) {
      this.authServ.resetPassword(email)
        .then(() => {
          this.emailEnviado = true;
          this.mensagem = `Email enviado para ${email} com instruções para recuperação.`;
        })
        .catch(erro => {
          this.mensagem = `Erro ao localizar o email. Detahes ${erro.message}`;
        });
    }
  }
}
