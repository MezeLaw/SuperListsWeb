import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface List {
  id: any;
  Nombre: any;
  descripcion: any;
  Codigo: string;
}

const ELEMENT_DATA: List[] = [
  {id: 1, Nombre: 'Super', descripcion: "lista del super", Codigo: 'd1ba19dc-940c-4c2a-a2f3-46e1942a7341'},
  {id: 2, Nombre: 'Laburo', descripcion: "tareas pendientes", Codigo: 'd1b139dc-910c-4c2a-a2f3-46e1942a7341'},
  {id: 3, Nombre: 'Finde', descripcion: "planes para el finde", Codigo: 'd1bncldc-47x0-4c2a-a2f3-46e1942a7341'},
  {id: 4, Nombre: 'Rutina Gym', descripcion: "Rutina inicial de gym", Codigo: 'lnmk39dc-910c-4c2a-a2f3-46e1942a7341'}, 
];


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
  lists : any = []
  expandedElement: List | null | undefined;
  dataSource = ELEMENT_DATA;
  haveLists : boolean = false

  constructor() {

   //Llamo al servicio del listas

    
   // Si corresponde las asigno  no y actualizo el valor de haveLists

 
  }

  addData(){

  }

  ngOnInit(): void {
  }

  getList(id : any){
    console.log("ID recibido: ", id)
  }

  deleteList(id : any ) {
    console.log("Ud va a deletear la lista con id: ", id)
  }

}
