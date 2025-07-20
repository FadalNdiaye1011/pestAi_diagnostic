import { Component, resource, ResourceStatus } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading = false;

  sendMailUser: FormGroup = new FormGroup({});
  showPassword: boolean = false; // Variable pour gérer la visibilité du mot de passe
  message: string = "";
  loginForm: FormGroup;
  isModalOpen = false;



  constructor(private fb: FormBuilder,private authService:AuthService,private router: Router,) {
    this.loginForm = this.fb.group({
      telephone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.sendMailUser = this.fb.group({
      "email": ["", [Validators.required, Validators.email]]
    })
  }



  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
        this.authService.postData("authUser/login", this.loginForm.value).pipe(
          finalize(() => this.isLoading = false)
        ).subscribe({
          next: (response: any) => {
              localStorage.setItem(environment.appName + "_token", response.data[0].accessToken);
             window.location.reload()
    
          },
          error: (error: any) => {
            console.error('Login error:', error);
          }
        });
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }



  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Bascule la visibilité du mot de passe
  }

  openForgotPasswordModal() {
    this.isModalOpen = true;
  }

  closeForgotPasswordModal() {
    this.isModalOpen = false;
  }

  sendMail() {
   
    this.authService.postData<any,any>("user/password/email",this.sendMailUser.value).subscribe(
      {
        next: (response) => {
          this.sendMailUser.reset();
          this.closeForgotPasswordModal();
        },
        error: (err) => {
          // this.openAncloseModal();
          // this.sendMailLoader = false;
        },
        complete: () => {
          // this.openAncloseModal();
          // this.sendMailLoader = false
        }
      }
    )
  }
}





