import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { importProvidersFrom, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { HasRoleGuard } from './auth/has-role.guard';
import { DashboardBoxComponent } from './dashboard/dashboard-box/dashboard-box.component';
import { SidenavComponent } from './dashboard/sidenav/sidenav.component';
export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: SidenavComponent,
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        //path: 'userProfile', component: UserProfileComponent, canActivate:[ AuthGuard, HasRoleGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];


