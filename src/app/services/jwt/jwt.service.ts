import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(public jwtHelper: JwtHelperService, private router : Router) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false

    if (token == null) {
      this.router.navigate(['/upss'])
      return false
    }

    return !this.jwtHelper.isTokenExpired(token);
  }
  

}
