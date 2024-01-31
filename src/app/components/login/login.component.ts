import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);

    if (control?.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden';
    } else if (control?.hasError('minlength')) {
      return `La contraseña debe tener al menos 6 caracteres`;
    } else if (control?.hasError('requiredTrue')) {
      return 'Debe aceptar los términos y condiciones';
    }

    return '';
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: '¡Bienvenido!',
        });
        this.authService.storeToken(res.Tokens.Access)
        this.gotoHome()
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectas',
          text: 'Por favor, revise su correo electrónico y contraseña y vuelva a intentarlo.',
        });
      }
    );
  }

  gotoRegister() {
    this.router.navigate(['register']);
  }

  gotoHome(){
    this.router.navigate(['home'])
  }
}
