import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from './auth-service.service';


export interface User {
  name: string;
  password: string; 
}

export interface AuthResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  loginForm!: FormGroup; 
  constructor(private fb: FormBuilder, private authService : AuthServiceService, private _snackBar: MatSnackBar) {
    this.createLoginForm();
  } 

  ngOnInit(): void {}

  getEmailErrorMessage(){
    return "Ingrese su email"
  }
  
  getPasswordErrorMessage(){
    return "Ingrese su contraseña"
  }

  login(){
    
    const loginRequest: LoginRequest = { email: "mezequielabogado@gmail.com", password: "passwordx" };
   

    this.authService.login(loginRequest).
    subscribe(apiResponse => { 
      console.log("API RESPONSE>")
      console.log(apiResponse)
    },  (err:HttpErrorResponse)=>{
      if (err.status == 401) {
        this._snackBar.open("Email o password incorrectas", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      }
    });
  }

  get validEmail(){  
    return this.loginForm.get('email')?.touched && !this.loginForm.get('email')?.invalid
  }

  get validPassword(){ 
    return this.loginForm.get('password')?.touched && !this.loginForm.get('password')?.invalid
  }

  get isPristine(){ 
    return this.loginForm.pristine
  }


  createLoginForm(){ 

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.loginForm.markAsPristine
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
