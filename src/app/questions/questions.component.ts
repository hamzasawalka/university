import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

// Custom
import { AppComponent } from '../app.component';
import { QuestionsService } from '../questions.service';
import { StudentComponent } from '../student/student.component';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  route: string;
  isStudent: boolean;
  addQuestion: boolean = false;

  answer: string;
  students;
  allStudents;
  student;

  public questions;

  constructor(
    location: Location,
    router: Router,
    public appComponent: AppComponent,
    public questionsService: QuestionsService,
    public studentComponent: StudentComponent
  ) {

    router.events.subscribe((val) => {
      if (location.path().slice(0, 2) == '/s') {
        this.route = 'student';
        this.isStudent = true;
      } else if (location.path().slice(0, 2) == '/t') {
        this.route = 'teacher';
        this.isStudent = false;
      }
    });

    console.log(this.questions)
  }



  

  // Shared
  questionExists() {
    if (this.questions) {
      if (this.questions[0] != '1') {
        return true;
      }
    } else {
      return false;
    }
  }

  // Student functions
  answeredQuestion(question):boolean {
    
    var answers = Object.keys(this.student.answers);
    
    answers.forEach((element, i) => {
      if (i == question) {
        return true;
      }
    });
    return false;
  }

  typeAnswer(event: any) {
    this.answer = event.target.value;
  }

  submitAnswer(question) {
    var email = this.student.email;
    console.log(this.student)
    this.questionsService.addAnswer(email, question, this.answer)
    console.log( this.student['answers'] )
  }

  // Teacher functions

  clickedAddQuestion() {
    this.addQuestion = !this.addQuestion;
  }



 async ngOnInit() {
  this.questions = Object.values(this.questionsService.questions); 
  this.student = this.questionsService.student;
  this.students = this.questionsService.students;
  this.allStudents = this.questionsService.allStudents;
  }

}