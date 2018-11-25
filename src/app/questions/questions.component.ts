import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

// Custom
import { AppComponent } from '../app.component';
import { answer } from '../answer-interface';


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
  answerP: answer;
  answer: string;

  public questions = this.appComponent.questionsService.getQuestions();

  constructor(
    location: Location,
    router: Router,
    public appComponent: AppComponent
  ) {
    this.answerP = {
      name: '',
      answer: '',
      grade: -1
    }
    this.name = this.appComponent.questionsService.name;
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
      if (this.questions[0] != 0) {
        return true;
      }
    } else {
      return false;
    }
  }

  // Student functions
  answeredQuestion(question) {
    var answers = question.answers;
    for (var i = 0; i < answers.length; i++) {
      if (answers[i]["name"] == this.name) {
        return true;
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
    this.answerP.answer = this.answer;
    this.appComponent.questionsService.addAnswer(
      question, this.answerP
    )
  }

  // Teacher functions

  clickedAddQuestion() {
    this.addQuestion = !this.addQuestion;
  }

  ngOnInit() {
  }

}
