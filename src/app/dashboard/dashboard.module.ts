import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardBoxComponent } from './dashboard-box/dashboard-box.component';
import { InboxComponent } from './dashboard-box/inbox/inbox.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './dashboard-routing.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserProfileComponent } from './dashboard-box/user-profile/user-profile.component';
import { EditUserComponent } from './dashboard-box/edit-user/edit-user.component';
import { SendMessageComponent } from './dashboard-box/send-message/send-message.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar';
import { TrashComponent } from './dashboard-box/trash/trash.component'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ViewLogsComponent } from './dashboard-box/view-logs/view-logs.component';
import { PopUpComponent } from './dashboard-box/pop-up/pop-up.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    DashboardBoxComponent,
    InboxComponent,
    UserProfileComponent,
    EditUserComponent,
    SendMessageComponent,
    SidenavComponent,
    TrashComponent,
    ViewLogsComponent,
    PopUpComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DashboardRoutingModule,
    Ng2SearchPipeModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  bootstrap: [SidenavComponent],
})
export class DashboardModule { }
