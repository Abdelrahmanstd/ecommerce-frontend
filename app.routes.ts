import { Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
export const routes: Routes = [
    {
  path: 'admin',
  canActivate: [AdminGuard],
  loadComponent: () => import('./admin/layout/layout.component').then(m => m.LayoutComponent),
  children: [
    {
      path: 'dashboard',
      loadComponent: () => import('./admin/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
      path: 'products',
      loadComponent: () => import('./admin/pages/products/products.component').then(m => m.ProductsComponent)
    },
    {
      path: 'orders',
      loadComponent: () => import('./admin/pages/orders/orders.component').then(m => m.OrdersComponent)
    },
    {
      path: 'brands',
      loadComponent: () => import('./admin/pages/brands/brands.component').then(m => m.BrandsComponent)
    },
    {
      path: 'categories',
      loadComponent: () => import('./admin/pages/categories/categories.component').then(m => m.CategoriesComponent)
    },
    {
      path: 'subCategories',
      loadComponent: () => import('./admin/pages/sub-categories/sub-categories.component').then(m => m.SubCategoriesComponent)
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    }
  ]
},
{
  path:'auth',
  children:[
   {
     path:'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
   },
   {
    path:"register",
    loadComponent:()=>import('./auth/signup/signup.component').then(m=>m.SignupComponent)
   }
  ]
},

{
  path:'user',
  children:[
    {
      path:'',
      loadComponent: () => import('./user/home/home.component').then(m => m.HomeComponent)
    },
    {
      path:'cart',
      loadComponent: () => import('./user/cart/cart.component').then(m => m.CartComponent)
    },
    {
      path:'home',
      loadComponent: () => import('./user/home/home.component').then(m => m.HomeComponent)
    },
    {
      path:'myOrders',
      loadComponent: () => import('./user/my-orders/my-orders.component').then(m => m.MyOrdersComponent)
    },
    {
      path:'products',
      loadComponent: () => import('./user/product-list/product-list.component').then(m => m.ProductListComponent)
    },
    {
      path:'products/:id',
      loadComponent: () => import('./user/product-detais/product-detais.component').then(m => m.ProductDetaisComponent)
    }
    
  ]
}

     
];
