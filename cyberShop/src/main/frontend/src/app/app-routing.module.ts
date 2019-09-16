import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartComponent } from './cart/cart.component';
import { PurchaseComponent } from './cart/purchase/purchase.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: 'purchase', component: PurchaseComponent },
  { path: 'product', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  { path : '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
