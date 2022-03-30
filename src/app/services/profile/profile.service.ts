import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'; 
import { environment } from '../../../environments/environment';

export interface ProfileResponse {
  CreatedAt: string;
  name : string
  email : string
}


export interface DecodedToken {
  Email : string
  Role: string 
  //{Email: 'mezequielabogado@gmail.com', Role: 'USER', UserID: 1, exp: 1647512235, iss: 'MezeTheKing'}
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService { 

  //TODO no hardcodear esta address
  baseURL = environment.serverProfileUrl; 

  constructor(private http : HttpClient, private jwtHelper: JwtHelperService) { }

  getProfileData() {
    var token  = localStorage.getItem('token')

    if( token == null ){
      token = "invalidToken"
    }

    const decodedToken : DecodedToken = this.jwtHelper.decodeToken(token);
    
 
    var email : any = decodedToken.Email

    let headers = new HttpHeaders({ "token" : token
    });
 
    return this.http.get<ProfileResponse>(`${this.baseURL}${email}`, {headers : headers} );
  }
}
