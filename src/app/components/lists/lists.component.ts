import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations'; 
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListsService } from 'src/app/services/lists/lists.service';

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

  columnsToDisplay: string[] = ['Nombre', 'Codigo'];
  lists : List[] = []
  expandedElement: List | null | undefined;
  //dataSource = ELEMENT_DATA;
  dataSource = this.lists;
  haveLists : boolean = false

  constructor(private listService : ListsService, public dialog: MatDialog, private router : Router) {

   //Llamo al servicio del listas

   this.getListForUser()
    
   // Si corresponde las asigno  no y actualizo el valor de haveLists

 
  }

  createList(){
    console.log("Will go to new list form")
    this.router.navigate(['app/new-list'])
  }

  ngOnInit(): void {
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

   //Elimino, si todo sale ok, llamo al request y actualizo tablas
    this.listService.deleteListByID(id).subscribe(resp => {
      console.log("list deleted. will refresh the lists ")
      this.getListForUser()

    }, error => {
      console.log("error when trying to delete list ")
    })  
  }

  getListForUser() {
    this.listService.getLists().subscribe( response => {
      console.log("Resultado del get Lists: ", response)
      this.lists = response
      this.dataSource = this.lists
    }, err => {
      console.log("error al intentar obtener lasl istas", err)
    })
  }

  
 
   
}
