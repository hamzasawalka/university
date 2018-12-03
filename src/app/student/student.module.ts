import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentComponent } from './student.component';
import { signup } from './signup.component';
import { QuestionsService } from '../questions.service';



@NgModule({
  declarations: [
    StudentComponent,
    signup
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    QuestionsService
  ]
})
export class StudentModule { }
