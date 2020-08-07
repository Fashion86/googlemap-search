import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  startflag = false;
  constructor(private http: HttpClient, private _formBuilder: FormBuilder) {
  }

  ngOnInit() {

  }
}
