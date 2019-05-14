import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { IfViewportSizeDirective } from './directives/if-viewport-size.directive';
import {IConfig, IfViewportSizeConfig, WindowSizeService} from './services/window-size.service';

const config: IConfig = {
  medium: 600,
  large: 900
};

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    IfViewportSizeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    WindowSizeService,
    { provide: IfViewportSizeConfig, useValue: new IfViewportSizeConfig(config) },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
