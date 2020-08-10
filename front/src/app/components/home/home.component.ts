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
  drawpol = true;
  markers: any[] = [];
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
    // this.drawingManager = new google.maps.drawing.DrawingManager({
    //   drawingMode: google.maps.drawing.OverlayType.POLYGON,
    //   drawingControl: true,
    //   drawingControlOptions: {
    //     position: google.maps.ControlPosition.TOP_CENTER,
    //     drawingModes: [
    //       // google.maps.drawing.OverlayType.MARKER,
    //       // google.maps.drawing.OverlayType.CIRCLE,
    //       // google.maps.drawing.OverlayType.POLYGON,
    //       // google.maps.drawing.OverlayType.POLYLINE,
    //       // google.maps.drawing.OverlayType.RECTANGLE
    //     ]
    //   },
    //   polygonOptions: {
    //     clickable:  false,
    //     draggable: true
    //   }
    // });
    // this.drawingManager.setMap(this.map);

    const centerControlDiv = document.createElement("div");
    this.CenterControl(centerControlDiv, this.map);

    // @ts-ignore TODO(jpoehnelt)
    centerControlDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);

    let poly = new google.maps.Polyline({
      map: this.map,
      clickable: true
    });
    const move = google.maps.event.addListener(this.map, 'click', (e) => {
      poly.getPath().push(e.latLng);
    });

    google.maps.event.addListenerOnce(this.map, 'mouseup', (e) => {
      google.maps.event.removeListener(move);
      if (this.drawpol) {
        const path = poly.getPath();
        poly.setMap(null);

        poly = new google.maps.Polygon({
          map: this.map,
          paths: path
        });
      }
    });
  }

  getPropertyList(): void {
    this._productService.getPropertyList(null).subscribe(res => {
      if (res['success']) {
        this.datas = res['data'];
        for (let i = 0; i <= this.datas.length; i++) {
          if (this.datas[i]) {
            this.markers[i] = new google.maps.Marker({
              position: new google.maps.LatLng(Number(parseFloat(this.datas[i].latitude).toFixed(10)), Number(parseFloat(this.datas[i].longitude).toFixed(10))),
              map: this.map,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 0
              }
            });

            // google.maps.event.addListener(this.markers[i], 'click', () => {
            //   this.map.setZoom(12);
            //   this.map.setCenter(this.markers[i].getPosition());
            // });
            const contentString = '<div class="marker-content">' +
              '</div>' +
              '<h7 id="firstHeading' + i + '"><strong class="marker-text">$' + Math.round(this.datas[i].listprice / 1000) + 'K</strong></h7>' +
              '</div>';

            const infowindow = new google.maps.InfoWindow({
              content: contentString
            });
            // let pp = document.getElementsByClassName('gm-style-iw-c');
            infowindow.open(this.map, this.markers[i]);
            google.maps.event.addDomListener(infowindow, 'domready', () => {
              const idstring = '#firstHeading' + i;
              $('#firstHeading' + i).click(() => {
                console.log("Hello World" + this.datas[i].id);
              });
            });
          }
        }
      }
    });
  }

  polyAction() {
    if (this.drawpol) {

    } else {

    }
  }
  CenterControl(controlDiv: Element, map: google.maps.Map) {
    // Set CSS for the control border.
    const controlUI = document.createElement("div");
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginTop = "10px";
    controlUI.style.marginRight = "10px";
    controlUI.style.marginBottom = "10px";
    controlUI.style.textAlign = "center";
    controlUI.title = "Click to recenter the map";
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    let controlText = document.createElement("div");
    controlText.style.color = "rgb(25,25,25)";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.fontSize = "16px";
    controlText.style.lineHeight = "38px";
    controlText.style.paddingLeft = "5px";
    controlText.style.paddingRight = "5px";
    controlText.style.width = "35px";
    controlText.style.height = "35px";
    controlText.innerHTML = "<svg viewBox=\"0 0 24 24\" class=\"cy-map-button-polygon-open sc-bdVaJa bssMCl\">" +
      "<path d=\"M20,17.6l2-11c1.1-0.1,2-1,2-2.1c0-1.2-1-2.1-2.2-2.1c-1.1,0-1.9,0.7-2.1,1.7L4.2,5.7C3.8,5,3.1,4.5,2.2,4.5 C1,4.5,0,5.5,0,6.7c0,1.2,1,2.1,2.2,2.1c0.1,0,0.2,0,0.3,0l2.6,5.9c-0.5,0.4-0.8,1-0.8,1.6c0,1.2,1,2.1,2.2,2.1c0.8,0,1.5-0.4,1.9-1 l8.4,2.2c0.1,1.2,1,2.1,2.2,2.1c1.2,0,2.2-1,2.2-2.2C21.2,18.7,20.7,17.9,20,17.6z M3.6,8.3C4,7.9,4.3,7.5,4.3,6.9l15.5-1.7 c0.2,0.5,0.5,0.9,1,1.1l-2,11c-0.7,0.1-1.4,0.5-1.7,1.1l-8.4-2.2c0-1.2-1-2.1-2.2-2.1c-0.1,0-0.2,0-0.3,0L3.6,8.3z\">" +
      "</path></svg>";
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener("click", () => {
      this.drawpol = !this.drawpol;
      if (this.drawpol) {
        controlText.innerHTML = "<svg viewBox=\"0 0 24 24\" class=\"cy-map-button-polygon-open sc-bdVaJa bssMCl\">" +
          "<path d=\"M20,17.6l2-11c1.1-0.1,2-1,2-2.1c0-1.2-1-2.1-2.2-2.1c-1.1,0-1.9,0.7-2.1,1.7L4.2,5.7C3.8,5,3.1,4.5,2.2,4.5 C1,4.5,0,5.5,0,6.7c0,1.2,1,2.1,2.2,2.1c0.1,0,0.2,0,0.3,0l2.6,5.9c-0.5,0.4-0.8,1-0.8,1.6c0,1.2,1,2.1,2.2,2.1c0.8,0,1.5-0.4,1.9-1 l8.4,2.2c0.1,1.2,1,2.1,2.2,2.1c1.2,0,2.2-1,2.2-2.2C21.2,18.7,20.7,17.9,20,17.6z M3.6,8.3C4,7.9,4.3,7.5,4.3,6.9l15.5-1.7 c0.2,0.5,0.5,0.9,1,1.1l-2,11c-0.7,0.1-1.4,0.5-1.7,1.1l-8.4-2.2c0-1.2-1-2.1-2.2-2.1c-0.1,0-0.2,0-0.3,0L3.6,8.3z\">" +
          "</path></svg>";
      } else {
        controlText.innerHTML = "<svg viewBox=\"0 0 24 24\" class=\"cy-map-button-polygon-close sc-bdVaJa bssMCl\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\">" +
          "</path></svg>";
      }
      this.polyAction();
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
