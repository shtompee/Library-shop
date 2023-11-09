import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './api/in-memory-data-service.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/UI/header/header.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { MainComponent } from './components/main/main.component';
import { BasketComponent } from './components/basket/basket.component';
import { ContactComponent } from './components/contact/contact.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './services/product.service';
import { EdditComponent } from './eddit/eddit.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    ProductsDetailsComponent,
    MainComponent,
    BasketComponent,
    ContactComponent,
    EdditComponent,
    AddNewProductComponent,
    EmailFormComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTrimDirectiveModule,

    HttpClientModule,
    NgxIntlTelInputModule,
    //delete
    // HttpClientInMemoryWebApiModule .forRoot(
    //   InMemoryDataService,{dataEncapsulation:false}

    // )
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
