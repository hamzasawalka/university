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
    name: '1' , answers: {}
  };
  
  public allStudents: string[] = [];

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
    console.log('students in storage', JSON.parse(this.local.getItem('students')) )
    console.log('students', this.allStudents);
    console.log('questions', this.questions);
  }

  isExistingStudent(name) {
    for(var i = 0; i < this.allStudents.length; i++) {
      if( this.allStudents[i] == name ) {
        return i;
      }
    }
    return false;
  }

  addAnswer(question, answer) { console.log( this.student.answers )
    this.questions = JSON.parse(this.local.getItem('questions'));
    
    for(var i = 0; i < this.questions.length; i++) {
      
    }// New 
    var studentIndex = this.isExistingStudent(this.name);
    if( studentIndex === false ) {
      this.allStudents.push( this.name )
      this.student.name = this.name;
    } else {
      this.student = JSON.parse( this.local.getItem(this.name) )
    }
    this.student.answers[question] = { answer: answer, grade: -1 } ;
    
    this.updateLocal(this.questions, this.student);
  }

  getStudent(name) {
    var student = JSON.parse( this.local.getItem(name) );
    return student;
  }

  getAllAnswers() {
    var student;
    var answers = [];
    for(var i = 0; i < this.allStudents.length; i++) {
      student = this.getStudent( this.allStudents[i] )
      answers.push(student);
    }
    console.log(answers)
    return answers;
  }

  constructor() {
    if(!this.local.getItem('students')) {
    this.local.setItem('students', JSON.stringify(this.allStudents) );
    } else {
      this.allStudents = JSON.parse(this.local.getItem('students'));
    }

    if(!this.local.getItem('questions')) {
      this.local.setItem('questions', JSON.stringify(this.questions) )
      } else {
        this.questions = JSON.parse(this.local.getItem('questions'))
      }
    
    

  }


}
