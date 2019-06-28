import { Component } from "@angular/core";
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "mapV";
  // ngOnInit(): void {
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.
  //   mapboxgl.accessToken =
  //     "pk.eyJ1IjoicHJhdGhpay1qYWluIiwiYSI6ImNqeDc4NnI2ODA3cXAzcG44OHp1MGpwaTIifQ.pI1oCn7qPcwaAqQ_RezePA";
  //   let map = new mapboxgl.Map({
  //     container: "map",
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [77.6002511, 12.9657432],
  //     zoom: 17
  //   });
  // }
}
