import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game/game.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MenuComponent },
  { path: 'game', component: GameComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

export const AppRouterModule = RouterModule.forRoot(routes);
