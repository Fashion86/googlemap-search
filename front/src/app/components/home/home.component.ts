import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ZoomControlOptions, ControlPosition, ZoomControlStyle} from '@agm/core/services/google-maps-types';
import {} from 'googlemaps';
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

  constructor(private http: HttpClient, private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
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
    // let flightPlanCoordinates = [
    //   {lat: 37.772, lng: -122.214},
    //   {lat: 21.291, lng: -157.821},
    //   {lat: -18.142, lng: 178.431},
    //   {lat: -27.467, lng: 153.027}
    // ];
    // var flightPath = new google.maps.Polyline({
    //   path: flightPlanCoordinates,
    //   geodesic: true,
    //   strokeColor: '#FF0000',
    //   strokeOpacity: 1.0,
    //   strokeWeight: 2
    // });
    //
    // flightPath.setMap(map);
  }
}
