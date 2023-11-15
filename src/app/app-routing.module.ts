import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { ContactComponent } from './components/contact/contact.component';
import { BasketComponent } from './components/basket/basket.component';
import { EdditComponent } from './eddit/eddit.component';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { EmailFormComponent } from './email-form/email-form.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:page', component: ProductsComponent },
  { path: 'productDetail/:id', component: ProductsDetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'eddit', component: EdditComponent },
  { path: 'addNewProduct', component: AddNewProductComponent },
  { path: 'emailForm', component: EmailFormComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
