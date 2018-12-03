import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

// Custom
import { AppComponent } from '../app.component';
import { QuestionsService } from '../questions.service';
import { StudentComponent } from '../student/student.component';
import { TeacherComponent } from '../teacher/teacher.component';

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
  public realName: string = this.questionsService.name;

  public ratings: any[] = [];
  public student;
  public answerKeys;




  // All students
  public students;
  public allStudents;
  public questions;

  getKeys(obj) {
    return Object.keys(obj);
  }

  // Shared functions



  // Student functions
  public getStudent(name) {
    // var student = this.questionsService.getStudent(name);
    // return student;
  }





  // Teacher functions


  ratingComponentClick(clickObj: any): void {
    let email = clickObj.email;
    let question = clickObj.question;
    let score = clickObj.rating;
    this.questionsService.scoreStudent(email, question, score);
  }

  getAllStudentKeys() {
    var keys = [];
    if (this.students) {
      var studentKeys = Object.keys(this.students)
      studentKeys.forEach(e => {
        if (this.students[e].answers['human']) {
          delete this.students[e].answers['human'];
        }
        keys.push(this.students[e])
      }); console.log(keys)
      return keys
    }

  }

  ////////////////////

  constructor(
    public location: Location,
    private router: Router,
    public appComponent: AppComponent,
    public questionsService: QuestionsService,
    public studentComponent: StudentComponent,
    public teacherComponent: TeacherComponent
  ) {
    this.student = this.questionsService.student;
    this.students = this.questionsService.students;
    console.log(this.student)
    this.router.events.subscribe(async (val) => {
      if (this.location.path().slice(0, 2) == '/s') {
        this.route = 'student';
        this.isStudent = true;
        this.answerKeys = this.getKeys(this.student.answers);
      } else if (this.location.path().slice(0, 2) == '/t') {
        this.route = 'teacher';
        this.isStudent = false;
        this.answerKeys = await this.getAllStudentKeys();
        console.log(this.answerKeys)
      }
    });


    this.getAllStudentKeys();
  }

  ngOnInit() {



  }




}
