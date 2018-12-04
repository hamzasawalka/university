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
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { test } from './test.component';
import { TeacherComponent } from './teacher/teacher.component';

import { DataTablesModule } from 'angular-datatables';
import { DataTableComponent } from './data-table/data-table.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    ReviewComponent,
    AddQuestion,
    RatingDirective,
    RatingComponent,
    test,
    DataTableComponent
    
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TeacherModule,
    StudentModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
    DataTablesModule,
    
  ],
  providers: [ 
    QuestionsService, 
    StudentComponent, 
    TeacherComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
