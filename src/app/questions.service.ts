import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { database } from 'firebase';
import { Router } from '@angular/router';

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

	public question = '';
	public answer = '';
	public student: student = {
		name: '1', email: '1', password: '1', answers: { student: true }
	};

	public studentObs;
	public students;


	public loggedIn;

	deleteQuestion(question) {
		let ques = { question: null };
		this.renameProperty(ques, 'question', question);
		let ref = database().ref('/questions');
		ref.update(ques);
	}

	addQuestion(question) {
		question = question[question.length - 1] == '?' ? question : question + '?';
		let ques = { question: question };
		this.renameProperty(ques, 'question', question);
		let ref = database().ref('/questions');
		ref.update(ques);
	}

	isExistingStudent(email) {
		for (let i = 0; i < this.students.length; i++) {
			if (this.students[i] == email) {
				return i;
			}
		}
		return false;
	}


	addStudent(name, email, pass) {
		this.student.name = name;
		this.student.email = email;
		this.student.password = pass;
		let student = { email: this.student };
		this.renameProperty(student, 'email', email);
		let ref = database().ref('students/');
		ref.update(student)

	}



	addAnswer(email, question, answer) {
		let stu = database().ref('students/' + email + '/answers/');
		let answerObj = { question: { answer: answer, score: 0 } }
		this.renameProperty(answerObj, 'question', question);
		stu.update(answerObj)
		console.log(stu)
	}


	scoreStudent(email, question, score) {
		let stu = database().ref('students/' + email + '/answers/' + question + '/');
		stu.update({ score: score })
		console.log(stu)
		return stu;
	}

	login(email, pass) {
		let keys = Object.keys(this.students);
		let student = null;
		keys.forEach(k => {
			if (k == email) {
				console.log('email exists')
				if (this.students[k].password == pass) {
					console.log('Correct pass')
					this.loggedIn = true;
					this.student = this.students[k];
					this.local.setItem('user', JSON.stringify(this.student));
					console.log(this.student);
					student = this.student;
				}
			}
		});
		return student;
	}

	isLoggedIn() {
		this.loggedIn = !!this.local.getItem('user');
		return this.loggedIn;
	}

	logOut() {
		this.loggedIn = false;
		this.local.removeItem('user');
	}


	constructor(
		public db: AngularFireDatabase,
		private router: Router
	) {
		console.log('question service started')
		if (!!this.local.getItem('user')) {
			this.student = JSON.parse(this.local.getItem('user'))
		}

		this.getData()


	}

	renameProperty(obj, oldName, newName) {
		if (oldName == newName) {
			return obj;
		}
		if (obj.hasOwnProperty(oldName)) {
			obj[newName] = obj[oldName];
			delete obj[oldName];
		}
		return obj;
	}

	

	getData() {
		let that = this;
		database().ref('students/').on('value', snapshot => {
			that.students = snapshot.val(); console.log(snapshot)
		});
		database().ref('questions/').on('value', snapshot => {
			that.questions = Object.values(snapshot.val());
		});
	}

	getQuestions() {
		return new Promise((resolve, reject)=>{
			database().ref('questions/').on('value', snapshot => {
				resolve( Object.values(snapshot.val()) );
			});
		});
	}

	getStudents() {
		return new Promise((resolve, reject)=>{
			database().ref('students/').on('value', snapshot => {
				resolve( Object.values(snapshot.val()) );
			});
		});
	}


	ngOnInit() {

	}

}
