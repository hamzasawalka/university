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

  public show = false;
  public signUp = false;
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
    var email = this.angForm.value.email;
    var pass = this.angForm.value.pass;
    var login = await this.questionsService.login(email, pass);

    if (login) {
      alert('Success')
      this.show = true;
    } else {
      alert('Invalid username or password')
    }
  }

  createForm() {
    this.angForm = this.fb.group({
      email: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.students = this.questionsService.students;
    this.allStudents = this.questionsService.allStudents;
  }

}
