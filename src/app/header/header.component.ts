import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
          
          icon:'pi pi-fw pi-file',
          items:[
              {
                  label:'Add Employee',
                  icon:'pi-users',
                  
                 
                },
                {
                  label:'Department',
                  icon:'',
               
                 },
                {
                  label:'Asset Type',
                  icon:'',
                  routerLink:'AssetType'
                 
                },
                {
                  label:'CPU type',
                  icon:'',
                  
                },
                {
                  label:'Ram Type',
                  icon:'',
               
                 },
                 {
                  label:'Hard Disk Type',
                  icon:'',
               
                 },
                {
                  label:'LogOut',
                  icon:'',
                 
                }]
                
            }];
       
    }
  }