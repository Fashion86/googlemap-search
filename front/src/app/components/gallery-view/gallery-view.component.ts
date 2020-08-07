import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.scss']
})
export class GalleryViewComponent implements OnInit {

  datas = ['dddd', 'gggg', 'hhh', 'ppppp', 'dddd', 'gggg', 'hhh', 'ppppp'];
  constructor() { }

  ngOnInit() {
  }

}
