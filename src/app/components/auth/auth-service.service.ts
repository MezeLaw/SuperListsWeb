import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AuthResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseURL = 'http://localhost:8080/v1/auth';
  loginURL = '/login'

  constructor(private http : HttpClient) { }

  login(loginRequest : LoginRequest) {
    let headers = new HttpHeaders({ 
    });
    return this.http.post<AuthResponse>(`${this.baseURL}${this.loginURL}`, loginRequest, {headers : headers} );
  }
 
}
