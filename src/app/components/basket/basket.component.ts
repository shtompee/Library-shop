import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/products';
import { ProductService as ProductService } from 'src/app/services/product.service';
import { productCard } from 'src/app/services/productCard.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  items: any[] = this.cardService.getItems();
  page: any = this.productService.getCurrentPage();
  currentPage: number = 1;
  constructor(
    private cardService: productCard,
    private productService: ProductService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      // Получаем значение параметра 'page' из маршрута
      this.currentPage = +params['page'] || 1; // Используем значение параметра или устанавливаем 1 как значение по умолчанию
    });
  }
  ngOnInit() {
    this.productService.getCurrentPage();
  }

  removeFromCart(localStorageId: any) {
    this.cardService.clearCart(localStorageId);
  }

  calculateSubtotal(): number {
    let totalAmount = 0;

    for (const item of this.items) {
      totalAmount += item.price;
    }

    return totalAmount;
  }

  isCartEmpty(): boolean {
    return this.items == null || this.items.length == 0;
  }

  goBack(): void {
    console.log(this.items);
    console.log('aaaa' + this.page);
    const currentPage = this.productService.getCurrentPage();

    const savedScrollPosition = this.productService.restoreScrollPosition(
      `/products/${currentPage}`
    );

    window.scrollTo(0, savedScrollPosition);

    console.log('Basket component ' + currentPage, savedScrollPosition);
    if (performance.navigation.type === 1) {
      // Страница была обновлена, перезагружаем страницу
      this.router.navigate(['/products']);
    } else {
      // Страница не была обновлена, перенаправляем на главную страницу
      this.router.navigate(['/products', currentPage]);
    }
  }
  goToDetails(item: Product): void {
    // Получаем ID товара из localStorage
    const localStorageId: any = localStorage.getItem('productId');

    // Сравниваем его с ID текущего товара
    if (localStorageId === item.id) {
      // Если ID совпадают, перенаправляем на страницу productDetail с параметром page
      this.router.navigate(['/productDetail', item.id], {
        queryParams: { page: localStorage.getItem('page') },
      });
    }
  }

  goToProductDetailFromCart(item: Product) {
    this.router.navigate(['/productDetail', item.id, { fromCart: true }]);
  }
}
