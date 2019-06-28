import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FileImportComponent } from "./file-import/file-import.component";
import { MapComponent } from "./map/map.component";
import { AppComponent } from "./app.component";

const routes: Routes = [
  { path: "", component: FileImportComponent },
  { path: "map", component: MapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
