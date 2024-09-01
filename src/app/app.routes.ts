import { Routes } from '@angular/router';
import { UserLayoutComponent } from './pages/users/user-layout/user-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/users/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/users/about/about.component').then(
            (m) => m.AboutComponent
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/users/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
      },
      {
        path: 'credentials',
        loadComponent: () =>
          import('./pages/users/credentials/credentials.component').then(
            (m) => m.CredentialsComponent
          ),
      },
      {
        path: 'works',
        loadComponent: () =>
          import('./pages/users/works/works.component').then(
            (m) => m.WorksComponent
          ),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./pages/users/services/services.component').then(
            (m) => m.ServicesComponent
          ),
      },
      {
        path: 'blogs',
        loadComponent: () =>
          import('./pages/users/blogs/blogs.component').then(
            (m) => m.BlogsComponent
          ),
      },
      // {
      //   path:'blogs/:blogId',
      //   loadComponent:()=>import('./pages/users/blogs/blogs.component').then(m=>m.BlogsComponent)
      // }
    ],
  },
];
