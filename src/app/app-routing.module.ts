import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './logingaurd';

import { QuestionsComponent } from './questions/questions.component';
import { ReviewComponent } from './review/review.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  { path: 'teacher', component: TeacherComponent },
  { path: 'teacher/questions', component: QuestionsComponent },  
  { path: 'teacher/review', component: ReviewComponent },
  { path: 'student', component: StudentComponent },
  { path: 'student/questions', component: QuestionsComponent, canActivate: [LoginGuard] },
  { path: 'student/review', component: ReviewComponent, canActivate: [LoginGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
