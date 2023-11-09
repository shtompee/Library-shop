"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var TablePage_1 = require("../TablePage");
var ProductService = /** @class */ (function () {
    function ProductService(httpClient) {
        this.httpClient = httpClient;
        this.url = 'http://localhost:3000/products';
    }
    ProductService.prototype.getProducts = function (page, itemsPerPage) {
        var params = new http_1.HttpParams()
            .set('page', page.toString())
            .set('itemsPerPage', itemsPerPage.toString());
        return this.httpClient.get(this.url, { params: params }).pipe(rxjs_1.map(function (pw) {
            return new TablePage_1.TablePage(pw.total, pw.productList);
        }));
    };
    ProductService.prototype.getProductDetail = function (id) {
        var url = this.url + "/productDetail/" + id;
        return this.httpClient.get(url);
    };
    // public addToCart(productIdCard: number): Observable<any>{
    //   const url = `${this.url}/basket/` + productIdCard;
    //     return this.httpClient.post<any>(url, {});
    // }
    ProductService.prototype.getCartItems = function () {
        return this.httpClient.get(this.url);
    };
    ProductService.prototype.removeItem = function (Itemid, passsword) {
        // console.log('aaaaa' + passsword);
        // console.log('daaam' + Itemid);
        var url = this.url + "/remove/" + Itemid;
        var options = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            }),
            params: new http_1.HttpParams().set('password', passsword)
        };
        return this.httpClient["delete"](url, options);
    };
    // public editItem(productIdCard: number): Observable<any>{
    //   const url = `${this.url}/edit/${productIdCard}`;
    //     return this.httpClient.post<any>(url, {});
    // }
    ProductService.prototype.setEditItemid = function (editItemId) {
        this.editItemId = editItemId;
        console.log(this.editItemId);
    };
    ProductService.prototype.updateItemData = function (itemId, itemData) {
        console.log(itemData);
        var url = this.url + "/eddit/" + itemId;
        var options = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        // if (itemData.name !== null && itemData.name !== undefined) {
        //   console.log(222,itemData.name)
        // } else {
        //   console.log("111");
        //   // Вы можете выполнить дополнительные действия здесь, если это необходимо.
        // }
        // console.log('aaaa  ' + itemId);
        // console.log('aaaa  ' + itemData.name);
        // console.log('aaaa  ' + itemData.prod_year);
        // console.log('aaaa  ' + itemData.price);
        // console.log('aaaa  ' + itemData.paint_size);
        // console.log('aaaa  ' + itemData.techlogy);
        return this.httpClient.put(url, itemData, options);
    };
    ProductService = __decorate([
        core_1.Injectable()
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
