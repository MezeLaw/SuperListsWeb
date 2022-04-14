import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ListItemService } from 'src/app/services/list-items/list-item.service';
import { ListItem } from '../view-list/view-list.component';


export interface UpdateListItem {
  ID: any
  list_id : any
  user_id : any
  title : any
  description : any
  is_done : Boolean
}

@Component({
  selector: 'app-edit-list-item',
  templateUrl: './edit-list-item.component.html',
  styleUrls: ['./edit-list-item.component.css']
})
export class EditListItemComponent implements OnInit {
  loading = true;
  editListItemForm!: FormGroup;
  isCompleted!: boolean; 
  updating = false;

  updateListItemRequest: UpdateListItem = {
    ID: undefined,
    list_id: undefined,
    user_id: undefined,
    title: undefined,
    description: undefined,
    is_done: false
  }

  constructor(private router : Router, private fb : FormBuilder, private listItemService : ListItemService, private route : ActivatedRoute, private _snackBar: MatSnackBar) {

    this.createEditListItemForm()  

    const listItemId = this.route.snapshot.paramMap.get('listItemId');
    if (listItemId == null ){ 
      this._snackBar.open("No es posible recuperar la tarea. Si el error persiste comuniquese con el adminsitrador.", "Cerrar", {
        duration: 7000,
        panelClass: 'red-snackbar'
      });
      this.loading = false
      this.isCompleted = false
    } else {

      var parsedListItemId : Number = +listItemId

      this.listItemService.getListItem(parsedListItemId).subscribe( resp => { 

        this.updateListItemRequest = resp

        this.editListItemForm.get('description')?.setValue(resp.description)
        this.editListItemForm.get('title')?.setValue(resp.title)
        console.log("response of isDOne = ", resp.is_done)
        this.editListItemForm.get('isDone')?.setValue(resp.is_done)
        this.isCompleted = resp.is_done
        this.loading = false

      }, (err: HttpErrorResponse)=>{
        this.isCompleted = false

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
      description: [''],
      isDone: [Boolean, Validators.required]
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
  
  get isPristine(){ 
    return this.editListItemForm.pristine
  } 

  markAsCompleted(){ 

    console.log("markAsCompleted click") 
    this.isCompleted = !this.isCompleted   
    console.log("IS COMPLETED IS : ",this.isCompleted)
    this.editListItemForm.get('isDone')?.setValue(this.isCompleted)
    console.log("Asigne el isCompleted al form!")
    console.log("actualizacion del check despues de apretar el boton. Ahora es: ", this.editListItemForm.get('isDone')?.value)
  
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
 

  public updateStatus(event: MatCheckboxChange) {

    if (!event.source.checked) {
      console.log("aprete el boton de updateStatus y es false")
       this.isCompleted = false
    } else {
      console.log("aprete el boton de updateStatus y es true")
      this.isCompleted = true
    }
 
 };

  updateListItem(){
    this.updating = true
    const listID = this.route.snapshot.paramMap.get('listId');
    if (listID == null ){
      this.updating = false 
      this._snackBar.open("No es posible recuperar la lista. Si el error persiste comuniquese con el adminsitrador.", "Cerrar", {
        duration: 7000,
        panelClass: 'red-snackbar'
      });
    }

    const listItemID = this.route.snapshot.paramMap.get('listItemId');
    if (listItemID == null ){
      this.updating = false 
      this._snackBar.open("No es posible recuperar la tarea. Si el error persiste comuniquese con el adminsitrador.", "Cerrar", {
        duration: 7000,
        panelClass: 'red-snackbar'
      });
    }

    if (listItemID != null && listID != null){
      var listItemIdToNumber : Number = +listItemID
      var listIdToNumber : Number = +listID

      this.editListItemForm.get('isDone')?.setValue(this.isCompleted)

      var isDone : boolean = this.editListItemForm.get('isDone')?.value
      var updatedTitle = this.editListItemForm.get('title')?.value
      var updatedDescription = this.editListItemForm.get('description')?.value
 

      console.log("this.isCompleted on submit=", this.isCompleted)
      console.log("isDone from form before submit", isDone)
      var updateRequest : UpdateListItem = {
        ID: listItemIdToNumber, list_id: listIdToNumber, title: updatedTitle, description: updatedDescription, is_done: isDone,
        user_id: undefined
      }
  
  
      this.listItemService.update(updateRequest).subscribe(resp => {
        this.updating = false
        console.log("Se actualizó correctamente la tarea. Resp: ",resp)
        this._snackBar.open("Tarea actualizada exitosamente", "Cerrar", {
          duration: 7000,
          panelClass: 'green-snackbar'
        });
      }, (err: HttpErrorResponse)=>{
        console.log("Error al intentar actualizad la tarea: ", err)
        this.updating = false
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
}
