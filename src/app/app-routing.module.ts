import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetTypeComponent } from './Assets/asset-type/asset-type.component';
import { CpuTypeComponent } from './cpu-type/cpu-type.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { FrequencyOfTestingComponent } from './frequency-of-testing/frequency-of-testing.component';
import { HarddiscTypeComponent } from './harddisc-type/harddisc-type.component';
import { AssetsGridComponent } from './Home/assets-grid/assets-grid.component';
import { AssignAssetsComponent } from './Home/assign-assets/assign-assets.component';
import { DashboardComponent } from './Home/dashboard/dashboard.component';
import { HomeComponent } from './Home/home/home.component';
import { LocationComponent } from './location/location.component';
import { LoginComponent } from './login/login.component';
import { RamTypeComponent } from './ram-type/ram-type.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'RegisterForm', component: RegisterFormComponent },
  { path: 'Home', component: HomeComponent,
  children:[{
    path: 'Dashboard',
    component:DashboardComponent
  },
  {
    path: 'AssetGrid',
    component:AssetsGridComponent
  },
  {
    path: 'AssiginAssets',
    component:AssignAssetsComponent
  },
  {
    path: 'AssetType',
    component:AssetTypeComponent
  },
  {
    path: 'CpuType',
    component:CpuTypeComponent
  },
  {
    path: 'RamType',
    component:RamTypeComponent
  },
  {
    path: 'HarddiscType',
    component:HarddiscTypeComponent
  },
  {
    path: 'Employee',
    component:EmployeeComponent
  },
  {
    path: 'Department',
    component:DepartmentComponent
  },
  {
    path: 'Location',
    component:LocationComponent
  },
  {
    path: 'FrequencyOfTesting',
    component:FrequencyOfTestingComponent
  },
 ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
