import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections'; 
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from 'src/app/services/lists/lists.service';
import { ListItemService } from 'src/app/services/list-items/list-item.service'

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
} 

export  interface ListItem {
  ID: any
  CreatedAt : any
  list_id : number
  user_id : any
  title : any
  description : any
  is_done : boolean
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Comprar pastafrola de membrillo x2', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


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
export class ViewListComponent implements OnInit{
  
  displayedColumns: string[] = ['select', 'name', 'symbol', 'isDone'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<ListItem>(true, []);
  loading : boolean = true 
  dataSource : ListItem[]= [] 


  constructor(private route : ActivatedRoute, private router : Router, private listService : ListsService, private _snackBar: MatSnackBar, 
    private listItemService : ListItemService){
    
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
  checkboxLabel(row?: ListItem): string {
    if (!row) {  
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }   
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ID}`;
  }


  //FIN NUEVO table view
 

  getListItems(listID : any){
    this.listService.getListByID(listID).subscribe(response => {
 
      this.dataSource = response.list_items
      this.loading = false;
    }, (err : HttpErrorResponse)=> { 
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

  createItem(){ 
    const listID = this.route.snapshot.paramMap.get('listId');
    this.router.navigate(['app/new-task/', listID])
  }

  editListItem(id : any){ 
    this.loading = true

    const listID = this.route.snapshot.paramMap.get('listId');
    if (listID == null ){
      this.loading = false
      this.dataSource = []
      this._snackBar.open("No es posible recuperar la tarea. Si el error persiste comuniquese con el adminsitrador.", "Cerrar", {
        duration: 7000,
        panelClass: 'red-snackbar'
      });
    } else {
      this.loading = false
      this.router.navigate(['app/edit-task/', listID, id])
    } 
  }

  get selectionIsEmpty(){ 
    var selectedLists = this.selection.selected
    if (selectedLists.length>0){
      return false
    } else {
      return true
    }
  }


  deleteTasks(){
    console.log("Will delete the next tasks: ", this.selection.selected)
    
    var listItemsToDelete = this.selection.selected

    this.loading = true

    if (this)

    this.listItemService.deleteListsItems(listItemsToDelete).subscribe(resp =>{

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
      
      this._snackBar.open("Tareas eliminadas exitosamente", "Cerrar", {
        duration: 12000,
        panelClass: 'green-snackbar'
      });

    }, (err: HttpErrorResponse) => {
      this.loading = false
      if (err.status == 401) {
        
        this._snackBar.open("Su sesión venció. Ingrese nuevamente al sistema.", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      }  
      else if(err.status == 404 ){
        this._snackBar.open("La tarea no existe!", "Cerrar", {
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

  updateTasksStatus(){
    console.log("Will delete the next tasks: ", this.selection.selected)
    
    var listItemsToDelete = this.selection.selected
  }

  get haveTasks() : Boolean{
    if (this.dataSource == null || this.dataSource.length < 1){
      return false;
    } else {
      return true;
    }
  }


}
