import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ListItemService } from 'src/app/services/list-items/list-item.service';
import { ListsService } from 'src/app/services/lists/lists.service';

export  interface ListItem {
  ID: any
  CreatedAt : any
  list_id : any
  user_id : any
  title : any
  description : any
  is_done : boolean
}
@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewListComponent implements OnInit {
  
  sampleItem = {"ID":1, "CreatedAt":"hoy", "list_id": "1", "user_id":"1", "title":"TITULOO", "description":"DESCRIPTION", "is_done":true}

  columnsToDisplay: string[] = ['title', 'completed'];
  listItems : ListItem[] = [this.sampleItem]
  expandedElement: ListItem | null | undefined; 
  dataSource : ListItem[]= []
  loading : Boolean = true

  constructor(private listService : ListsService, private router : Router, private route : ActivatedRoute, private _snackBar: MatSnackBar, private listItemService : ListItemService) { 

    this.dataSource=  []
    const listID = this.route.snapshot.paramMap.get('listId');
    if (listID == null ){
      this.loading = false
      this.dataSource = []
      this._snackBar.open("No es posible recuperar la lista. Si el error persiste comuniquese con el adminsitrador.", "Cerrar", {
        duration: 7000,
        panelClass: 'red-snackbar'
      });
    } else {
      this.getListItems(listID)
    }
  }

  ngOnInit(): void {
  }

  createItem(){
    console.log("Entre al createItem method!");
  }

  editListItem(id : any){
    console.log("entre al editListItem with listID: ", id)
  }

  deleteListItem(id : any){
    this.loading = true
    console.log("entre al deleteListItem with listID: ", id)
    this.listItemService.deleteListItemByID(id).subscribe( resp => {
        console.log("Deleted listItem withID: ", resp)
        const listID = this.route.snapshot.paramMap.get('listId');
    if (listID == null ){
      this.loading = false
      this.dataSource = []
      this._snackBar.open("No es posible recuperar la lista. Si el error persiste comuniquese con el adminsitrador.", "Cerrar", {
        duration: 7000,
        panelClass: 'red-snackbar'
      });
    } else {
      this.loading = false
      this.getListItems(listID)
      this._snackBar.open("Se eliminó la tarea", "Cerrar", {
        duration: 7000,
        panelClass: 'green-snackbar'
      });
    }
    }, (err: HttpErrorResponse)=>{
      this.loading = false
      console.log("Error when deleting listItem. Status code: ", err.status)
      //this.loading = false
      if (err.status == 401) {
        this._snackBar.open("Su sesión venció. Ingrese nuevamente al sistema.", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      }  else if (err.status == 400){
        this._snackBar.open("Ocurrió un error al intentar eliminar la tarea deseada. Si el error persiste comuniquese con el adminstrador.", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      }
      else if(err.status == 404 ){
        this._snackBar.open("La tarea no existe! Si el error persiste comuniquese con el administrador.", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      } else {
        this._snackBar.open("Ocurrio un error inesperado. Intente mas tarde", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        })
      }
    })
  }

  returnToMyLists(){
    console.log("Returning to my lists");
    this.router.navigate(['app/lists'])
  }

  getListItems(listID : any){
    this.listService.getListByID(listID).subscribe(response => {

      this.listItems = response.list_items
      this.dataSource = this.listItems
      this.loading = false;
    }, (err : HttpErrorResponse)=> {
      console.log("Status code es: ", err.status)
      this.loading = false
      if (err.status == 401) {
        
        this._snackBar.open("Su sesión venció. Ingrese nuevamente al sistema.", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      }  
      else if(err.status == 404 ){
        this._snackBar.open("La lista deseada no existe!", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      } else {
        this._snackBar.open("Ocurrio un error inesperado. Intente mas tarde", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        })
      }
    })
  }

  get haveTasks() : Boolean{
    if (this.listItems == null || this.listItems.length < 1){
      return false;
    } else {
      return true;
    }
  }

}
