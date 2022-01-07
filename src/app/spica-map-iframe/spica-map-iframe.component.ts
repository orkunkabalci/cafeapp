import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'spica-map-iframe',
  templateUrl: './spica-map-iframe.component.html',
  styleUrls: ['./spica-map-iframe.component.scss'],
})
export class SpicaMapIframeComponent implements OnInit {
  // data = {
  //   type: 'Point',
  //   coordinates: [28.705468922853473, 41.145467225494535],
  // };
  @Input() data;
  link;
  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.link = this._sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${this.data.coordinates[1]},${this.data.coordinates[0]}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    );
  }
}
