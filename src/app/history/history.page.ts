import { Component, OnInit } from '@angular/core';
import { shopping_history } from '../services/bucket';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage  {
  constructor() {}
history
ionViewWillEnter() {
    this.getHistory().then((data)=>this.history=data)
  }

  getHistory() {
    return shopping_history.getAll({
      queryParams: {
        relation: true,
        filter: {
          user: '61d42f66c0da93002c1dc08b',
        },
        sort:{ "date":-1 } 

      },
    });
  }
}
