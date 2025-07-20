import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/layout/components/admin-layout/admin-layout.component';
import { authGuard } from './core/guards/Auth/auth.guard';
import { notRetainAuthGuard } from './core/guards/NoteRetainAuth/not-retain-auth.guard';
import { roleGuard } from './core/guards/role.guard';


export const routes: Routes = [
  // Routes pour les utilisateurs non authentifiés
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate : [notRetainAuthGuard],
    loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule)
  },
  


  {
    path: '',
    component: AdminLayoutComponent, // Layout avec sidebar et header
    canActivate: [authGuard],
    // data: { expectedRoles: ['ADMIN'] 
    // },
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./feature/admin/admin.module').then(m => m.AdminModule)
      },

    ]
  },

    {
    path: '',
    component: AdminLayoutComponent, 
    canActivate: [authGuard],
    // data: { expectedRoles: ['ADMIN'] 
    // },
    children: [
      {
        path: 'user',
        loadChildren: () => import('./feature/user/user.module').then(m => m.UserModule)
      },

    ]
  },



  // Redirection page non trouvée
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
