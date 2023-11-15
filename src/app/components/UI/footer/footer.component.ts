import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private productService: ProductService, private router: Router) {}
  goToBasket() {
    const currentPage = this.productService.getCurrentPage();
    this.router.navigate(['/basket'], { state: { currentPage } });
  }
}
