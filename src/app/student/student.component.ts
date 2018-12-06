import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Custom
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})


export class StudentComponent implements OnInit {

  public email;
  public pass;
  public name;
  public student;

  public show = false;
  public signUp = false;
  public signIn = true;
  public invalid = false;

  students;
  allStudents;

  angForm: FormGroup;

  signUpToggle() {
    this.signUp = !this.signUp;
  }

  constructor(
    public questionsService: QuestionsService,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }



  async login() {
    let email = this.angForm.value.email;
    let pass = this.angForm.value.pass;
    let login = await this.questionsService.login(email, pass);
    console.log(login)
    if (!!login) {
      alert('Success')
      this.show = true;
      this.student = login;
      this.signIn = false;
    } else {
      this.invalid = true;
    }
  }

  createForm() {
    this.angForm = this.fb.group({
      email: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
  }

  logout() {
    this.questionsService.logOut();

    this.signUp = false;
    this.signIn = true;
    console.log( this.signIn )
  }

  ngOnInit() {
    this.students = this.questionsService.students;
    this.student = this.questionsService.student;
    if(this.questionsService.isLoggedIn()) {
      this.signIn = false;
    }
    
    
  }

}
