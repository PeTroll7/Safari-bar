import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { delay, of } from 'rxjs';
import { RulesComponent } from '../rules/rules.component';
import { SocketIoService } from '../services/socket-io.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('fadeout', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('280ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class MenuComponent implements OnInit, AfterViewInit {
  ID: string = '';

  loaded: boolean = false;

  constructor(
    private socketIoService: SocketIoService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  createGame() {
    if (this.ID !== '') {
      this.socketIoService.roomExist(this.ID);
    }
  }

  openRulesDialog() {
    const dialogRef = this.dialog.open(RulesComponent, {
      height: '80%',
      autoFocus: false,
    });
  }

  ngOnInit(): void {
    this.socketIoService.connect();
    this.canIConnect();

    document.getElementById('idInput')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.createGame();
      }
    });

    /*
     isMobile: [] | null = null;¨
     
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];
    toMatch.some((x) => {
      if (navigator.userAgent.match(x)) {
        console.log(navigator.userAgent.match(x));
      }
    });

    

    document.addEventListener('dblclick', () =>
      document.documentElement.requestFullscreen().catch(console.log)
    );
    window.addEventListener('orientationchange', () => {
      if (window.orientation == 90) {
        var event = new MouseEvent('dblclick', {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        document.dispatchEvent(event);
      }
      console.log(window.orientation);
    });*/
  }

  ngAfterViewInit(): void {
    of(null)
      .pipe(delay(2000))
      .subscribe(() => {
        this.loaded = true;
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
