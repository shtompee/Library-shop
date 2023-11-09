import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

import { ProductService } from 'src/app/services/product.service';
import { productCard } from '../services/productCard.service';
import { Router } from '@angular/router';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
})
export class EmailFormComponent {
  emailForm: FormGroup;
  private storageKey = 'cartItems';
  constructor(
    private productService: ProductService,
    private cardService: productCard,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s]+$/),
      ]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),

      // ContactNumber: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern(
      //     /^([+](\d{1,3})\s?)?((\(\d{3,5}\)|\d{3,5})(\s)?)\d{3,8}$/
      //   ),
      //   Validators.pattern(/^[^\s]+$/),
      // ]),

      message: new FormControl(''),
    });
  }

  submitForm() {
    if (this.emailForm.valid) {
      const itemsIds = this.cardService.getItemsIds();
      const itemsName = this.cardService.getItemsName();
      const itemsPrice = this.cardService.getItemsPrice();
      const formValues = this.emailForm.value; // Получаем данные из формы

      const combinedData = {
        itemsName: itemsName,
        itemsIds: itemsIds,
        itemsPrice: itemsPrice,
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        message: formValues.message,
      };
      const loadingAlert: any = Swal.fire({
        title: 'Подождите...',
        text: 'Отправка данных...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      this.productService.sendEmail(combinedData).subscribe(
        (response) => {
          console.log('Email sent successfully:', response);

          // Закрыть индикатор ожидания
          loadingAlert.close();

          Swal.fire({
            icon: 'success',
            title: 'Заказ успешно оформлен!',
            text: 'Ожидайте, с вами скоро свяжутся.',
          }).then((result) => {
            if (result.isConfirmed) {
              // Пользователь нажал "ОК" в алерте, выполняем оставшиеся действия

              localStorage.clear();
              window.location.reload();
            }
          });

          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error sending email:', error.message);

          // Закрыть индикатор ожидания и показать сообщение об ошибке
          loadingAlert.close();

          Swal.fire({
            icon: 'error',
            title: 'Ошибка отправки',
            text: 'Произошла ошибка при отправке данных.',
          });
        }
      );
    }
  }
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Azerbaijan]; // Список стран для предпочтения
}
