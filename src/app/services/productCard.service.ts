import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class productCard {
  items: Product[] = [];
  private storageKey = 'cartItems';

  constructor() {
    this.loadCartItems();
  }
  /* . . . */

  addToCart(product: Product) {
    const existingItem = this.items.find((item) => item.id === product.id);
    if (existingItem) {
      Swal.fire('Товар уже есть в карзине');
    } else {
      const cartItemsJson = localStorage.getItem(this.storageKey);
      let cartItems: Product[] = [];

      if (cartItemsJson) {
        cartItems = JSON.parse(cartItemsJson);

        const itemCount = cartItems.length;
        if (itemCount >= 5) {
          Swal.fire('Максимальное количество товара в корзине');
        } else {
          cartItems.push(product);

          // Сохраняем обновленные данные в localStorage
          localStorage.setItem(this.storageKey, JSON.stringify(cartItems));

          // Обновляем this.items
          this.items = cartItems;
        }
      }

      // cartItems.push(product);

      // // Сохраняем обновленные данные в localStorage
      // localStorage.setItem(this.storageKey, JSON.stringify(cartItems));

      // // Обновляем this.items
      // this.items = cartItems;
    }
  }

  isItemInCart(productId: number): boolean {
    // Получаем товары из localStorage
    const cartItemsJson = localStorage.getItem(this.storageKey);
    if (cartItemsJson) {
      const cartItems: Product[] = JSON.parse(cartItemsJson);
      return cartItems.some((item) => item.id === productId);
    }
    return false;
  }

  getItems() {
    console.log(this.items);
    return this.items;
  }

  getItemsIds() {
    return this.items.map((item) => item.id);
  }

  getItemsName() {
    return this.items.map((item) => item.name);
  }

  getItemsPrice() {
    return this.items.map((item) => item.price);
  }

  clearCart(localStorageId: any) {
    const index = this.items.findIndex((item) => item.id === localStorageId);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveCartItems();
    }
    this.saveCartItems();
    return this.items;
  }

  private loadCartItems(): void {
    const cartItemsJson = localStorage.getItem(this.storageKey);
    if (cartItemsJson) {
      this.items = JSON.parse(cartItemsJson);
    }
  }

  private saveCartItems(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  private scheduleLocalStorageCleanup() {
    const oneDayInHours = 24; // 1 день в миллисекундах
    setTimeout(() => {
      this.clearLocalStorage();
      this.scheduleLocalStorageCleanup(); // Повторно планируем очистку через сутки
    }, oneDayInHours);
  }

  // Очищаем localStorage
  private clearLocalStorage() {
    localStorage.removeItem(this.storageKey);
  }
}
