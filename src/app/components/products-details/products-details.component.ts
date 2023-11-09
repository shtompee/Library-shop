import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';
import { productCard } from 'src/app/services/productCard.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit {
  productId: number;
  productDetail: any;
  public product: any;
  public id: any;
  public productIdCard: any;

  isItemInCart: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: productCard,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  isProductPurchased: boolean = false;
  productDetailUrl: string = '';
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];

      const fromProduct = params['fromProduc'];
      const fromCart = params['fromCart'];
      console.log('boba ' + fromProduct);
      console.log('biba ' + fromCart);
      if (fromProduct) {
        // Вызываем scroll() если переход из Product
        console.log('boba ' + fromProduct);

        this.scrol();
      } else if (fromCart) {
        this.back();

        const storedProductUrl = localStorage.getItem(
          `productUrl_${this.productId}`
        );
        if (storedProductUrl) {
          this.productDetailUrl = storedProductUrl;
        }
      }
    });
    this.loadProductDetail();
  }

  loadProductDetail() {
    this.productService.getProductDetail(this.productId).subscribe(
      (response: any) => {
        console.log(this.productDetail);
        this.productDetail = response[0];
      },
      (error) => {
        console.error(
          'Произошла ошибка при получении детальной информации о продукте:',
          error
        );
      }
    );
  }

  addToCart(product: Product) {
    localStorage.setItem('previousPage', this.router.url);
    this.cartService.addToCart(product);
  }

  checkItemInCart(prdouctDetailId: any) {
    // Проверяем наличие товара в корзине по его ID

    const productId = this.productId;

    this.isItemInCart = this.cartService.isItemInCart(prdouctDetailId);

    return this.isItemInCart;
  }

  back(): void {
    console.log('back');
    if (this.productDetailUrl) {
      window.location.href = this.productDetailUrl; // Перенаправление на сохраненный URL товара
    }
  }
  scrol() {
    console.log('scrol');

    const currentPage = this.productService.getCurrentPage();

    const savedScrollPosition = this.productService.restoreScrollPosition(
      `/products/${currentPage}`
    );
    this.router.navigate(['/products', currentPage]);
    console.log('savedScroll ' + savedScrollPosition);
    window.scrollTo(0, savedScrollPosition);
  }
}

// back(): void {

//     const currentPage = this.productService.getCurrentPage();

//       const savedScrollPosition = this.productService.restoreScrollPosition(
//         `/products/${currentPage}`
//       );
//       console.log(currentPage);
//       window.scrollTo(0, savedScrollPosition);
//       console.log(currentPage);
//       this.router.navigate(['/products', currentPage]);

// }

// else {
// const savedScrollPosition = this.productService.restoreScrollPosition(
//   `/products/${currentPage}`
// );
// console.log(currentPage);
// window.scrollTo(0, savedScrollPosition);
// console.log(currentPage);
// this.router.navigate(['/products', currentPage]);
// }
