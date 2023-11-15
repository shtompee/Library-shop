import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';
import { productCard } from 'src/app/services/productCard.service';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
@HostListener('document:keydown.control.y', ['$event'])
export class ProductsComponent implements OnInit {
  public page: number = 1;
  public itemsPerPage: number = 6;
  public collectionSize: number;
  public showButton: boolean = false;
  private isButtonShown: boolean = false;
  public id: any;
  public product: Array<any>;

  constructor(
    private cartService: productCard,
    private ProductService: ProductService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //this.route.url.subscribe((urlSegments) => {});
    console.log('component reloaded' + this.page);
    // this.loadPage();
  }

  @HostListener('window:scroll', ['$event'])
  beforeUnloadHandler(event: Event): void {
    // Сохраняем вертикальное положение прокрутки перед уходом со страницы
    const currentUrl = window.location.pathname;
    const scrollY = window.scrollY;

    this.ProductService.saveScrollPosition(currentUrl, scrollY);
  }

  console() {}

  onPageChanged() {
    // Обновляем URL с новым значением "page"
    // console.log(this.router.navigate([this.page]));

    this.router.navigate(['/products', this.page], {
      queryParams: { page: this.page, itemsPerPage: this.itemsPerPage },
    });
    window.scrollTo(0, 0);
    this.loadPage();
  }

  ngOnInit() {
    const keydown$ = fromEvent<KeyboardEvent>(document, 'keydown');

    const ctrlY$ = keydown$.pipe(
      filter(
        (event) => (event.ctrlKey && event.key === 'y') || event.key === 'н'
      )
    );

    ctrlY$.subscribe(() => {
      if (!this.isButtonShown) {
        this.showButton = true;
        this.cdr.detectChanges();
        this.isButtonShown = true;
      } else {
        this.showButton = false;
        this.cdr.detectChanges();
        this.isButtonShown = false;
      }
    });

    this.route.params.subscribe((params) => {
      // Получаем значение параметра "page" из URL
      const requestedPage = +params['page'] || 1;
      console.log('Запрошенная страница: ' + requestedPage);

      // Загружаем данные для текущей страницы
      this.ProductService.getProducts(
        requestedPage,
        this.itemsPerPage
      ).subscribe((p) => {
        console.log('componentRows  ' + p.totalCount, p.rows);
        this.product = p.rows;
        this.collectionSize = p.totalCount;

        // Устанавливаем текущую страницу после успешной загрузки данных
        this.page = requestedPage;
      });
    });
  }

  loadPage() {
    // Получаем данные для текущей страницы
    this.ProductService.getProducts(this.page, this.itemsPerPage).subscribe(
      (p) => {
        // console.log(p.totalCount, p.rows);
        this.product = p.rows;
        this.collectionSize = p.totalCount;
      }
    );
  }

  addToCart(product: Product) {
    const currentPageUrl = this.router.url; // Получаем текущий URL страницы
    localStorage.setItem(`productUrl_${product.id}`, currentPageUrl);
    // Сохраните состояние корзины в Local Storage

    this.cartService.addToCart(product);
    const cartItems = this.cartService.getItems();

    console.log(cartItems);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.cdr.detectChanges();
  }

  removeItem(Itemid: any) {
    Swal.fire({
      title: 'Enter your password',
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        maxlength: '10',
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Submit',
    }).then((result: SweetAlertResult<any>) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        // Действие отменено пользователем
        return;
      }

      const { value: password } = result;

      if (!password) {
        Swal.fire('Password not entered', 'You must enter a password', 'error');
        return;
      }

      // Вы можете добавить здесь ваш код для удаления элемента, передавая пароль на сервер
      console.log(Itemid);
      console.log(password);

      this.ProductService.removeItem(Itemid, password).subscribe(
        (response) => {
          // Обновляем страницу с учетом новой страницы
          this.onPageChanged();
          console.log('Товар успешно удален', response);
          // Обновите список товаров или сделайте другие необходимые действия после успешного удаления
        },
        (error) => {
          if (error.status === 401) {
            Swal.fire(
              'Incorrect password',
              'The entered password is incorrect',
              'error'
            );
          } else {
            console.error('Произошла ошибка при удалении товара:', error);
          }
        }
      );
    });
  }

  setEditItem(editItemId: number) {
    this.ProductService.setEditItemid(editItemId);
  }

  saveCurrentPage() {
    // Обновляем URL с новым значением "page"
    console.log('productComponent saveCurrentPage 1 ' + this.page);
    this.router.navigate(['/products', this.page]);
    // Устанавливаем текущую страницу в ProductService
    console.log('productComponent saveCurrentPage 2 ' + this.page);
    this.ProductService.setCurrentPage(this.page);
  }

  isItemInCart: boolean = false;

  checkItemInCart(prdouctDetailId: any) {
    // Проверяем наличие товара в корзине по его ID

    this.isItemInCart = this.cartService.isItemInCart(prdouctDetailId);

    return this.isItemInCart;
  }

  fromProduct(item: any) {
    window.scrollTo(0, 0);
    this.router.navigate(['/productDetail', item.id], {
      queryParams: { page: this.page, fromProduct: true },
    });
  }

  // this.router.navigate(['/products', this.page], {
  //   queryParams: { page: this.page, itemsPerPage: this.itemsPerPage },
  // });
}
