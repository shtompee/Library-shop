import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../models/products';
import {
  customValidationYear,
  customValidatorName,
} from '../components/customValidation/custom-validators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-eddit',
  templateUrl: './eddit.component.html',
  styleUrls: ['./eddit.component.scss'],
})
export class EdditComponent {
  productDetail: any;
  profileForm: any = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s]+$/),
      customValidatorName,
    ]),
    prod_year: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
    paint_size: new FormControl('', [
      Validators.required,
      this.customPaintSizeValidator,
    ]),
    techlogy: new FormControl('', Validators.required),
    isProductPurchased: new FormControl(''),
  });
  customPaintSizeValidator(control: AbstractControl) {
    const value = control.value;
    const sizePattern = /^\d+x\d+$/;
    const sizeParts = value.split('x');
    const width = parseInt(sizeParts[0]);
    const height = parseInt(sizeParts[1]);

    if (!value) {
      return { required: true };
    } else if (!sizePattern.test(value)) {
      return { invalidFormat: true };
    } else if (isNaN(width) || isNaN(height)) {
      return { invalidNumeric: true };
    } else if (width <= 0 || height <= 0) {
      return { nonPositive: true };
    }

    return null;
  }

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productService
        .getProductDetail(this.productService.editItemId)
        .subscribe(
          (response: any) => {
            // Обработка успешного ответа от сервера, если требуется

            this.productDetail = response[0];

            this.profileForm.get('name').setValue(this.productDetail.name);
            this.profileForm
              .get('prod_year')
              .setValue(this.productDetail.prod_year);
            this.profileForm.get('price').setValue(this.productDetail.price);
            this.profileForm
              .get('paint_size')
              .setValue(this.productDetail.paint_size);
          },
          (error) => {
            console.error('Произошла ошибка:', error);
            // Обработка ошибки от сервера, если требуется
          }
        );
    });
  }

  async onSubmit() {
    const isProductPurchasedValue =
      this.profileForm.get('isProductPurchased').value;

    const result: SweetAlertResult<any> = await Swal.fire({
      title: 'Enter your password',
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        maxlength: '10', // Обратите внимание на изменение типа здесь
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Submit',
    });

    if (result.dismiss === Swal.DismissReason.cancel) {
      // Действие отменено пользователем
      return;
    }

    const { value: password } = result;

    if (!password) {
      Swal.fire('Password not entered', 'You must enter a password', 'error');
      return;
    }

    const editItemId: number = this.productDetail.id; // Задайте ID элемента, который вы хотите отредактировать

    const formData = this.profileForm.value;

    this.productService
      .updateItemData(editItemId, formData, password, isProductPurchasedValue)
      .subscribe(
        (response) => {
          console.log('Данные успешно отправлены на сервер:', response);
          Swal.fire({
            icon: 'success',

            text: 'данные успешно обновлены.',
          });

          this.location.back();

          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Произошла ошибка при отправке данных:', error);
          // Обработка ошибки при отправке данных на сервер
          console.log('Статус ошибки:', error.status);
          console.log('Текст ошибки:', error.statusText);
          console.log('Тело ответа:', error.error);

          alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
        }
      );
  }
}
