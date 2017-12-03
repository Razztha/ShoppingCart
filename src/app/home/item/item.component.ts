import { Component, OnInit, Input,OnDestroy} from '@angular/core';
import {Item} from '../../item';
import {ItemService} from '../item.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'sc-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {


  items : Item[] = null;
  constructor(private itemservice : ItemService,private activatedroute: ActivatedRoute,private router : Router) {
    
   }

  ngOnInit() {
    let cid = null;
    this.activatedroute.queryParams.subscribe((params : Params)=>
    {
        cid = params['category'];
        if(cid == 0 || cid == null)
        {
          this.getItems();
        }
        else
        {
          this.filterItems(cid);
        }
    });    
  }

  getItems()
  {
    this.items = this.itemservice.getItems();
  }
  filterItems(cid : number)
  {

    this.items = this.itemservice.getItems();
    this.items = this.itemservice.getFilteredItems(cid);
  }
 
}
