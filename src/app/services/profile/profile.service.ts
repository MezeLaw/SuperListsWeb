import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'; 

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


  baseURL = 'http://localhost:8080/v1/users/'; 

  constructor(private http : HttpClient, private jwtHelper: JwtHelperService) { }

  getProfileData() {
    var tkn  = localStorage.getItem('token')

    if( tkn == null ){
      tkn = "invalidToken"
    }

    const decodedToken : DecodedToken = this.jwtHelper.decodeToken(tkn);

    console.log("Token decodificado es: ")
    console.log(decodedToken)

    console.log("Email del decode token es: ", decodedToken.Email)
    var email : any = decodedToken.Email

    let headers = new HttpHeaders({ "token" : tkn
    });
 
    return this.http.get<ProfileResponse>(`${this.baseURL}${email}`, {headers : headers} );
  }
}
