import { Component, OnInit } from '@angular/core';
import { branches } from '../services/bucket';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {
  stores;
  loading = true;
  activeStoresSegment = [];

  constructor() {}

  async ngOnInit() {
    await this.getstores().then((data) => {
      this.stores = data;
      this.activeStoresSegment = this.stores.map((item) => {
        return { id: item._id, segment: 'info' };
      });
    });
    this.loading = false;
  }

  getstores() {
    return branches.getAll({ queryParams: { relation: true } });
  }

  segmentChanged(data, index) {
    this.activeStoresSegment[index].segment = data;
  }
}
