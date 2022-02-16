import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';

import { AppRouterModule } from './app.routes';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [AppComponent, GameComponent, MenuComponent],
  imports: [BrowserModule, AppRouterModule, RouterModule, FlexModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
