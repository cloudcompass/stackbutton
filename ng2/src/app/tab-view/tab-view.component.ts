import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.css']
})
export class TabViewComponent implements OnInit {
  @ViewChild('pfTabs') pfTabs: ElementRef;

  onTabChanged (event: Event) {
    alert('oh cool! the active tab is now: ' + (<any>event).detail);
  }

  constructor() { }

  ngOnInit() {
    document.body.style.backgroundColor = '#fff';
  }
}
// .angular-cli.json needs more stuff. Specifically the patternfly webcomponents I can't get this to work without "explosions."
/*
* {
 "project": {
 "version": "1.0.0-beta.21",
 "name": "angular2-cli-webcomponents"
 },
 "apps": [
 {
 "root": "src",
 "outDir": "dist",
 "assets": [
 "assets",
 "favicon.ico"
 ],
 "index": "index.html",
 "main": "main.ts",
 "test": "test.ts",
 "tsconfig": "tsconfig.json",
 "prefix": "app",
 "mobile": false,
 "styles": [
 "styles.css",
 "../node_modules/patternfly-webcomponents/dist/css/patternfly-webcomponents.css"
 ],
 "scripts": [
 "../node_modules/patternfly-webcomponents/dist/js/patternfly.js"
 ],
 "environmentSource": "environments/environment.ts",
 "environments": {
 "dev": "environments/environment.ts",
 "prod": "environments/environment.prod.ts"
 }

 }
 ],
 "e2e": {
 "protractor": {
 "config": "./protractor.conf.js"
 }
 },
 "test": {
 "karma": {
 "config": "./karma.conf.js"
 }
 },
 "defaults": {
 "styleExt": "css",
 "prefixInterfaces": false,
 "inline": {
 "style": false,
 "template": false
 },
 "spec": {
 "class": false,
 "component": true,
 "directive": true,
 "module": false,
 "pipe": true,
 "service": true
 }
 }
 }

 *
*
*
* */
