import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateJobPageRoutingModule } from './update-job-routing.module';

import { UpdateJobPage } from './update-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateJobPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateJobPage]
})
export class UpdateJobPageModule {}
