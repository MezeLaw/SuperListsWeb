import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-error',
  templateUrl: './login-error.component.html',
  styleUrls: ['./login-error.component.css']
})
export class LoginErrorComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    console.log("Entre a login-error component")
  }

  goToLogin(){
    this.router.navigate(['auth'])
  }

}
