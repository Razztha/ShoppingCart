import { Component, OnInit} from '@angular/core';
import {FormArray,FormControl,FormGroup,Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Item} from '../../../item';
import {CartItem} from '../../../cart-item';
import {ItemService} from '../../item.service';

@Component({
  selector: 'sc-itemaddcart',
  templateUrl: './itemaddcart.component.html',
  styleUrls: ['./itemaddcart.component.css']
})
export class ItemaddcartComponent implements OnInit {
 
  cartForm : FormGroup;
  itemPrice : number = 0;
  itemId : number = 0;
  p : string ; 
  cartItems : CartItem [] = null;
  sNames : any;

  constructor(private itemservice : ItemService,private activatedroute: ActivatedRoute,
  private router : Router) { }

  ngOnInit() {
     this.getItemPrice();
    this.initForm();
  }
 
 onSubmit()
 {
   console.log(this.cartForm.value);
   this.itemservice.addCartItems(this.cartForm.value.itemId,this.cartForm.value.quantity);
   this.cartItems = this.itemservice.getCartItems();
   this.SaveDataToLocalStorage();
   //console.log(this.cartItems);
   //this.cartForm.reset();
 }
 
 private initForm()
 {
    this.cartForm = new FormGroup(
      {
        quantity : new FormControl('quantity',[Validators.required,Validators.pattern('^[1-9]+[0-9]*$')]),
        itemPrice : new FormControl({value: this.itemPrice, disabled: true},null),
        total : new FormControl(),
        itemId : new FormControl({value: this.itemId},null),
      }
    );
 }
 private getItemPrice()
 {
   this.itemId = null;
    this.activatedroute.queryParams.subscribe((params : Params)=>
    {
        this.itemId = params['itemId'];
        this.p =  this.itemservice.getSelectedItem(this.itemId).price;
        var splitted = this.p.split(".", 2);
        this.itemPrice = +splitted[1];
    });
 }
 private SaveDataToLocalStorage()
{
  console.log(this.cartItems);    
  localStorage.setItem("cartitems", JSON.stringify(this.cartItems));
  this.sNames = JSON.parse(localStorage.getItem("cartitems"));
  console.log(this.sNames);
}
 
}
