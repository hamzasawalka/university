import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

// Custom
import { AppComponent } from '../app.component';
import { QuestionsService } from '../questions.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  ///////////////
  rating = 0;

  /////////////////

  currentRate = 0;
  route: string;
  isStudent: boolean;

  public name: string = '';
  public realName: string = '';
  public ratings: any[] = [];

  public questions = this.appComponent.questionsService.getQuestions();

  // This student
  public thisAnsweredQuestions = [];
  public thisUnansweredQuestions = [];
  public i: number = 0;

  // All students
  public answeredQuestions = [];
  public unansweredQuestions = [];


  // Shared functions
  questionExists() {
    if (this.questions[0] == 0) {
      return false;
    } else {
      return true;
    }
  }

  // Student functions
  

  thisStudentAnswered(answersArr) {
    for (var i = 0; i < answersArr.length; i++) {
      if (answersArr[i].name == this.name) {
        return true;
      }
    }
    return false;
  }

  splitQuestions() {
    var answers;
    var question;
    for (var i = 0; i < this.questions.length; i++) {
      answers = this.questions[i].answers;
      question = this.questions[i];
      if (answers[0] == 0 || !this.thisStudentAnswered(answers)) {
        this.thisUnansweredQuestions.push(question);
      } else {
        this.thisAnsweredQuestions.push(question);
      }
    }
  }

  // Teacher functions
  findStudentAnswer(question, name) {
    var q = this.questions.find(((q: any) => q.question === question));
    var a = q.answers.find( ((a: any) => a.name === name)); 
    return { question: q.question, answers: a };
  }

  ratingComponentClick(clickObj: any): void {
    const answer = this.findStudentAnswer(clickObj.question, clickObj.name);
    if (answer != (undefined || null)) { console.log(answer); 
      answer.answers.grade = clickObj.rating;
      this.rating = clickObj.rating;
      this.name = clickObj.name;
    }
    this.questionsService.updateLocal(this.questions, false);
  }

  splitAllQuestions() {
    var answers;
    var question;
    var answer;
    for (var i = 0; i < this.questions.length; i++) {
      answers = this.questions[i].answers;
      question = this.questions[i];
      if (answers[0] == 0) {
        this.unansweredQuestions.push({ question });
      } else {

        this.answeredQuestions.push(question);
      }
      console.log(this.answeredQuestions)
      console.log(this.unansweredQuestions)
    }
  }

  getRating(event) {
    console.log(event)
  }

  ////////////////////

  constructor(location: Location, router: Router,
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

    if (this.questionExists()) {
      this.splitQuestions();
      this.splitAllQuestions();
    }

  }

  ngOnInit() {
    
  }

}
