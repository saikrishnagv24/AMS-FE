import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, HostListener, OnInit,Output } from '@angular/core';
import { navbarData } from './nav-data';

interface sideNavToggle{
  screenWidth:number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<sideNavToggle>=new EventEmitter();
  //@HostListener('window:resize',['$event'])
  collapsed = false;
  screenWidth =0;
  navData = navbarData;
 
  constructor() { }
  // onResize(event: any){
  //   this.screenWidth= window.innerWidth;
  //   if(this.screenWidth<=768){
  //     this.collapsed= false;
  //     this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth : this.screenWidth})
  //   }
  // }
  ngOnInit(): void {
    console.log("navData",this.navData);
    this.screenWidth= window.innerWidth;
  }

  togglecollapse(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth : this.screenWidth})
  }
  closeSidenav(){
    this.collapsed =false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth : this.screenWidth})
  }

}
