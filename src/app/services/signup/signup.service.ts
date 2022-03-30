import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
  baseURL = environment.serverSignUpUrl; 

  constructor(private http : HttpClient) { }

  signUp(signUpRequest : SignUpRequest) {
    let headers = new HttpHeaders({ 
    });
    return this.http.post<SignUpResponse>(`${this.baseURL}`, signUpRequest, {headers : headers} );
  }
}
