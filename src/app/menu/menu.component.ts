import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketIoService } from '../services/socket-io.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  ID: string = '';

  loaded: boolean = false;

  constructor(
    private socketIoService: SocketIoService,
    private router: Router
  ) {}

  createGame() {
    if (this.ID !== '') {
      this.socketIoService.roomExist(this.ID);
    }
  }

  ngOnInit(): void {
    window.onload = () => {
      this.loaded = true;
    };
    this.socketIoService.connect();
    this.canIConnect();

    document.getElementById('idInput')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.createGame();
      }
    });
  }

  canIConnect() {
    this.socketIoService.canIConnect().subscribe((data) => {
      switch (data) {
        case 1: {
          this.router.navigate(['/game', this.ID]);
          break;
        }
        case 2: {
          alert('tato místnost je plná');
          break;
        }
        case 3: {
          alert('hra už začala');
          break;
        }
        case 4: {
          this.router.navigate(['/game', this.ID]);
          break;
        }
      }
    });
  }
}
