import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Welcome to Rocket Movies';
  constructor() {
    document.querySelector('app-nav-menu').setAttribute('style', 'display:none;');
  }

  ngOnInit() {
  }
}
