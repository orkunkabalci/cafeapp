import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MenuPage,
      },
      {
        path: 'product/:id',
        loadChildren: () => import('../product/product.module').then( m => m.ProductPageModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
