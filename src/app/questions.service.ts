import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {initializeApp, database} from 'firebase';

// Custom
import { student } from './student-interface';



@Injectable({
  providedIn: 'root'
})
export class QuestionsService implements OnInit {

  local: any = localStorage;

  public questions;
  public questionsObs;
  
  public name: string;
  public email: string;
  public pass: string;
  
  public question= '';
  public answer = '';
  public student: student = {
    name: '1' , email: '1', password: '1', answers: {student: true}
  };
  
  public studentObs;
  public students;
  public allStudentsObs;
  public allStudents;

  

  addQuestion(question) {
    this.db.list('/questions').push(question);
  }

  isExistingStudent(email) {
    for(var i = 0; i < this.students.length; i++) {
      if( this.students[i] == email ) {
        return i;
      }
    }
    return false;
  }


  addStudent(name,email,pass) {
    this.student.name = name;
    this.student.email = email;
    this.student.password = pass;
    var student = { email: this.student };
    this.renameProperty(student, 'email', email);
    var ref = database().ref('students/');
    ref.update(student)
    
  }

  getStudentKey(email) { 
    for(var i = 0; i < this.allStudents.length; i++) {
      if(this.allStudents[i].email == email) {
        return this.allStudents[i].key;
      }
    }
  }

  addAnswer(email, question, answer) { 
    var stu = database().ref('students/'+email+'/answers/');
    var answerObj = { question: {answer: answer, score: 0} }
    this.renameProperty(answerObj, 'question', question);
    stu.update(answerObj)
    console.log(stu)
  }


  scoreStudent(email, question, score) {
    var stu = database().ref('students/'+email+'/answers/'+question+'/');
    stu.update({score: score})
      console.log(stu)
    return stu;
  }

  login(email, pass) {
    var keys = Object.keys(this.students);
    var login = false;
    keys.forEach(k => { 
      if(k == email) { console.log('email exists')
        if(this.students[k].password == pass) { console.log('Correct pass')
          login = true;
          this.student = this.students[k];
        }
      }
    });
    return login;
  }
 
  

  constructor(
    public db: AngularFireDatabase,
    ) { console.log('question service started')
    
  
    this.getData()

    
  }

  renameProperty(obj, oldName, newName) {
    // Do nothing if the names are the same
    if (oldName == newName) {
      return obj;
  }
 // Check for the old property name to avoid a ReferenceError in strict mode.
 if (obj.hasOwnProperty(oldName)) {
     obj[newName] = obj[oldName];
     delete obj[oldName];
 }
 return obj;
  }

  getStudentObjs(){
    var that = this;
    return new Promise((resolve,reject)=>{
     that.studentObs.subscribe(data=>{
       resolve(data);
     });
    })
  }

  getAllStudents(){
    var that = this;
    return new Promise((resolve,reject)=>{
     that.allStudentsObs.subscribe(data=>{
       resolve(data);
     });
    })
  }

  getQuestions(){
    var that = this;
    return new Promise((resolve,reject)=>{
      that.questionsObs.subscribe(data=>{
        resolve(data);
      });
     })
  }

   getData() {
    var that = this;
    database().ref('students/').on('value', snapshot => {
      that.students = snapshot.val(); console.log(snapshot.val())
    });
    database().ref('questions/').on('value', snapshot => {
      that.questions = snapshot.val();
    });
  }

  ngOnInit () {
  
  
  

  }


}
