import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

// Custom
import { AppComponent } from '../app.component';
import { QuestionsService } from '../questions.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  route: string;
  isStudent: boolean;
  addQuestion: boolean = false;

  name: string = '';
  answerP: string = '';
  answer: string;
  students: any[] = [];

  public questions = this.appComponent.questionsService.getQuestions();

  constructor(
    location: Location,
    router: Router,
    public appComponent: AppComponent,
    public questionsService: QuestionsService
  ) {
    this.name = this.questionsService.name;
    router.events.subscribe((val) => {
      if (location.path().slice(0, 2) == '/s') {
        this.route = 'student';
        this.isStudent = true;
      } else if (location.path().slice(0, 2) == '/t') {
        this.route = 'teacher';
        this.isStudent = false;
      }
    });

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
  answeredQuestion(question) {
    var answers;
    for (var i = 0; i < this.students.length; i++) {
      if (this.students[i].name == this.name) {
        for(var j = 0; j < this.students[i].answers; j++) {
          if(this.students[i].answers[j].question == question) {
            return true;
          }
        }
      }
    }
    return false;
  }

  nameEntered() {
    if (this.name != undefined) {
      if (this.name.length < 1) {
        return false;
      } else {
        return true;
      }
    }
  }

  typeAnswer(event: any) {
    this.answer = event.target.value;
  }

  submitAnswer(question) {
    this.appComponent.questionsService.addAnswer(
      question, this.answer
    )
  }

  // Teacher functions

  clickedAddQuestion() {
    this.addQuestion = !this.addQuestion;
  }

  ngOnInit() {
    this.students = this.questionsService.allStudents;
  }

}
