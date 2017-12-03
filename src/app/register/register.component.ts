import { Component, OnInit, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../user';

@Component({
  selector: 'sc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }
 
  @Input() user : User = {username : '', password: '',agree: null};

  ngOnInit() {
  }
  onSubmit(adduser :User)
  {
      this.user = new User(adduser.username,adduser.password,adduser.agree);
      console.log(this.user);
  }

}
