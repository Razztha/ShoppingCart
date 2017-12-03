import { Component, OnInit, Input} from '@angular/core';
import {Item} from '../item';
import {ItemService} from './item.service';

@Component({
  selector: 'sc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 categories : string [] = null;
  items : Item[] = null;

  constructor(private itemservice : ItemService) {

   }
 

  ngOnInit() {
    this.categories = this.itemservice.getCategories();
  }

}
