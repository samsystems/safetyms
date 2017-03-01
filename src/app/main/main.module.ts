import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DropdownModule,
  ButtonsModule
} from 'ng2-bootstrap';
import {FormsModule} from '@angular/forms';

import {MainRoutesModule} from './main.routes';
import {MainComponent} from './components/main/main.component';
import {InboxComponent} from './components/inbox/inbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainRoutesModule,
    DropdownModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  declarations: [
    MainComponent,
    InboxComponent
  ]
})
export class MainModule {
}
