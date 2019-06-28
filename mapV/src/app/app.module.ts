import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  MdcButtonModule,
  MdcIconModule,
  MdcSelectModule,
  MdcListModule,
  MdcFormField,
  MdcDrawerModule,
  MdcElevationModule,
  MdcCardModule,
  MdcSliderModule,
  MdcTextFieldModule,
  MdcSwitchModule
} from "@angular-mdc/web";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FileImportComponent } from "./file-import/file-import.component";
import { MapComponent } from "./map/map.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent, FileImportComponent, MapComponent],
  imports: [
    MdcButtonModule,
    MdcIconModule,
    MdcListModule,
    MdcSelectModule,
    BrowserModule,
    MdcSliderModule,
    MdcTextFieldModule,
    MdcSwitchModule,
    FormsModule,
    MdcDrawerModule,
    MdcElevationModule,
    MdcCardModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
