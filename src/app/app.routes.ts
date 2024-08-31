import { Routes } from '@angular/router';
import { UserLayoutComponent } from './pages/users/user-layout/user-layout.component';
import { HomeComponent } from './pages/users/home/home.component';



export const routes: Routes = [
    {
     path:'',
     component:UserLayoutComponent,
      children:[
          {
          path:'',
          component:HomeComponent
          // loadComponent:()=>import('./pages/users/home/home.component').then(m=>m.HomeComponent)
          }
      ]
    },

];
