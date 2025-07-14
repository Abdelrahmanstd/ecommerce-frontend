import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  formMode: 'add' | 'edit' = 'add';
  selectedProduct: any = null;
  productForm!: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getProducts();
  }

  buildForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      image: [null]
    });
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    const fixedPath = imagePath.replace(/\\/g, '/');
    return `http://localhost:4000/${fixedPath}`;
  }

  getProducts() {
    this.productService.getAll().subscribe({
      next: res => this.products = res,
      error: err => console.error(err)
    });
  }

  deleteProduct(id: string) {
    if (confirm("هل أنت متأكد أنك تريد حذف المنتج؟")) {
      this.productService.delete(id).subscribe(() => this.getProducts());
    }
  }

  openAddForm() {
    this.formMode = 'add';
    this.selectedProduct = null;
    this.productForm.reset();
    this.selectedImage = null;
  }

  openEditForm(product: any) {
    this.formMode = 'edit';
    this.selectedProduct = product;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      brand: product.brand?._id,
      category: product.category?._id,
      subCategory: product.subCategory?._id
    });
    this.selectedImage = null;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  submitForm() {
    if (this.productForm.invalid) return;

    const form = new FormData();
    const values = this.productForm.value;

    form.append('name', values.name);
    form.append('description', values.description);
    form.append('price', values.price.toString());
    form.append('brand', values.brand);
    form.append('category', values.category);
    form.append('subCategory', values.subCategory);
    if (this.selectedImage) {
      form.append('image', this.selectedImage);
    }

    if (this.formMode === 'add') {
      this.productService.create(form).subscribe(() => this.getProducts());
    } else if (this.selectedProduct) {
      this.productService.update(this.selectedProduct._id, form).subscribe(() => this.getProducts());
    }
  }
}
