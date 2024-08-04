import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.Component.html',
  styleUrls: ['./manager-login.Component.css']
})
export class managerlogincomponent implements OnInit{

  constructor( public userService: UserService) { 
  }
  ngOnInit(): void {

  }
}


