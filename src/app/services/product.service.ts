import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { TablePage, TablePageId } from '../TablePage';
import { ProdcutsWrapper, ProductDetails, Product } from '../models/products';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class ProductService {
  page: number;
  itemsPerPage: number;

  static getProducts: any;
  public editItemId: number;

  private history: string[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private location: Location
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  public url = 'http://localhost:3000/products';
  public getProducts(
    page: number,
    itemsPerPage: number
  ): Observable<TablePage> {
    this.page = page;
    this.itemsPerPage = itemsPerPage;
    console.log('page service ' + page);
    const params = new HttpParams()

      .set('page', page.toString())

      .set('itemsPerPage', itemsPerPage.toString());

    console.log('service params ' + params);
    return this.httpClient.get<ProdcutsWrapper>(this.url, { params }).pipe(
      map((pw: ProdcutsWrapper) => {
        return new TablePage(pw.total, pw.productList);
      })
    );
  }

  public backToList() {
    this.getProducts(this.page, this.itemsPerPage);
  }

  getProductDetail(id: number): Observable<Product> {
    const url = `${this.url}/productDetail/${id}`;

    return this.httpClient.get<Product>(url);
  }

  getCartItems(): Observable<any> {
    return this.httpClient.get<any[]>(this.url);
  }

  removeItem(Itemid: number, passsword: any): Observable<any> {
    const url = `${this.url}/remove/${Itemid}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().set('password', passsword),
    };

    return this.httpClient.delete(url, options);
  }

  setEditItemid(editItemId: number) {
    this.editItemId = editItemId;
  }

  updateItemData(
    itemId: number,
    itemData: any,
    passsword: any,
    isProductPurchasedValue: boolean
  ): Observable<any> {
    const params = new HttpParams({ fromObject: itemData });
    const urlEncodedData = params.toString();

    const url = `${this.url}/edit/${itemId}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      params: {
        password: passsword,
        isProductPurchased: isProductPurchasedValue,
      },
    };

    return this.httpClient.put<any>(url, urlEncodedData, options);
  }

  uploadProduct(requestData: any): Observable<any> {
    const url = `${this.url}/upload`;
    return this.httpClient.post(url, requestData, { responseType: 'text' });
  }

  sendEmail(data: any) {
    const url = `${this.url}/send-email`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(url, data, options);
  }

  private isProductPurchasedSubject = new BehaviorSubject<boolean>(false);

  setIsProductPurchased(value: boolean) {
    this.isProductPurchasedSubject.next(value);
  }

  getIsProductPurchased() {
    return this.isProductPurchasedSubject.asObservable();
  }

  getIsPurchasedById(id: number): Observable<any> {
    const url = `${this.url}/getIsPurchased/${id}`;
    return this.httpClient.get(url);
  }

  private currentPage: number;

  setCurrentPage(page: number) {
    console.log('setCurentPage ' + page);
    return (this.currentPage = page);
  }

  // Возвращает текущую страницу
  getCurrentPage() {
    console.log('getCurentPage ' + this.page);
    return this.page;
  }

  private scrollPositions: { [url: string]: number } = {};

  saveScrollPosition(url: string, position: number): void {
    // Сохраняем положение прокрутки для данного URL
    console.log(position);
    this.scrollPositions[url] = position;
  }

  restoreScrollPosition(url: string): number {
    // Восстанавливаем положение прокрутки для данного URL
    console.log(this.scrollPositions);
    const position = this.scrollPositions[url] || 0;

    // Очищаем сохраненное положение, чтобы оно больше не использовалось
    delete this.scrollPositions[url];

    return position;
  }
}
