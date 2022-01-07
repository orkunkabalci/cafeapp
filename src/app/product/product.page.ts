import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { products } from '../services/bucket';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  catid;
  products = [];
  constructor(
    private route: ActivatedRoute,
    private modalctrl: ModalController
  ) {}

  ngOnInit() {
    this.catid = this.route.snapshot.paramMap.get('id');
    this.getproducts()
      .then((data) => (this.products = data))
  }

  getproducts() {
    return products.getAll({
      queryParams: {
        relation: true,
        filter: { 'category._id': this.catid },
      },
    });
  }

  async openmodal(data) {
    const modal = await this.modalctrl.create({
      component: ProductDetailComponent,
      componentProps: {
       productid:data
      },
    });
    await modal.present();
  }
}
