import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { QuestionsComponent } from './questions/questions.component';
import { ReviewComponent } from './review/review.component';
import { AddQuestion } from './questions/addquestion.component';
import { QuestionsService } from './questions.service';
import { StudentComponent } from './student/student.component';
import { RatingDirective } from './rating.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';




@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    ReviewComponent,
    AddQuestion,
    RatingDirective,
    RatingComponent,
    
    
  ],
  imports: [
    ReactiveFormsModule,
    
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TeacherModule,
    StudentModule,
  
  ],
  providers: [ QuestionsService, StudentComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
