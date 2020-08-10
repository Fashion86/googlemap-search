import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {} from 'googlemaps';
import {ProductService} from '../../services/product.service';
declare var $: any;
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
  drawingManager: any;
  constructor(private http: HttpClient, private _formBuilder: FormBuilder, private _productService: ProductService) {
  }

  ngOnInit() {
    const mapProperties = {
      center: new google.maps.LatLng(this.lat,  this.lng),
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
    this.getPropertyList();
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          // google.maps.drawing.OverlayType.MARKER,
          // google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.POLYGON,
          // google.maps.drawing.OverlayType.POLYLINE,
          // google.maps.drawing.OverlayType.RECTANGLE
        ]
      },
      polygonOptions: {
        clickable:  false
      }
    });
    this.drawingManager.setMap(this.map);
  }

  getPropertyList(): void {
    this._productService.getPropertyList(null).subscribe(res => {
      if (res['success']) {
        this.datas = res['data'];
        this.datas.forEach(d => {
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(Number(parseFloat(d.latitude).toFixed(10)), Number(parseFloat(d.longitude).toFixed(10))),
            map: this.map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 5
            }
          });

          google.maps.event.addListener(marker, 'click', () => {
            this.map.setZoom(12);
            this.map.setCenter(marker.getPosition());
          });
          const contentString = '<div class="marker-content">' +
            '</div>' +
            '<h7 class="firstHeading"><strong>$' + Math.round(d.listprice / 1000) + 'K</strong></h7>' +
            '</div>';

          const infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          // let pp = document.getElementsByClassName('gm-style-iw-c');
          infowindow.open(this.map, marker);
          google.maps.event.addDomListener(infowindow, 'domready', () => {
            $('.firstHeading').click(() => {
              console.log("Hello World");
            });
          });
          google.maps.event.addListener(infowindow, 'domready', function() {

          });
          // google.maps.event.addListener(marker, 'mouseout', () => {
          //   infowindow.close();
          // });
        });
      }
    });
  }


}

class USGSOverlay extends google.maps.OverlayView {
  private bounds_: google.maps.LatLngBounds;
  private image_: string;
  private div_: HTMLElement | null;

  constructor(bounds: google.maps.LatLngBounds, image: string) {
    super();

    // Initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;
  }

  /**
   * onAdd is called when the map's panes are ready and the overlay has been
   * added to the map.
   */
  onAdd() {
    this.div_ = document.createElement("div");
    this.div_.style.borderStyle = "none";
    this.div_.style.borderWidth = "0px";
    this.div_.style.position = "absolute";

    // Create the img element and attach it to the div.
    const img = document.createElement("div");
    img.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
    img.innerHTML = "City Hall, Sechelt<br>British Columbia<br>Canada";
    this.div_.appendChild(img);

    // Add the element to the "overlayLayer" pane.
    const panes = this.getPanes();
    panes.overlayLayer.appendChild(this.div_);
  }

  draw() {
    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    const overlayProjection = this.getProjection();

    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    const sw = overlayProjection.fromLatLngToDivPixel(
      this.bounds_.getSouthWest()
    );
    const ne = overlayProjection.fromLatLngToDivPixel(
      this.bounds_.getNorthEast()
    );

    // Resize the image's div to fit the indicated dimensions.
    if (this.div_) {
      this.div_.style.left = sw.x + "px";
      this.div_.style.top = ne.y + "px";
      this.div_.style.width = ne.x - sw.x + "px";
      this.div_.style.height = sw.y - ne.y + "px";
    }
  }

  // The onRemove() method will be called automatically from the API if
  // we ever set the overlay's map property to 'null'.
  onRemove() {
    if (this.div_) {
      (this.div_.parentNode as HTMLElement).removeChild(this.div_);
      this.div_ = null;
    }
  }
}
