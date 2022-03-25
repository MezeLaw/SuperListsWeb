import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  //dataSource = this.listItems;
  dataSource : ListItem[]= []
  haveItems: boolean = false;

  constructor(private listService : ListsService, private router : Router) { 

    this.dataSource=  []

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
    console.log("entre al deleteListItem with listID: ", id)
  }

  returnToMyLists(){
    console.log("Returning to my lists");
    this.router.navigate(['app/lists'])
  }

}
