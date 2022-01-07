import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { shopping_history, Users } from '../services/bucket';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements OnInit {
  user;
  reward: boolean;
  constructor(private modalctrl: ModalController) {}

  async ngOnInit() {
    await this.getuser().then((data) => (this.user = data));
    this.havereward();
  }
  havereward() {
    this.reward = this.user.current_puan < 5;
  }

  dismiss() {
    this.modalctrl.dismiss(this.user);
  }

  takereward() {
    if (this.user.current_puan >= 5) {
      this.user.current_puan = this.user.current_puan - 5;
      Users.patch(this.user);
      this.havereward();
      this.dismiss();
    }
  }
  getpuan() {
    this.user.current_puan = this.user.current_puan + 1;
    this.user.total_puan = this.user.total_puan + 1;
    Users.patch(this.user);
    this.havereward();
    this.dismiss();
    this.addHistory();

  }
  addHistory() {
    shopping_history.insert({
      user: '61d42f66c0da93002c1dc08b',
      earned_puan: 1,
      branches:'61d5aca4c0da93002c1dccf9'
    });
  }

  getuser() {
    return Users.get('61d42f66c0da93002c1dc08b');
  }
}
