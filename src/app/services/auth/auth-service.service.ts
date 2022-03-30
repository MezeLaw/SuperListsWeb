import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import "animate.css";

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
  
  //TODO no hardcodear esta address
  baseURL = environment.serverAuthUrl; 

  constructor(private http : HttpClient) { }

  login(loginRequest : LoginRequest) {
    let headers = new HttpHeaders({ 
    });
    return this.http.post<AuthResponse>(`${this.baseURL}`, loginRequest, {headers : headers} );
  }
 
}
