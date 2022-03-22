import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


export interface List {  
  CreatedAt: any;
  DeletedAt: any;
  ID: any;
  UpdatedAt: any;
  description: any;
  invite_code: any;
  list_items: any;
  name: any;
  user_creator_id: any
}

export interface ListRequest {
  name : any
  description : any
  user_creator_id : any
}

export interface DecodedToken {
  Email : string
  Role: string 
  UserID : any
  //{Email: 'mezequielabogado@gmail.com', Role: 'USER', UserID: 1, exp: 1647512235, iss: 'MezeTheKing'}
}

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  baseURL = 'http://localhost:8080/v1/lists/'; 

  lists: List[] = [];

  constructor(private http : HttpClient, private jwtHelper: JwtHelperService) { }


  getLists() {
    var token  = localStorage.getItem('token')

    if( token == null ){
      token = "invalidToken"
    }

    const decodedToken : DecodedToken = this.jwtHelper.decodeToken(token);
    
 
    var userId : any = decodedToken.UserID

    console.log("UserID is: ", userId)

    let headers = new HttpHeaders({ "token" : token, "user_id": userId });
 
    return this.http.get<List[]>(`${this.baseURL}`, {headers : headers} );
  }


  getListByID() {
    var token  = localStorage.getItem('token')

    if( token == null ){
      token = "invalidToken"
    } 

    let headers = new HttpHeaders({ "token" : token
    });
 
    return this.http.get<List>(`${this.baseURL}$/listID`, {headers : headers} );
  }

  deleteListByID(listID : any) {
    var token  = localStorage.getItem('token')

    if( token == null ){
      token = "invalidToken"
    }

    const decodedToken : DecodedToken = this.jwtHelper.decodeToken(token);
    
 
    var email : any = decodedToken.Email 
    var userId : any = decodedToken.UserID
  
    let headers = new HttpHeaders({ "token" : token, "user_id": userId });
 
 
    return this.http.delete<List>(`${this.baseURL}${listID}`, {headers : headers} );
  }

  create(name : any, description : any) {

    

    var token  = localStorage.getItem('token')

    if( token == null ){
      token = "invalidToken"
    }

    const decodedToken : DecodedToken = this.jwtHelper.decodeToken(token);
    
  
    var userId : any = decodedToken.UserID
    const listRequest: ListRequest = { name: name, description : description, user_creator_id: userId };

    let headers = new HttpHeaders({ "token" : token, "user_id": userId });

    return this.http.post<List>(`${this.baseURL}`, listRequest, {headers : headers} );
  }

}
