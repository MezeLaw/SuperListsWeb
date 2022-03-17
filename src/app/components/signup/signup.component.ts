import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router'; 
import { SignUpRequest, SignupService } from 'src/app/services/signup/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup; 

  showPassword : boolean = false
  inputPasswordFieldType = "password"

  constructor(private fb : FormBuilder, private _snackBar: MatSnackBar, private route : ActivatedRoute, private router : Router, private signUpService : SignupService) {
    this.createSignUpForm()
   }

  ngOnInit(): void {
  }


  get validEmail(){  
    return this.signUpForm.get('email')?.touched && !this.signUpForm.get('email')?.invalid
  }

  get validPassword(){ 
    return this.signUpForm.get('password')?.touched && !this.signUpForm.get('password')?.invalid
  }

  get validName(){ 
    return this.signUpForm.get('name')?.touched && !this.signUpForm.get('name')?.invalid
  }

  get isPristine(){ 
    return this.signUpForm.pristine
  }

  createSignUpForm(){ 

    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.signUpForm.markAsPristine
  }

  getNameErrorMessage(){
    return "Ingrese su nombre"
  }

  getEmailErrorMessage(){
    return "Ingrese su email"
  }
  
  getPasswordErrorMessage(){
    return "Ingrese su contraseña"
  }

  signup(){
    console.log("Click on signUp button")
    const name = this.signUpForm.get('name')?.value
    const email = this.signUpForm.get('email')?.value
    const password = this.signUpForm.get('password')?.value

    if (email == null || password == null || name == null) {
      this._snackBar.open("Complete todos los campos", "Cerrar", {
        duration: 7000,
        panelClass: 'red-snackbar'
      })
    }
    
    const signUpRequest: SignUpRequest = {
      email: email, password: password,
      name: name
    };
   
    console.log("Name recibido: ", name)
    console.log("Email recibido: ", email)
    console.log("Contraseña recibida: ", password)

    this.signUpService.signUp(signUpRequest).
    subscribe(apiResponse => {  
      console.log(apiResponse)
      this._snackBar.open("Cuenta creada exitosamente. Inicie sesion para comenzar!", "Cerrar", {
        duration: 7000,
        panelClass: 'green-snackbar'
      });
    },  (err:HttpErrorResponse)=>{

      console.log("Status code es: ", err.status)

      if (err.status == 400) {
        this._snackBar.open("Algun dato de los ingresados no pudo ser procesado correctamente. Intentelo nuevamente", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      }  
      else if(err.status == 500 ){
        this._snackBar.open("Ocurrio un error al intentar crear su cuenta. Intentelo nuevamente", "Cerrar", {
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


  login(){  
    this.router.navigate(['auth']);
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
