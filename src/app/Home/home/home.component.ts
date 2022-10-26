import { Component, OnInit } from '@angular/core';

interface sideNavToggle{
  screenWidth:number;
  collapsed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidth=0;
  constructor() { }
  
  ngOnInit(): void {

  }
  
  onToggleSideNav(data: sideNavToggle){
    this.screenWidth=data.screenWidth;
    this.isSideNavCollapsed=data.collapsed;
  }
}
