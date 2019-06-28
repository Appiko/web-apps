import { Component, OnInit, Input } from "@angular/core";
import * as mapboxgl from "mapbox-gl";
import { GeoJson, FeatureCollection } from "../map-model";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  @Input()
  markers: Array<GeoJson> = [];

  map;
  downloadLink: string;
  zoomLevel = 16;
  textSize = 22;
  textColor = "#ff0000";
  isOverlapped = false;

  constructor() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicHJhdGhpay1qYWluIiwiYSI6ImNqeDc4NnI2ODA3cXAzcG44OHp1MGpwaTIifQ.pI1oCn7qPcwaAqQ_RezePA";
  }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: this.markers[2].geometry.coordinates,
      zoom: this.zoomLevel,
      preserveDrawingBuffer: true
    });

    this.map.on("load", event => {
      this.map.addSource("list", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });

      this.renderMap();
    });
  }

  downloadPng() {
    var dpi = 768;
    Object.defineProperty(window, "devicePixelRatio", {
      get: function() {
        return dpi / 96;
      }
    });
    var canvas = document.querySelector("canvas");
    this.downloadLink = canvas.toDataURL("image/png");
  }

  fly(coordinates) {
    this.map.flyTo({
      center: coordinates
    });
  }

  renderMap() {
    let source = this.map.getSource("list");

    let data = new FeatureCollection(this.markers);
    source.setData(data);
    // https://api.iconify.design/maki:communications-tower-15.svg?height=15
    this.map.addLayer({
      id: "list",
      source: "list",
      type: "symbol",
      layout: {
        "text-field": "{info}",
        "text-size": this.textSize,
        "icon-allow-overlap": this.isOverlapped,
        "text-allow-overlap": this.isOverlapped,
        "icon-image": "{icon}",
        "text-offset": [1.5, 1.5]
      },
      paint: {
        "text-color": this.textColor,
        "icon-color": "black"
      }
    });
  }
  delete(markerIndex) {
    this.markers.splice(markerIndex, 1);
    this.renderMap();
  }

  updateFields(obj) {
    // console.log(obj);
    switch (obj.field) {
      case "size":
        this.map.setLayoutProperty(
          "list",
          "text-size",
          parseFloat(this.textSize.toString())
        );
        break;
      case "color":
        this.map.setPaintProperty("list", "text-color", this.textColor);
        break;
      case "overlap":
        this.map.setLayoutProperty(
          "list",
          "icon-allow-overlap",
          this.isOverlapped
        );
        this.map.setLayoutProperty(
          "list",
          "text-allow-overlap",
          this.isOverlapped
        );
    }
  }
}
