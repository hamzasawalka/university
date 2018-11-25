import { Injectable } from '@angular/core';

// Custom
import { student } from './student-interface';
import { student_answer } from './student-answer-interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  local: any = localStorage;

  public questions: string[] = ['1'];
  
  public name: string;
  public question= '';

  public answer = '';
  public student: student = {
    name: '', answers: []
  };
  studentAnswer: student_answer = { question: '', answer: '', grade: -1 };
  public allStudents: student[] = [this.student];

  getQuestions() {
    this.questions = JSON.parse(this.local.getItem('questions'));
    return this.questions;
  }

  addQuestion(question) {
    this.question = question;
    this.questions = JSON.parse(this.local.getItem('questions'));
    if(this.questions && this.questions[0] == '1') {
    this.questions.pop();
    }
    this.questions.push( this.question );
    this.updateLocal(this.questions, false);
  }

  updateLocal(questions, student) {
    if(questions) {
      this.local.setItem('questions', JSON.stringify(questions))
    }
    if(student) {
      this.local.setItem(student.name, JSON.stringify(student) );
    }
    this.local.setItem('students', JSON.stringify(this.allStudents) )
    console.log('all students', this.local.getItem('students') )
    console.log('students', this.allStudents);
    console.log('questions', this.questions);
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
    
    this.questions = JSON.parse(this.local.getItem('questions'));
    for(var i = 0; i < this.questions.length; i++) {
      
    }// New 
    var studentIndex = this.isExistingStudent(this.name);
    this.student.name = this.name;
    this.studentAnswer.question = question;
    this.studentAnswer.answer = answer;
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
