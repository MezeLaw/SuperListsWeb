import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router'; 
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';


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

  showPassword : boolean = false
  inputPasswordFieldType : string = "password"

  loading : boolean = false

  loginForm!: FormGroup; 
  constructor(private fb: FormBuilder, private authService : AuthServiceService, private _snackBar: MatSnackBar, private router : Router, private route : ActivatedRoute) {
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
    
    this.loading  = true

    const email = this.loginForm.get('email')?.value
    const password = this.loginForm.get('password')?.value

    if (email == null || password == null ) {
      this._snackBar.open("Ingrese sus credenciales", "Cerrar", {
        duration: 7000,
        panelClass: 'red-snackbar'
      })
    } 
    const loginRequest: LoginRequest = { email: email, password: password};
   
    this.authService.login(loginRequest).
    subscribe(apiResponse => {  
      console.log(apiResponse)
      localStorage.setItem ('token', apiResponse.token);
      this.router.navigate(['app'])
      this.loading = false
    },  (err:HttpErrorResponse)=>{

      console.log("Status code es: ", err.status)
      this.loading = false
      if (err.status == 401) {
        
        this._snackBar.open("Email o contraseña incorrectas", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      }  
      else if(err.status == 404 ){
        this._snackBar.open("Usuario no registrado", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      } else {
        this._snackBar.open("Ocurrio un error inesperado. Intente mas tarde", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        })
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

  signUp(){ 
    this.router.navigate(['signup']);
  }


  switchPasswordVisibility(){
    this.showPassword = !this.showPassword
    if (this.showPassword) {
      this.inputPasswordFieldType = "text"
    } else {
      this.inputPasswordFieldType = "password"
    }
  }

}
