import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { StudentComponent } from './student.component';
import { QuestionsService } from '../questions.service';



@NgModule({
  declarations: [
    StudentComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    QuestionsService
  ]
})
export class StudentModule { }
