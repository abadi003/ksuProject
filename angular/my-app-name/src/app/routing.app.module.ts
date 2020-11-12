import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports route
import { CartComponent } from './cart/cart.component';
import { InvoicesComponent } from './invoices.component';
import { ItemComponent } from './item.component';

const routes: Routes = [
  { path: '', component: ItemComponent },
  { path: 'cart', component: CartComponent },
  { path: 'invoices', component: InvoicesComponent }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
