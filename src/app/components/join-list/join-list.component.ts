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
  
  constructor(private fb : FormBuilder, private _snackBar: MatSnackBar, private router : Router, private listService : ListsService) {
    this.createJoinListForm()
   }

  ngOnInit(): void {
  }

  jointoList(){
    console.log("JOIN TO LIST WITH CODE: ", )
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
