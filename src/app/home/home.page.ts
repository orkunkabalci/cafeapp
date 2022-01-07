import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QrComponent } from '../qr/qr.component';
import { adss, Users } from '../services/bucket';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  ads;
  user;
  reward;
  loading: boolean = true;

  constructor(private modalctrl: ModalController) {}

  async ngOnInit() {
    this.getads().then((data) => (this.ads = data));
    await this.getuser().then((data) => (this.user = data));
    await this.rewarddirnk();
    this.loading = false;
  }
  counter(i) {
    return i ? new Array(Number(i)) : [];
  }
   truncateToDecimals(num, dec = 0) {
    const calcDec = Math.pow(10, dec);
    return Math.trunc(num * calcDec) / calcDec;
  }

  getuser() {
    return Users.get('61d42f66c0da93002c1dc08b');
  }

  rewarddirnk() {
    if (this.user?.current_puan >= 5) {
      this.reward = this.user?.current_puan / 5;
      this.reward = this.truncateToDecimals(this.reward)
    }
    else{
      this.reward=0
    }
  }
  getads() {
    return adss.getAll({ queryParams: { relation: true } });
  }
  async openmodal() {
    const modal = await this.modalctrl.create({
      component: QrComponent,
    });
    modal.onDidDismiss().then((data) => {
      this.user = data.data;
      this.rewarddirnk();
    });
    await modal.present();
  }
}
