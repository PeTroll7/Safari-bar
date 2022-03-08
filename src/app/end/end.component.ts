import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '../game/game.component';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss'],
})
export class EndComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { bar: Card[]; trash: Card[] }
  ) {}

  win: Number = 0;

  ngOnInit(): void {
    console.log(this.data);

    let playerBarCardsArray = [0, 0, 0, 0, 0];
    let playerBar1 = [];
    let playerBar2 = [];
    let playerBar3 = [];
    let playerBar4 = [];

    let playerTrash1 = [];
    let playerTrash2 = [];
    let playerTrash3 = [];
    let playerTrash4 = [];

    this.data.bar.forEach((x) => {
      playerBarCardsArray[x.player]++;
      switch (x.player) {
        case 1: {
          playerBar1.push(x);
          break;
        }
        case 2: {
          playerBar2.push(x);
          break;
        }
        case 3: {
          playerBar3.push(x);
          break;
        }
        case 4: {
          playerBar4.push(x);
          break;
        }
      }
    });
    this.data.trash.forEach((x) => {
      switch (x.player) {
        case 1: {
          playerTrash1.push(x);
          break;
        }
        case 2: {
          playerTrash2.push(x);
          break;
        }
        case 3: {
          playerTrash3.push(x);
          break;
        }
        case 4: {
          playerTrash4.push(x);
          break;
        }
      }
    });

    let array = playerBarCardsArray.map((x) => {
      return x;
    });

    let max = Math.max(...array);

    this.win = playerBarCardsArray.indexOf(max);
  }
}
