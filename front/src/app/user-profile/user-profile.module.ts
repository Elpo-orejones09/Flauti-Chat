import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileComponentRoutingModule } from './user-profile-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfileComponentRoutingModule
  ],
  declarations: [UserProfileComponent]
})
export class UserProfileComponentPageModule {}