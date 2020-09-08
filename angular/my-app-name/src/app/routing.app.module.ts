import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports route
import { CartComponent } from './cart/cart.component';
import { AppComponent } from './app.component';

const routes: Routes = [{ path: '', component:AppComponent },
  { path: 'cart', component: CartComponent }]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
