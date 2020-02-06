import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {ActualTensorFlowComponent} from "./actual-tensor-flow/actual-tensor-flow.component"
import {DrawableDirective} from "./drawable.directive"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path: 'actual',
        component: ActualTensorFlowComponent
      }
    ])
  ],
  declarations: [HomePage,ActualTensorFlowComponent,DrawableDirective]
})
export class HomePageModule {}
