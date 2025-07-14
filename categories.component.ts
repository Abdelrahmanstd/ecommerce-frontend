import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../core/services/category/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  form!: FormGroup;
  formMode: 'add' | 'edit' = 'add';
  selectedCategory: any = null;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  getCategories() {
    this.categoryService.getAll().subscribe({
      next: res => this.categories = res,
      error: err => console.error(err)
    });
  }

  openAddForm() {
    this.formMode = 'add';
    this.selectedCategory = null;
    this.form.reset();
  }

  openEditForm(category: any) {
    this.formMode = 'edit';
    this.selectedCategory = category;
    this.form.patchValue({ name: category.name });
  }

  submitForm() {
    if (this.form.invalid) return;

    if (this.formMode === 'add') {
      this.categoryService.create(this.form.value).subscribe(() => this.getCategories());
    } else if (this.selectedCategory) {
      this.categoryService.update(this.selectedCategory._id, this.form.value).subscribe(() => this.getCategories());
    }

    this.form.reset();
    this.formMode = 'add';
  }

  deleteCategory(id: string) {
    if (confirm('هل أنت متأكد من حذف التصنيف؟')) {
      this.categoryService.delete(id).subscribe(() => this.getCategories());
    }
  }
}
