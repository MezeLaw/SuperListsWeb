import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
 
  loading = false
  creatingList = false
  fullCompleted : boolean = false
  newListForm!: FormGroup; 

  constructor(private fb : FormBuilder, private _snackBar: MatSnackBar, private router : Router, private listService : ListsService) {
    this.createNewListForm()
   }

  ngOnInit(): void {
  }


  createList() {
    
    this.creatingList = true

    console.log("Will create the list")
    const name = this.newListForm.get('name')?.value
    const description = this.newListForm.get('description')?.value

    console.log("name is: ", name)

    this.listService.create(name, description).subscribe(response => {
      console.log("Response del create: ", response)

      this.newListForm.reset()
      this.newListForm.markAsPristine()      

      this._snackBar.open("Lista creada exitosamente", "Cerrar", {
        duration: 12000,
        panelClass: 'green-snackbar'
      });

      this.creatingList = false

    }, (err: HttpErrorResponse) => {
      console.log("Error from service on create list: ", err)
      this.loading = false
      console.log("Status code es: ", err.status)

      if (err.status == 400) {
        this._snackBar.open("Algun dato de los ingresados no pudo ser procesado correctamente. Intentelo nuevamente", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      }  
      else if(err.status == 500 ){
        this._snackBar.open("Ocurrio un error al intentar crear la lista. Intentelo nuevamente", "Cerrar", {
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

  isValidForm(e:any){ 
    if(this.newListForm.get('name')?.value != "" && this.newListForm.get('description')?.value != ""){ 
      this.fullCompleted = true
    } else { 
      this.fullCompleted = false
    }
  }

  returnToLists(){
    console.log("Will return to my lists!")
    this.router.navigate(['app/lists'])
  }

  getNameMessageError(){
    return "Ingrese el nombre de la lista"
  }

  getDescriptionErrorMessage(){
    return "Ingrese una descripción"
  }
  

  get validName(){  
    return this.newListForm.get('name')?.touched && !this.newListForm.get('name')?.invalid
  }

  get validDescription() { 
    return this.newListForm.get('description')?.touched && !this.newListForm.get('description')?.invalid
  }

  get isPristine(){ 
    return this.newListForm.pristine
  }

  createNewListForm(){ 

    this.newListForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.newListForm.markAsPristine
  }

}
