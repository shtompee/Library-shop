import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss'],
})
export class AddNewProductComponent {
  productDetail: any;
  profileForm: any = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s]+$/),
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
    image: new FormControl(''),
  });

  selectedImage: File;
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
    private router: Router
  ) {}

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.profileForm.get('image')?.setValue(this.selectedImage);
  }

  onSubmit() {
    if (this.profileForm.valid && this.selectedImage) {
      const formData = new FormData();
      formData.append('name', this.profileForm.value.name);
      formData.append('prod_year', this.profileForm.value.prod_year);
      formData.append('price', this.profileForm.value.price);
      formData.append('paint_size', this.profileForm.value.paint_size);
      formData.append('techlogy', this.profileForm.value.techlogy);
      formData.append('image', this.selectedImage);

      this.productService.uploadProduct(formData).subscribe(
        (response) => {
          Swal.fire('Товар успешно добавлен');
          this.router.navigate(['/']);
          this.profileForm.reset();
        },
        (error) => {
          console.error(
            'Произошла ошибка при добавлении товара:',
            error.message
          );
        }
      );
    } else {
      console.error('Форма невалидна или изображение не выбрано.');
    }
  }
}
