import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  clickOptions(id) {
    let option = document.getElementsByClassName('option'+id)[0];
    if (id == 3) {
      option.classList.add('correct_answer');
      document.getElementsByClassName('next-question')[0].removeAttribute('hidden');
    } else {
      option.classList.add('wrong_answer');
    }
  }
}
