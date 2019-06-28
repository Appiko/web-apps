import { Component, OnInit } from "@angular/core";
import * as Papa from "papaparse";
import { Router } from "@angular/router";
import { GeoJson } from "../map-model";

@Component({
  selector: "app-file-import",
  templateUrl: "./file-import.component.html",
  styleUrls: ["./file-import.component.scss"]
})
export class FileImportComponent implements OnInit {
  headers = [];
  parseResult = {};
  markers: GeoJson[] = [];
  latField: number;
  lngField: number;
  infoField: number;
  constructor(private router: Router) {}

  ngOnInit() {}

  public fileUploaded(event) {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      beforeFirstChunk: (r, f) => {
        this.headers = [];
      },
      transformHeader: h => {
        this.headers.push(h);
        return h;
      },
      complete: (r, f) => {
        console.log(r);
        this.parseResult = r;
      }
    });
  }

  buildMap() {
    this.parseResult["data"].forEach((element, index) => {
      if (index == 0) {
        this.markers.push(
          new GeoJson([element[this.lngField], element[this.latField]], {
            info: "Transmitter",
            icon: "communications-tower-15"
          })
        );
      } else {
        this.markers.push(
          new GeoJson([element[this.lngField], element[this.latField]], {
            info: `${
              element[this.infoField]
            }dBm\n${this.distanceInKmBetweenEarthCoordinates(
              this.parseResult["data"][0][this.latField],
              this.parseResult["data"][0][this.lngField],
              element[this.latField],
              element[this.lngField]
            )}Km`,
            icon: "embassy-15"
          })
        );
      }
    });
    console.log(this.markers);
  }

  degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6378.12;

    var dLat = this.degreesToRadians(lat2 - lat1);
    var dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (earthRadiusKm * c).toFixed(2);
  }
}
