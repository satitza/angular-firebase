import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {FormRoutingModules} from './form-routing.modules';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormRoutingModules
  ]
})
export class FormModule {
}
