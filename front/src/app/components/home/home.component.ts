import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Question} from '../../models/question';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  startflag = false;
  questions: Question[] = [];
  currentQuestion: Question;
  stepIndex = 1;
  passedNum = 0;
  mark = 0;
  complete = false;
  showresult = false;
  constructor(private http: HttpClient, private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.currentQuestion = new Question();
    this.http.get('/assets/questions.json', { headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
      , responseType: 'text' }).subscribe((res) => {
        this.questions = JSON.parse(res)['quiz'];
        this.currentQuestion = this.questions[0];
    });
  }

  onStart() {
    this.startflag = true;
  }

  onNext() {
    if (this.currentQuestion.id * 20 > this.passedNum) {
      this.passedNum = this.currentQuestion.id * 20;
    }
    if (this.currentQuestion.id == 5) {
      return;
    }
    this.currentQuestion = this.questions[this.currentQuestion.id];
    this.stepIndex++;

  }
  onPreview() {
    this.currentQuestion = this.questions[this.currentQuestion.id -2];
    this.stepIndex--;
  }
  onStep(number) {
    this.stepIndex = number; console.log(this.stepIndex)
  }
  onComplete() {
    if (this.currentQuestion.id * 20 > this.passedNum) {
      this.passedNum = this.currentQuestion.id * 20;
    }
    this.questions.forEach(pp => {
      if (pp.user_answer == pp.answer) {
        this.mark++;
      }
    });
    this.complete = true;
  }

  showResult() {
    this.showresult = true;
  }

}
