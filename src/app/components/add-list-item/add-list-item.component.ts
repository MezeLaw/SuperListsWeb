import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ListItemService } from 'src/app/services/list-items/list-item.service';

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
  selector: 'app-add-list-item',
  templateUrl: './add-list-item.component.html',
  styleUrls: ['./add-list-item.component.css']
})
export class AddListItemComponent implements OnInit {

  loading : Boolean = false;

  newListItemForm!: FormGroup;
  constructor(private fb : FormBuilder, private route : ActivatedRoute, private _snackBar: MatSnackBar, private listItemService : ListItemService, private router : Router) {
    this.createNewListItemForm(); 
  }

  ngOnInit(): void {
  }

  createNewListItemForm(){ 

    this.newListItemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.newListItemForm.markAsPristine
  }

  get validTitle(){
    return this.newListItemForm.get('title')?.touched && !this.newListItemForm.get('title')?.invalid
  }

  get validDescription(){
    return this.newListItemForm.get('description')?.touched && !this.newListItemForm.get('description')?.invalid
  }
  
  get isPristine(){ 
    return this.newListItemForm.pristine
}

  getTitleMessageError(){
    return "Ingrese un titulo para la tarea"
  }

  getDescriptionErrorMessage(){
    return "Ingrese una descripción"
  }

  createListItem(){
    console.log("Entre al add list Item")
    this.loading = true;

    const listID = this.route.snapshot.paramMap.get('listId');
    console.log("ListID recovered is: ", listID)
    if (listID == null ){
      this.loading = false 
      this._snackBar.open("No es posible recuperar la lista. Si el error persiste comuniquese con el adminsitrador.", "Cerrar", {
        duration: 7000,
        panelClass: 'red-snackbar'
      });
    } else{
      
      const title = this.newListItemForm.get('title')?.value
      const description = this.newListItemForm.get('description')?.value

      if (title == null || description == null ) {
        this.loading = false;
        this._snackBar.open("Ingrese un titulo y/o descripción", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        })
      } 
      
      var listItemRequest: ListItem = {
        list_id: listID, 
        title: title, 
        description: description,
        ID: undefined,
        CreatedAt: undefined,
        user_id: undefined,
        is_done: false
      };

      this.listItemService.createItem(listItemRequest).subscribe(response=>{
      console.log("Response del create: ", response)
      this._snackBar.open("Lista creada exitosamente", "Cerrar", {
        duration: 7000,
        panelClass: 'green-snackbar'
      });

      this.loading = false
      
      }, (err : HttpErrorResponse)=>{
        console.log("Error from service on create list item: ", err)
      this.loading = false
      console.log("Status code es: ", err.status)

      if (err.status == 400) {
        this._snackBar.open("Algun dato de los ingresados no pudo ser procesado correctamente. Intentelo nuevamente", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      }  
      else if(err.status == 500 ){
        this._snackBar.open("Ocurrio un error al intentar crear la tarea. Intentelo nuevamente", "Cerrar", {
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
      this.loading = false
    }
  }

  returnToList(){
    const listID = this.route.snapshot.paramMap.get('listId');
    if (listID == null ){
      this.loading = false 
      this._snackBar.open("No es posible recuperar la lista. Si el error persiste comuniquese con el adminsitrador.", "Cerrar", {
        duration: 7000,
        panelClass: 'red-snackbar'
      });
    } else{
      this.router.navigate(['app/lists/', listID])
    }
  }

}