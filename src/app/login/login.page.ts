import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  loginForm: FormGroup;
  private testUser = { document: '123456', email: 'test@example.com', password: '123456' }; 

  constructor(private fb: FormBuilder, private navCtrl: NavController) {
    this.loginForm = this.fb.group({
      document: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    const { document, email, password } = this.loginForm.value;

    if (document === this.testUser.document && email === this.testUser.email && password === this.testUser.password) {
      localStorage.setItem('userName', 'Usuario de Prueba');
      this.navCtrl.navigateForward('/menu');
    } else {
      alert('Credenciales incorrectas. Intenta de nuevo.');
    }
  }

  validateNumberInput(event: any) {
    const value = event.target.value;
    event.target.value = value.replace(/[^0-9]/g, ''); 
    this.loginForm.controls['document'].setValue(event.target.value);
  }
  
}
