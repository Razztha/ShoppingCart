import { Injectable } from '@angular/core';
import {Item} from '../item';
import {CartItem} from '../cart-item';


@Injectable()
export class ItemService {

  private cartItems : CartItem [] = [];
  
  private sItem : Item = null;
  private items : Item[]  = 
  [{itemId:11,name: 'Samsung Electronic Iron',description:'High quality steam iron',type:'1',price:'Rs.2000.00',imageUrl:'http://universalenterprise-bd.com/images/Electronics/e10.jpg'},
  {itemId:12,name: 'Sony Digital Camera',description:'High 20px camara',type:'1',price:'Rs.10000.00',imageUrl:'http://www.cpdiary.com/wp-content/uploads/2013/10/camera-connaught-place.jpg'},
  {itemId:13,name: 'Pink Tshirt',description:'Sport design all sizes',type:'2',price:'Rs.1200.00',imageUrl:'https://assets.academy.com/mgen/92/20000692.jpg'},
  {itemId:14,name: 'Denim Trouser',description:'Original Levis design',type:'2',price:'Rs.3200.00',imageUrl:'https://www.dandyfellow.com/images/j21-regular-fit-denim-jeans-p13573-89710_medium.jpg'}
  ];

  private itemImages: { id: number, imageUrl: string }[] = [
    { "id": 11, "imageUrl": "http://universalenterprise-bd.com/images/Electronics/e10.jpg" },
    { "id": 11, "imageUrl": "https://is.alicdn.com/img/pb/106/655/245/1272523753735_hz_fileserver2_2179611.jpg" },
    { "id": 11, "imageUrl": "https://images-na.ssl-images-amazon.com/images/I/41UKe%2BrljjL.jpg" },
    { "id": 11, "imageUrl": "http://www.bombayharbor.com/productImage/0235370001264489458/Steam_Spray_Electric_Iron.jpg" },
    { "id": 11, "imageUrl": "https://img2.exportersindia.com/product_images/bc-full/dir_110/3276516/electrical-iron-1518355.jpg" }
  ];


  private categories : string [] = ['Electronics','Clothes','Foods','Jewellary',
  'Shoes','Luxary Goods','Pets items','Office Items','Computer Items','Others']


  constructor() { }

  getItems()
  {
      return this.items;
  }
  getCategories()
  {
    return this.categories;
  }
  getFilteredItems(cid : number)
  {
   return this.items.filter(
          item => item.type === cid.toString());
  }
   getSelectedItem(itemId : number)
  {
    console.log(itemId);
   this.sItem =  this.items.filter(
          item => item.itemId == itemId)[0];
          return this.sItem;
  }
  getItemImages()
  {
    return this.itemImages;
  }
  getSelectedItemImages(itemId : number)
  {
    console.log(itemId);
   return  this.itemImages.filter(
          item => item.id == itemId);

  }
  addCartItems(id : string, q : any)
 {
    let ci: CartItem = new CartItem (0, '',0,'','','');
    let cItem :Item = new Item(0,'','','','','');
    cItem = this.getSelectedItem(+id);
    var ss = cItem.price.split(".", 2);
    var splitprice = +ss[1];

    for (var index = 0; index < this.cartItems.length; index++) 
    {
      if(cItem.itemId == this.cartItems[index].itemId)
        {
         this.cartItems.splice(index,1);         
        }
    }
          ci.itemId = cItem.itemId;
          ci.name = cItem.name;
          ci.price = cItem.price;
          ci.imagePath = cItem.imageUrl;
          ci.quantity = q;
          ci.total =( q*+(splitprice)).toString();
          this.cartItems.push(ci);

    console.log(this.cartItems);
 }
 getCartItems()
  {
      return this.cartItems;
  }
  deleteCartItem(id : number)
  {
    for (var index = 0; index < this.cartItems.length; index++) 
    {
      if(id == this.cartItems[index].itemId)
        {
         this.cartItems.splice(index,1);
         console.log(this.cartItems);
         localStorage.clear();   
         localStorage.setItem("cartitems", JSON.stringify(this.cartItems));
         console.log(localStorage);        
        }
    }
  }
  
}
