import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  registrationSuccess = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });

    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;

  }

  getPasswordMismatchError() {
    const confirmPasswordControl = this.registerForm.get('confirmPassword');

    if (confirmPasswordControl?.hasError('passwordMismatch')) {
    }

    return '';
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);

    if (control?.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden';
    } else if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    } else if (control?.hasError('email')) {
      return 'Por favor, ingrese un correo electrónico válido';
    } else if (control?.hasError('minlength')) {
      return `La contraseña debe tener al menos 6 caracteres`;
    } else if (control?.hasError('requiredTrue')) {
      return 'Debe aceptar los términos y condiciones';
    }

    return '';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(() => {
        this.registrationSuccess = true;
        this.gotoLogin()
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: '¡Bienvenido!',
        });
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el formulario',
          text: 'Parece que ha ocurrido un error, por favor verifica que no hayas usado este email con anterioridad.',
        });
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Por favor, revise los campos y complete la información correctamente.',
      });
    }

  }

  gotoLogin() {
    this.router.navigate(['login']);
  }

}
