import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ListsService } from 'src/app/services/lists/lists.service';

@Component({
  selector: 'app-join-list',
  templateUrl: './join-list.component.html',
  styleUrls: ['./join-list.component.css']
})
export class JoinListComponent implements OnInit {
  loading = false
  joinListForm!: FormGroup; 
  fullCompleted : boolean = false
  
  constructor(private fb : FormBuilder, private _snackBar: MatSnackBar, private router : Router, private listService : ListsService) {
    this.createJoinListForm()
   }

  ngOnInit(): void {
  }

  jointoList(){
    this.loading = true
    const inviteCode = this.joinListForm.get('code')?.value
    console.log("JOIN TO LIST WITH CODE: ", )
    this.listService.joinList(inviteCode).subscribe(resp => {
      
      this.joinListForm.reset()
      this.joinListForm.markAsPristine() 

      console.log("Volvi del join list con la siguiente rta: ", resp) 
      this._snackBar.open("Te uniste exitosamente a la lista", "Cerrar", {
        duration: 12000,
        panelClass: 'green-snackbar'
      });

      this.loading = false
    }, (err: HttpErrorResponse) => {
      console.log("Error from service on join list: ", err)
      this.loading = false
      console.log("Status code es: ", err.status)

      if (err.status == 400) {
        this._snackBar.open("Algun dato de los ingresados no pudo ser procesado correctamente. Intentelo nuevamente", "Cerrar", {
          duration: 7000,
          panelClass: 'red-snackbar'
        });
      }  
      else if(err.status == 500 ){
  
        if(err.error === "You are already on this list!!"){ 
          this._snackBar.open("Ya estás en esta lista!", "Cerrar", {
            duration: 7000,
            panelClass: 'red-snackbar'
          });
        } else {
          this._snackBar.open("Ocurrio un error al intentar unirse a la lista. Intentelo nuevamente", "Cerrar", {
            duration: 7000,
            panelClass: 'red-snackbar'
          });
        } 
      } else if (err.status == 404) {
        this._snackBar.open("El código ingresado no corresponde a ninguna lista!", "Cerrar", {
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
    console.log("entre al isValid") 
    if(this.joinListForm.get('code')?.value != ""){ 
      this.fullCompleted = true
    } else { 
      this.fullCompleted = false
    }
  }

  returnToLists(){
    this.router.navigate(['app/lists/'])
  }

  getCodeMessageError(){
    return "Codigo invalido"
  }
  
  createJoinListForm(){
    this.joinListForm = this.fb.group({
      code: ['', Validators.required]
    })

    this.joinListForm.markAsPristine
  }

  get validCode(){  
    return this.joinListForm.get('code')?.touched && !this.joinListForm.get('code')?.invalid
  }

  get isPristine(){ 
    return this.joinListForm.pristine
  }
}
