import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup; 
  constructor(private fb : FormBuilder, private _snackBar: MatSnackBar, private route : ActivatedRoute, private router : Router) {
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
  }

  login(){  
    this.router.navigate(['auth']);
  }

}
