import { Injectable } from '@angular/core';

// Custom
import { question } from './question-interface';
import { answer } from './answer-interface';
import { student } from './student-interface';
import { student_answer } from './student-answer-interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  local: any = localStorage;

  public questions: any[] = [0];
  
  public name: string;
  public question: question;
  public answer: answer;
  public student: student = {
    name: '', answers: []
  };
  studentAnswer: student_answer = { answer: '', question: '', grade: -1 };
  public allStudents: student[] = [this.student];

  getQuestions() {
    this.questions = JSON.parse(this.local.getItem('questions'));
    return this.questions;
  }

  addQuestion(question) {
    this.question = question;
    this.question.answers = [];
    this.questions = JSON.parse(this.local.getItem('questions'));
    if(this.questions && this.questions[0] == 0) {
    this.questions.pop();
    }
    this.questions.push( this.question );
    this.updateLocal(this.questions, false);
  }

  updateLocal(questionsArr, student) {
    this.local.setItem('questions', JSON.stringify(questionsArr))
    if(student) {
      this.local.setItem(student.name, JSON.stringify(student) );
    }
    console.log( this.local.getItem('students') )
  }

  isExistingStudent(name) {
    for(var i = 0; i < this.allStudents.length; i++) {
      if( this.allStudents[i].name == name ) {
        return i;
      }
    }
    return false;
  }

  addAnswer(question, answer) {
    console.log(this.allStudents)
    this.questions = JSON.parse(this.local.getItem('questions'));
    for(var i = 0; i < this.questions.length; i++) {
      if(this.questions[i].question == question) {
        for(var j = 0; i < this.questions[i].answers.length; j++) {
          if(this.questions[i].answers[j].name == this.name) {
            return 'Student already answered';
          }
        }
        if(this.questions[i].answers[0] == 0) {
        this.questions[i].answers.pop();
        } // Old
        this.answer = answer;
        this.answer.name = this.name;
        this.student.name = this.name;
        this.questions[i].answers.push( this.answer );
      } 
    }// New 
    var studentIndex = this.isExistingStudent(this.name);
    this.student.name = this.name;
    this.studentAnswer.question = question;
    this.studentAnswer.answer = answer.answer;
    this.student.answers.push( this.studentAnswer );
    if( studentIndex === false ) {
      this.allStudents.push( this.student )
    } else {
      this.allStudents[ studentIndex ].answers.push( this.studentAnswer );
    }
    
    this.updateLocal(this.questions, this.student);
  }

  constructor() {
    if(!this.local.getItem('students')) {
    this.local.setItem('students', JSON.stringify(this.allStudents) );
    this.local.setItem('questions', JSON.stringify(this.questions) )
    } else {
      this.allStudents = JSON.parse(this.local.getItem('students'));
      this.questions = JSON.parse(this.local.getItem('questions'))
    }

    
    

  }


}
