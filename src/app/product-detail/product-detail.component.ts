import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { products, Users } from '../services/bucket';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Input() productid;
product;
user;
fav:boolean
loading: boolean = true;
index;

  constructor(private modalctrl: ModalController) {}

 async ngOnInit() {
   await this.getpropduct().then((data)=>this.product=data)
   await this.getuser().then((data)=>this.user=data)
   await this.favcheck()
   this.loading = false;

  }

  dismiss(){
    this.modalctrl.dismiss(this.user)
  }

  favcheck(){
    this.fav=this.user.favorities.map((item)=>item._id).includes(this.productid)
  }


  async favaction(){
    if(this.fav==true)
    {
      this.index=this.user.favorities.map((item)=>item._id).indexOf(this.productid)
      this.user.favorities.splice(this.index,1)
      this.fav=false
      return Users.patch(JSON.parse(JSON.stringify(this.user)));
    }
    else{
      this.user.favorities.unshift(this.product)
      this.fav=true

      return Users.patch(JSON.parse(JSON.stringify(this.user)));

    }
  }

  getuser(){
    return Users.get('61d42f66c0da93002c1dc08b',{queryParams:{relation:true}})
  }
  getpropduct(){
    return products.get(this.productid,{queryParams:{relation:true}})
  }
}
