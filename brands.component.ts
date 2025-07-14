import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../../../core/services/brand/brand.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  brands: any[] = [];
  form!: FormGroup;
  formMode: 'add' | 'edit' = 'add';
  selectedBrand: any = null;

  constructor(private fb: FormBuilder, private brandService: BrandService) {}

  ngOnInit(): void {
    this.initForm();
    this.getBrands();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null]
    });
  }

  getBrands() {
    this.brandService.getAll().subscribe({
      next: res => this.brands = res,
      error: err => console.error(err)
    });
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    const fixedPath = imagePath.replace(/\\/g, '/');
    return `http://localhost:4000/${fixedPath}`;
  }

  openAddForm() {
    this.formMode = 'add';
    this.selectedBrand = null;
    this.form.reset();
  }

  openEditForm(brand: any) {
    this.formMode = 'edit';
    this.selectedBrand = brand;
    this.form.patchValue({
      name: brand.name,
      description: brand.description
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.get('image')?.setValue(file);
    }
  }

  submitForm() {
    if (this.form.invalid) return;

    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('description', this.form.value.description);
    if (this.form.value.image) {
      formData.append('image', this.form.value.image);
    }

    if (this.formMode === 'add') {
      this.brandService.create(formData).subscribe(() => this.getBrands());
    } else if (this.selectedBrand) {
      this.brandService.update(this.selectedBrand._id, formData).subscribe(() => this.getBrands());
    }

    this.form.reset();
    this.formMode = 'add';
  }

  deleteBrand(id: string) {
    if (confirm("هل أنت متأكد أنك تريد حذف البراند؟")) {
      this.brandService.delete(id).subscribe(() => this.getBrands());
    }
  }
}
