import { Component, OnInit } from '@angular/core';
import { Users, } from '../services/bucket';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {
user
loading: boolean = true;

  constructor() { }

  async ionViewWillEnter() {
   await this.getuser().then((data)=>this.user=data)
    this.loading=false
  }

  getuser(){
    return Users.get('61d42f66c0da93002c1dc08b',{queryParams:{relation:true}})
  }

}
