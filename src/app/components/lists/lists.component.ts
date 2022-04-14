import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations'; 
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListsService } from 'src/app/services/lists/lists.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';


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
 


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListsComponent implements OnInit {  
  lists : List[] = []
  expandedElement: List | null | undefined;
  //dataSource = ELEMENT_DATA;
  dataSource = this.lists;
  loading = true
  displayedColumns: string[] = ['select', 'name', 'inviteCode', 'viewList'];
  selection = new SelectionModel<List>(true, []);


  constructor(private listService : ListsService, public dialog: MatDialog, private router : Router, private _snackBar: MatSnackBar) {

   //Llamo al servicio del listas 
   this.getListForUser()
   // Si corresponde las asigno  no y actualizo el valor de haveLists

 
  }

  createList(){
    console.log("Will go to new list form")
    this.router.navigate(['app/new-list'])
  }
 

  getList(id : any){
    console.log("ID recibido: ", id) 
    this.router.navigate(['app/lists/', id])
  }

  joinListByCode(){
    console.log("Will go to new list form")
    this.router.navigate(['app/join-list'])
  }

  deleteList(id : any ) {
    console.log("Ud va a deletear la lista con id: ", id)
      //this.dataSource = this.dataToDisplay.slice(0, -1);
   // this.dataSource.setData(this.dataToDisplay);
    this.loading = true
   //Elimino, si todo sale ok, llamo al request y actualizo tablas
    this.listService.deleteListByID(id).subscribe(resp => {
      console.log("list deleted. will refresh the lists ")
      this.getListForUser()
      this._snackBar.open("Se eliminó la lista", "Cerrar", {
        duration: 7000,
        panelClass: 'green-snackbar'
      });
    }, (err : HttpErrorResponse) => {
      console.log("error when trying to delete list ")
      this.loading = false 
      if (err.status == 401) {
        this._snackBar.open("Su sesión venció. Ingrese nuevamente al sistema.", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      }  else if (err.status == 400){
        this._snackBar.open("Ocurrió un error al eliminar la lista. Si el error persiste comuniquese con el adminstrador.", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      }
      else if(err.status == 404 ){
        this._snackBar.open("La lista no existe! Si el error persiste comuniquese con el administrador.", "Cerrar", {
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

  getListForUser() {
    this.loading = true
    this.listService.getLists().subscribe( response => {
      console.log("Resultado del get Lists: ", response)
      this.lists = response
      this.dataSource = this.lists
      this.loading = false
    }, (err:HttpErrorResponse) => {
      this.loading = false
      console.log("Error when getting lists. Status code: ", err.status) 
      if (err.status == 401) {
        this._snackBar.open("Su sesión venció. Ingrese nuevamente al sistema.", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      }  else if (err.status == 400){
        this._snackBar.open("Ocurrió un error al obtener la lista. Si el error persiste comuniquese con el adminstrador.", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      }
      else if(err.status == 404 ){
        this._snackBar.open("La lista no existe! Si el error persiste comuniquese con el administrador.", "Cerrar", {
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

  get haveLists() : Boolean{
    if(this.lists == null || this.lists.length<0){
      return false;
    } else {
      return true;
    }
  }


  // Cosas tabla nueva

  ngOnInit(): void {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
   this.selection.select(...this.dataSource); 
  }

  /** The label for the checkbox on the passed row */
  //checkboxLabel(row?: PeriodicElement): string {
  checkboxLabel(row?: List): string {
    if (!row) {  
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }   
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ID}`;
  }
  
  get selectionIsEmpty(){ 
    var selectedLists = this.selection.selected
    if (selectedLists.length>0){
      return false
    } else {
      return true
    }
  }

  get haveTasks() : Boolean{
    if (this.dataSource == null || this.dataSource.length < 1){
      return false;
    } else {
      return true;
    }
  }
   
}
