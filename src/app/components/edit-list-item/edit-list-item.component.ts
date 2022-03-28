import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ListItemService } from 'src/app/services/list-items/list-item.service';


export interface UpdateListItem {
  ID: any
  list_id : any
  user_id : any
  title : any
  description : any
  is_done : any
}

@Component({
  selector: 'app-edit-list-item',
  templateUrl: './edit-list-item.component.html',
  styleUrls: ['./edit-list-item.component.css']
})
export class EditListItemComponent implements OnInit {
  loading = true;
  editListItemForm!: FormGroup;
  isCompleted : boolean = false
  updateListItemRequest: UpdateListItem = {
    ID: undefined,
    list_id: undefined,
    user_id: undefined,
    title: undefined,
    description: undefined,
    is_done: undefined
  }

  constructor(private router : Router, private fb : FormBuilder, private listItemService : ListItemService, private route : ActivatedRoute, private _snackBar: MatSnackBar) {

    this.createEditListItemForm()

    const listItemId = this.route.snapshot.paramMap.get('listItemId');
    if (listItemId == null ){
      this.loading = false 
      this._snackBar.open("No es posible recuperar la tarea. Si el error persiste comuniquese con el adminsitrador.", "Cerrar", {
        duration: 7000,
        panelClass: 'red-snackbar'
      });
    } else {

      var parsedListItemId : Number = +listItemId

      this.listItemService.getListItem(parsedListItemId).subscribe( resp => {
        console.log("Response:_>", resp)
        this.loading = false;

        this.updateListItemRequest = resp

        this.editListItemForm.get('description')?.setValue(resp.description)
        this.editListItemForm.get('title')?.setValue(resp.title)
        this.isCompleted = resp.is_done

      }, (err: HttpErrorResponse)=>{
        
        console.log("Error from service on get list item: ", err)
        this.loading = false
        console.log("Status code es: ", err.status)
  
        if (err.status == 400) {
          this._snackBar.open("Algun dato de los ingresados no pudo ser procesado correctamente. Intentelo nuevamente", "Cerrar", {
            duration: 7000,
            panelClass: 'red-snackbar'
          });
        }  
        else if(err.status == 500 ){
          this._snackBar.open("Ocurrio un error al intentar obtener la tarea. Intentelo nuevamente", "Cerrar", {
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
  }
    
  ngOnInit(): void {
  }

  createEditListItemForm(){
    this.editListItemForm = this.fb.group({ 
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  goBackToList(){
    const listID = this.route.snapshot.paramMap.get('listId');
    if (listID == null ){
      this.loading = false 
      this._snackBar.open("No es posible recuperar la lista. Si el error persiste comuniquese con el adminsitrador.", "Cerrar", {
        duration: 7000,
        panelClass: 'red-snackbar'
      });
    } else {
      this.loading = false;
      this.router.navigate(["/app/lists/", listID])
    }
  }


  get validTitle(){
    return this.editListItemForm.get('title') && !this.editListItemForm.get('title')?.invalid
  }

  get validDescription(){
    return this.editListItemForm.get('description') && !this.editListItemForm.get('description')?.invalid
  }
  
  //get isPristine(){ 
    //return this.editListItemForm.pristine
  //}

  markAsCompleted(){
    this.isCompleted = !this.isCompleted 
  }

  getDescriptionErrorMessage(){
    return "Ingrese una descripción";
  }

  getTitleMessageError(){
    return "Ingrese un título";
  }

  returnToList(){

    const listId = this.route.snapshot.paramMap.get('listId');
    if (listId == null ){
      this.loading = false 
      this._snackBar.open("No es posible recuperar la lista. Si el error persiste comuniquese con el adminsitrador.", "Cerrar", {
        duration: 7000,
        panelClass: 'red-snackbar'
      });
    } else {
      var id : Number = +listId
      this.router.navigate(["app/lists/", id])
    }

  }

  updateListItem(){

  }
}
