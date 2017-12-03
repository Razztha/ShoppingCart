import { Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Item} from '../../item';
import {ItemService} from '../item.service';


@Component({
  selector: 'sc-itemdetail',
  templateUrl: './itemdetail.component.html',
  styleUrls: ['./itemdetail.component.css']
})
export class ItemdetailComponent implements OnInit {

  public selectedItem : Item;
  private selectedItemImages: { id: number, imageUrl: string }[];
  constructor(private itemservice : ItemService,private activatedroute: ActivatedRoute,private router : Router) 
  {
    
  }

  ngOnInit() {
    let itemId = null;
    this.activatedroute.queryParams.subscribe((params : Params)=>
    {
        itemId = params['itemId'];
        this.selectedItem =  this.itemservice.getSelectedItem(itemId);
        this.selectedItemImages = this.itemservice.getSelectedItemImages(itemId);
    });
  }
  
  imageChange(imgpath : string,mainImage : any)
  {
    mainImage.src=imgpath;
  }
 
}
