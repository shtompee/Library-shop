import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private productService: ProductService, private router: Router) {}
  goToBasket() {
    const currentPage = this.productService.getCurrentPage();
    this.router.navigate(['/basket'], { state: { currentPage } });
  }
}
