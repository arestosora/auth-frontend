import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
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

  gotoRegister() {
    this.router.navigate(['register']);
  }
  


}
