import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HasRoleGuard } from '../auth/has-role.guard';
import { InboxComponent } from './dashboard-box/inbox/inbox.component';
import { DashboardBoxComponent } from './dashboard-box/dashboard-box.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserProfileComponent } from './dashboard-box/user-profile/user-profile.component';
import { EditUserComponent } from './dashboard-box/edit-user/edit-user.component';
import { SendMessageComponent } from './dashboard-box/send-message/send-message.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TrashComponent } from './dashboard-box/trash/trash.component';
import { ViewLogsComponent } from './dashboard-box/view-logs/view-logs.component';
export const routes: Routes = [
    {
        path:'', redirectTo:'message/inbox', pathMatch: 'full'
    },
    {
        path:'message/:type', component: InboxComponent
    },
    {
        path:'profile', component: UserProfileComponent
    },
    { 
        path: 'edit-user/:id', component: EditUserComponent 
    },
    { 
        path: 'add-user/:id', component: EditUserComponent 
    },
    {
        path:'trash', component: TrashComponent
    },
    {
        path:'view-logs', component: ViewLogsComponent, canActivate: [HasRoleGuard]
    },  
    {
        path:':type', component: SendMessageComponent
    }
  ];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DashboardRoutingModule {}