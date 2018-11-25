import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TeacherComponent } from './teacher.component';
import { QuestionsService } from '../questions.service';




@NgModule({
  declarations: [
    TeacherComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    QuestionsService
  ]
})
export class TeacherModule { }
