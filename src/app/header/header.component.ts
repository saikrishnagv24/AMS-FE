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
                  routerLink:'Employee'
                 },
                {
                  label:'Department',
                  icon:'',
                  routerLink:'Department'
                 },
                 {
                  label:'Location',
                  icon:'',
                  routerLink:'Location'
                 },
                {
                  label:'Asset Type',
                  icon:'',
                  routerLink:'AssetType'
                 
                },
                {
                  label:'CPU type',
                  icon:'',
                  routerLink:'CpuType'
                  
                },
                {
                  label:'Ram Type',
                  icon:'',
                  routerLink:'RamType'
               
                 },
                 {
                  label:'Hard Disk Type',
                  icon:'',
                  routerLink:'HarddiscType'
                  
                 },
                {
                  label:'LogOut',
                  icon:'',
                 
                }]
                
            }];
       
    }
  }