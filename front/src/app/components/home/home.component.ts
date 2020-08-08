import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {} from 'googlemaps';
import {ProductService} from '../../services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  datas = ['dddd', 'gggg', 'hhh', 'ppppp', 'dddd', 'gggg', 'hhh', 'ppppp'];
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  constructor(private http: HttpClient, private _formBuilder: FormBuilder, private _productService: ProductService) {
  }

  ngOnInit() {
    this.getPropertyList();
    const mapProperties = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.lat, this.lng),
      map: this.map
    });
    google.maps.event.addListener(marker, 'click', () => {
      this.map.setZoom(9);
      this.map.setCenter(marker.getPosition());
    });

  }

  getPropertyList(): void {
    this._productService.getPropertyList().subscribe(data => {
      console.log('ddddddddd', data);
    });
  }
}
