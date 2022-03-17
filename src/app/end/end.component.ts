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

  win = 0;
  winArray: number[] = [0];
  playerWin = 0;

  playerBarCardsCount = [0, 0, 0, 0, 0];
  playerBar1: Card[] = [];
  playerBar2: Card[] = [];
  playerBar3: Card[] = [];
  playerBar4: Card[] = [];

  playerArray: Card[][] = [];

  ngOnInit(): void {
    console.log(this.data);

    let playerTrash1 = [];
    let playerTrash2 = [];
    let playerTrash3 = [];
    let playerTrash4 = [];

    this.data.bar.forEach((card) => {
      this.playerBarCardsCount[card.player]++;
      switch (card.player) {
        case 1: {
          this.playerBar1.push(card);
          break;
        }
        case 2: {
          this.playerBar2.push(card);
          break;
        }
        case 3: {
          this.playerBar3.push(card);
          break;
        }
        case 4: {
          this.playerBar4.push(card);
          break;
        }
      }
    });
    /*this.data.trash.forEach((x) => {
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
    });*/

    let max = Math.max(...this.playerBarCardsCount);
    if (this.playerBarCardsCount.filter((x) => x == max).length > 1) {
      this.win = 5;
      let countPoints = [999];

      for (let i = 0; i < this.playerBarCardsCount.length; i++) {
        if (this.playerBarCardsCount[i] == max) {
          this.winArray.push(i);
          countPoints.push(0);
        }
      }

      this.data.bar.forEach((x) => {
        countPoints[this.winArray.indexOf(x.player)] += x.id;
      });

      let min = Math.min(...countPoints);

      this.playerWin = this.winArray[countPoints.indexOf(min)];
    } else {
      this.win = this.playerBarCardsCount.indexOf(max);
    }
    this.playerArray = [
      [],
      this.playerBar1,
      this.playerBar2,
      this.playerBar3,
      this.playerBar4,
    ];
  }
}
