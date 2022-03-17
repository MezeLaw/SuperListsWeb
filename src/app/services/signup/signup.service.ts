import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface SignUpResponse {
  name: string,
  email: string, 
  password: string,
  role: string 
}

export interface SignUpRequest {
  name: string,
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  
  //TODO no hardcodear esta address
  baseURL = 'http://localhost:8080/v1/auth';
  signUpURL = '/signup'

  constructor(private http : HttpClient) { }

  signUp(signUpRequest : SignUpRequest) {
    let headers = new HttpHeaders({ 
    });
    return this.http.post<SignUpResponse>(`${this.baseURL}${this.signUpURL}`, signUpRequest, {headers : headers} );
  }
}
