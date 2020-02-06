import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {HtmlVideoComponent} from './html-video/html-video.component'
import {TensorFLowJsComponent} from './tensor-flow-js/tensor-flow-js.component'
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
      { path: 'video', component: HtmlVideoComponent },
      { path: 'tensorflow', component: TensorFLowJsComponent}
    ])
  ],
  declarations: [HomePage,HtmlVideoComponent,TensorFLowJsComponent],
  providers: []
})
export class HomePageModule {}
