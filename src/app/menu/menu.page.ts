import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { category, products, Users } from '../services/bucket';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  categories;
  headcat = [];
  asd;
  seccat = [];
  thirdcat = [];
  activecat;
  activesegment;
  user;
  loading: boolean = true;
  products;
  searchTerm: string;

  constructor(private modalctrl: ModalController) {}

  async ngOnInit() {
    await this.getcategories().then((data) => (this.categories = data));
    await this.getheadcat();
    await this.getseccat();
    await this.getthirdcat();
    this.segmentChanged('menu');
    this.loading = false;
  }
  async ionViewWillEnter() {
    this.getuser();
  }
  getcategories() {
    return category.getAll({ queryParams: { relation: true } });
  }
  async searchProduct(terms: any) {
    this.products = await products.getAll({
      queryParams: {
        filter: {
          
             name: { $regex: terms, $options: 'i' } ,
          
        },
        limit: 7,
      },
    });
  }
  ionViewDidLeave(){
    this.searchTerm = "";
  }
  getheadcat() {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].subcategory == undefined) {
        this.headcat.push(this.categories[i]);
        this.categories.splice(i, 1);
        i = i - 1;
      }
    }
  }
  getseccat() {
    for (let i = 0; i < this.categories.length; i++) {
      if (
        this.headcat
          .map((item) => item._id)
          .includes(this.categories[i].subcategory?._id)
      ) {
        this.seccat.push(this.categories[i]);
        this.categories.splice(i, 1);
        i = i - 1;
      }
    }
  }
  getthirdcat() {
    for (let i = 0; i < this.categories.length; i++) {
      if (
        this.seccat
          .map((item) => item._id)
          .includes(this.categories[i].subcategory?._id)
      ) {
        this.thirdcat.push(this.categories[i]);
      }
    }
  }

  segmentChanged(data) {
    this.activesegment = data;
  }
  active(data) {
    if (this.activecat != data) {
      this.activecat = data;
    } else {
      this.activecat = undefined;
    }
  }

  getuser() {
    return Users.get('61d42f66c0da93002c1dc08b', {
      queryParams: { relation: true },
    }).then((data) => (this.user = data));
  }

  async openmodal(data) {
    const modal = await this.modalctrl.create({
      component: ProductDetailComponent,
      componentProps: {
        productid: data,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.user = data.data;
    });
    await modal.present();
  }
}
