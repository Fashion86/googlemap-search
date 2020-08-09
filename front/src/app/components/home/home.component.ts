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
  lat = 47.9240641967;
  lng = -118.2736372948;
  datas: any[] = [];
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

  }

  getPropertyList(): void {
    this._productService.getPropertyList(null).subscribe(res => {
      if (res['success']) {
        this.datas = res['data'];
        this.datas.forEach(d => {
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(Number(parseFloat(d.latitude).toFixed(10)), Number(parseFloat(d.longitude).toFixed(10))),
            map: this.map
          });
          google.maps.event.addListener(marker, 'click', () => {
            this.map.setZoom(12);
            this.map.setCenter(marker.getPosition());
          });
          const contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
            '</div>' +
            '</div>';

          const infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          google.maps.event.addListener(marker, 'mouseover', () => {
            infowindow.open(this.map, marker);
          });
          google.maps.event.addListener(marker, 'mouseout', () => {
            infowindow.close();
          });
        });
      }
    });
  }
}
