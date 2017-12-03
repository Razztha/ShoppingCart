import { Component, OnInit } from '@angular/core';
import {CartItem} from '../../cart-item';
import {ItemService} from '../item.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'sc-itemcart',
  templateUrl: './itemcart.component.html',
  styleUrls: ['./itemcart.component.css']
})
export class ItemcartComponent implements OnInit {

  CI : CartItem [] = [];
  constructor(private itemservice : ItemService) { }

  ngOnInit() {
    this.getLocalStorageData();
  }
  getLocalStorageData()
  {
  var storedNames = JSON.parse(localStorage.getItem("cartitems"));
  //console.log(storedNames);
  for (var index = 0; index < storedNames.length; index++) {
   let c: CartItem = new CartItem (0, '',0,'','','');
   c.itemId=storedNames[index].itemId;
   c.imagePath=storedNames[index].imagePath; 
   c.name=storedNames[index].name;
   c.price=storedNames[index].price; 
   c.quantity=storedNames[index].quantity;   
   c.total=storedNames[index].total;
   this.CI.push(c); 
  }

  console.log("cc");
  console.log(this.CI);
  }
 deleteItem(id: number)
 {
   this.itemservice.deleteCartItem(id);
   this.CI=this.itemservice.getCartItems();
 }
}
