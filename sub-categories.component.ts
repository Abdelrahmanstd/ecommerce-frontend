import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SubCategoryService } from '../../../core/services/sub-category/sub-category.service';
import { CategoryService } from '../../../core/services/category/category.service';

@Component({
  selector: 'app-sub-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.css'
})
export class SubCategoriesComponent implements OnInit {
  subCategories: any[] = [];
  categories: any[] = [];
  form!: FormGroup;
  formMode: 'add' | 'edit' = 'add';
  selectedSubCategory: any = null;

  constructor(
    private fb: FormBuilder,
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    this.getSubCategories();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  getCategories() {
    this.categoryService.getAll().subscribe({
      next: res => this.categories = res,
      error: err => console.error(err)
    });
  }

  getSubCategories() {
    this.subCategoryService.getAll().subscribe({
      next: res => this.subCategories = res,
      error: err => console.error(err)
    });
  }

  openAddForm() {
    this.formMode = 'add';
    this.selectedSubCategory = null;
    this.form.reset();
  }

  openEditForm(sub: any) {
    this.formMode = 'edit';
    this.selectedSubCategory = sub;
    this.form.patchValue({
      name: sub.name,
      category: sub.category?._id
    });
  }

  submitForm() {
    if (this.form.invalid) return;

    if (this.formMode === 'add') {
      this.subCategoryService.create(this.form.value).subscribe(() => this.getSubCategories());
    } else if (this.selectedSubCategory) {
      this.subCategoryService.update(this.selectedSubCategory._id, this.form.value).subscribe(() => this.getSubCategories());
    }

    this.form.reset();
    this.formMode = 'add';
  }

  deleteSubCategory(id: string) {
    if (confirm("هل أنت متأكد أنك تريد حذف التصنيف الفرعي؟")) {
      this.subCategoryService.delete(id).subscribe(() => this.getSubCategories());
    }
  }
}
