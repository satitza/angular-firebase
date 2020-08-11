import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {FormRoutingModules} from './form-routing.modules';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormRoutingModules,
    FormsModule
  ]
})
export class FormModule {
}
