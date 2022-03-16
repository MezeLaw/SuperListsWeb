import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-error',
  templateUrl: './login-error.component.html',
  styleUrls: ['./login-error.component.css']
})
export class LoginErrorComponent implements OnInit {
  isMobile: boolean = false;
  public cardColSize=3;
  public textColSize=1;
  public textHeight= "500px"; 

  constructor(private router : Router, breakpointObserver: BreakpointObserver) { 

    breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result =>{
      this.isMobile= result.matches;
    if(this.isMobile){
      this.cardColSize=1;
      this.textColSize = 1;
      this.textHeight = "625px"; 
    } else{ 
        this.cardColSize=4
        this.textColSize = 1;
        this.textHeight="150px"; 
      }	
     });

  }

  ngOnInit(): void {
    console.log("Entre a login-error component")
  }

  goToLogin(){
    this.router.navigate(['auth'])
  }

}
