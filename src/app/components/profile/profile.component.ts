import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fechaCreate : any
  name : any
  email : any 

  breakpoint: any;
  constructor(private profileService : ProfileService) {


    this.profileService.getProfileData().subscribe( response =>{
      console.log("Data obtenida desde el profile service: ", response)
      this.fechaCreate = response.CreatedAt
      this.email = response.email
      this.name = response.name
    }, err => {
      console.log("error al intentar recuperar el profle. Error: ", err)
    })

  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;
  }

  onResize(event:any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
  }


}
