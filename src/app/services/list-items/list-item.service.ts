import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ListItem } from 'src/app/components/view-list/view-list.component';
import { DecodedToken } from '../lists/lists.service';
import { environment } from '../../../environments/environment';

export interface UpdateListItem {
  ID: any
  list_id : any
  user_id : any
  title : any
  description : any
  is_done : any
}

@Injectable({
  providedIn: 'root'
})
export class ListItemService {

  //baseURL = 'http://localhost:8080/v1/listItems/'; 
  baseURL = environment.serverListItemsUrl; 

  listItems: ListItem[] = [];

  constructor(private http : HttpClient, private jwtHelper: JwtHelperService) { }


  getLists() {
    var token  = localStorage.getItem('token')

    if( token == null ){
      token = "invalidToken"
    }

    const decodedToken : DecodedToken = this.jwtHelper.decodeToken(token);
    
 
    var userId : any = decodedToken.UserID
 

    let headers = new HttpHeaders({ "token" : token, "user_id": userId });
 
    return this.http.get<ListItem[]>(`${this.baseURL}`, {headers : headers} );
  }

  deleteListItemByID(listItemId : any){
    var token  = localStorage.getItem('token')

    if( token == null ){
      token = "invalidToken"
    }

    const decodedToken : DecodedToken = this.jwtHelper.decodeToken(token);
     
    var userId : any = decodedToken.UserID
 

    let headers = new HttpHeaders({ "token" : token, "user_id": userId });
    //Will return the deleted listItem ID
    return this.http.delete<number>(`${this.baseURL}${listItemId}`, {headers : headers} );
  }

  createItem(listItemRequest : ListItem){
    var token  = localStorage.getItem('token')

    if( token == null ){
      token = "invalidToken"
    }

    const decodedToken : DecodedToken = this.jwtHelper.decodeToken(token);
     
    var userId : any = decodedToken.UserID
    listItemRequest.user_id = userId;
    
    let headers = new HttpHeaders({ "token" : token, "user_id": userId });
 

    return this.http.post<ListItem>(`${this.baseURL}`, listItemRequest, {headers : headers} );
  }

  getListItem(id:any){
    var token  = localStorage.getItem('token')

    if( token == null ){
      token = "invalidToken"
    }

    const decodedToken : DecodedToken = this.jwtHelper.decodeToken(token);
    
 
    var userId : any = decodedToken.UserID
 

    let headers = new HttpHeaders({ "token" : token, "user_id": userId });
 
    return this.http.get<ListItem>(`${this.baseURL}${id}`, {headers : headers} );
  }

  update(updatedListItem : UpdateListItem){

    var token  = localStorage.getItem('token')

    if( token == null ){
      token = "invalidToken"
    }

    const decodedToken : DecodedToken = this.jwtHelper.decodeToken(token);
    
 
    var userId : any = decodedToken.UserID
 
    updatedListItem.user_id = userId

    let headers = new HttpHeaders({ "token" : token, "user_id": userId });
 
    return this.http.put<ListItem>(`${this.baseURL}${updatedListItem.ID}`, updatedListItem, {headers : headers} );

  }
}
