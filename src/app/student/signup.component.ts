import { Component, OnInit } from '@angular/core';

// Custom
import { QuestionsService } from '../questions.service';
import { StudentComponent } from './student.component';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';



@Component({
    selector: 'signup',
    template: `<br>
    <form [formGroup]="angForm" novalidate >
        <label class="center-block">Name:
            <input type="text" formControlName="name" />
            <span *ngIf="angForm.controls['name'].invalid && (angForm.controls['name'].dirty || angForm.controls['name'].touched)" class="alert alert-danger">
                <span *ngIf="angForm.controls['name'].errors.required">
                    Name is required.
                </span>
                <span *ngIf="angForm.controls['name'].errors.minlength">
                    Name is too short.
                </span>
            </span>
        </label>
            <br>
        <label class="center-block">Email:
            <input type="email" formControlName="email" />
            <span *ngIf="angForm.controls['email'].invalid && (angForm.controls['email'].dirty || angForm.controls['email'].touched)" class="alert alert-danger">
                <span *ngIf="angForm.controls['email'].errors.required">
                    Email is required.
                </span>
                <span *ngIf="angForm.controls['email'].errors.email">
                    Invalid email.
                </span>
                <span *ngIf="angForm.controls['email'].errors.userExists">
                    Used email.
                </span>
            </span>
        </label>
            <br>
        <label class="center-block">Password:
            <input type="password" formControlName="pass" />
            <span *ngIf="angForm.controls['pass'].invalid && (angForm.controls['pass'].dirty || angForm.controls['pass'].touched)" class="alert alert-danger">
                <span *ngIf="angForm.controls['pass'].errors.required">
                    Password is required.
                </span>
                <span *ngIf="angForm.controls['pass'].errors.minlength">
                    Password is too short.
                </span>
            </span>
        </label>
            <br>
            <button (click)="signUp()" [disabled]="angForm.pristine || angForm.invalid"
             class="btn btn-success">Submit</button>
    </form>

    <p>Form value: {{ angForm.value | json }}</p>
<p>Form status: {{ angForm.status | json }}</p>
    `,
    styles: [`
    
    `]
})
export class signup implements OnInit {





    angForm: FormGroup;
    exists;

    async signUp() {
        
        
        this.questionsService
        if (this.angForm.invalid) {
            return;
        }
        this.questionsService.addStudent(
            this.angForm.value.name,
            this.angForm.value.email,
            this.angForm.value.pass
        );
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.angForm.value))
        this.studentComponent.signUp = false;
    }

    constructor(
        public questionsService: QuestionsService,
        public studentComponent: StudentComponent,
        private fb: FormBuilder,
    ) {
        this.createForm();
    }

    existingEmail(email){ 
        this.exists = false;
        var that = this;
        var studentKeys = Object.keys( this.questionsService.students );
        
        studentKeys.forEach(element => {
            if(element === email) { that.exists = true;  }
        }); 
        
        
        return this.exists;
    }

    createForm() {
        var that = this;
        function existingUser(control: AbstractControl): { [key: string]: boolean } | null {
            console.log( that.existingEmail(control.value) )
            if (control.value !== undefined && that.existingEmail(control.value) ) {
                return { 'userExists': true };
            }
            return null;
        }

        this.angForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)] ],
            email: ['', [Validators.required, Validators.email, existingUser ] ],
            pass: ['', [Validators.required, Validators.minLength(6)] ],
        });
    }

    ngOnInit() {
        
    }



}