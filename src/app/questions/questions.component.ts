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
  answeredQuestion(question): boolean {
    let answered = false;
    if(!!this.student){
      var answers = Object.keys(this.student.answers);
      answers.forEach((element, i) => {
        if (i == question) {
          answered = true;
        }
      });
    }
    return answered;
  }

  typeAnswer(event: any) {
    this.answer = event.target.value;
  }

  submitAnswer(question) {
    var email = this.student.email;
    console.log(this.student)
    this.questionsService.addAnswer(email, question, this.answer)
    console.log(this.student['answers'])
  }

  // Teacher functions

  clickedAddQuestion() {
    this.addQuestion = !this.addQuestion;
  }

  deleteQuestion(question) {
    let index = this.questions.indexOf(question);
    this.questions.splice(index, 1)
    this.questionsService.deleteQuestion(question)
  }

  sanitizeQuestion(question) {
    question[question.length - 1] != '?' ? question = question + '?' : question = question;
    question.length >= 30 ? question = question.slice(0, 30) + '...' : question = question;
    return question;
  }

  async ngOnInit() {
    
      this.questions = await this.questionsService.getQuestions().then(qs => qs)
      this.students = await this.questionsService.getStudents().then(st => st)
      

  }

}