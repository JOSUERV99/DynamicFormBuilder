import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalsRoutingModule } from './approvals-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApprovalCreateComponent } from './create/approvalcreate.component';

@NgModule({
  declarations: [
    ApprovalCreateComponent
  ],
  imports: [
    CommonModule,
    ApprovalsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ApprovalsModule { }
