import { Component, OnInit } from '@angular/core';
import * as animals from '../functions/animals';
import { vyhodnot, shuffle } from '../functions/game-functions';

export class Card {
  public id: number;
  public player: number;

  constructor(id: number, player: number) {
    this.id = id;
    this.player = player;
  }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  div1: HTMLElement | undefined;
  div2: HTMLElement | undefined;
  div3: HTMLElement | undefined;
  div4: HTMLElement | undefined;
  div5: HTMLElement | undefined;

  button1: HTMLElement | undefined;
  button2: HTMLElement | undefined;
  button3: HTMLElement | undefined;
  button4: HTMLElement | undefined;

  bar: Card[] = [];
  trash: Card[] = [];

  gameArray: Card[] = [];

  playedCard: Card | undefined;
  chameleonCard: Card | undefined;

  hand1: Card[] = [];
  hand2: Card[] = [];
  hand3: Card[] = [];
  hand4: Card[] = [];

  div: (HTMLElement | undefined)[] = [];

  /*toggleButtons = {
    b1: this.button1,
    b2: this.button2,
    b3: this.button3,
    b4: this.button4,
    div1: this.div1,
    div2: this.div2,
    div3: this.div3,
    div4: this.div4,
    div5: this.div5,
    index: this.index,
    hand: this.hand1,
    gameArray: this.gameArray,
    bar: this.bar,
    trash: this.trash,
  };*/

  start() {
    document.getElementById('start-menu')?.classList.add('hide');
    document.getElementById('game-plan')?.classList.remove('hide');
  }

  end() {
    document.getElementById('start-menu')?.classList.remove('hide');
    document.getElementById('game-plan')?.classList.add('hide');
  }

  but1() {
    console.log((this.hand1 = this.hand1));
    console.log(this.hand1.length);
    /*this.gameArray = this.clicked(
      this.hand1[0],
      0,
      this.gameArray,
      this.bar,
      this.trash
    );*/
  }
  but2() {
    this.gameArray = this.clicked(
      this.hand1[1],
      1,
      this.gameArray,
      this.bar,
      this.trash
    );
  }
  but3() {
    this.gameArray = this.clicked(
      this.hand1[2],
      2,
      this.gameArray,
      this.bar,
      this.trash
    );
  }
  but4() {
    this.gameArray = this.clicked(
      this.hand1[3],
      3,
      this.gameArray,
      this.bar,
      this.trash
    );
  }

  //////////////////////////////////////////////////////
  clicked(
    card: Card,
    arrayId: number,
    gameArray: Card[],
    bar: Card[],
    trash: Card[]
  ) {
    let playedCard = card;
    switch (playedCard.id) {
      case 1: {
        gameArray = animals.skunk(gameArray, playedCard);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 2: {
        gameArray = animals.papousekFirst(gameArray, playedCard);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 3: {
        gameArray = animals.klokanFirst(gameArray, playedCard);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }

        break;
      }
      case 4: {
        gameArray = animals.opice(gameArray, playedCard);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 5: {
        gameArray = animals.chameleonFirst(gameArray, playedCard);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 6: {
        gameArray = animals.tulen(gameArray, playedCard);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 7: {
        gameArray = animals.zebra(gameArray, playedCard);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 8: {
        gameArray = animals.zirafa(gameArray, playedCard);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 9: {
        gameArray = animals.had(gameArray, playedCard);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 10: {
        gameArray = animals.krokodyl(gameArray, playedCard);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 11: {
        gameArray = animals.hroch(gameArray, playedCard);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 12: {
        gameArray = animals.lev(gameArray, playedCard);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      default: {
        //provede se funkce clicked bez položení karty
      }
    }
    //vyhodnoceniTahu(0, arrayId);

    this.div1!.textContent = gameArray[0]?.id.toString();
    this.div2!.textContent = gameArray[1]?.id.toString();
    this.div3!.textContent = gameArray[2]?.id.toString();
    this.div4!.textContent = gameArray[3]?.id.toString();
    this.div5!.textContent = gameArray[4]?.id.toString();
    this.hand1.splice(arrayId, 1);
    return gameArray;
  }
  //////////////////////////////////////////////////////

  ngOnInit(): void {
    this.hand1 = [
      new Card(1, 1),
      new Card(2, 2),
      new Card(3, 2),
      new Card(4, 1),
      new Card(5, 1),
      new Card(6, 1),
      new Card(7, 2),
      new Card(8, 2),
      new Card(9, 1),
      new Card(10, 1),
      new Card(11, 1),
      new Card(12, 1),
    ];

    this.div1 = document.getElementById('1')!;
    this.div2 = document.getElementById('2')!;
    this.div3 = document.getElementById('3')!;
    this.div4 = document.getElementById('4')!;
    this.div5 = document.getElementById('5')!;

    this.button1 = document.getElementById('button-1')!;
    this.button2 = document.getElementById('button-2')!;
    this.button3 = document.getElementById('button-3')!;
    this.button4 = document.getElementById('button-4')!;

    this.div.push(this.div1, this.div2, this.div3, this.div4, this.div5);

    shuffle(this.hand1);
    shuffle(this.hand2);
    shuffle(this.hand3);
    shuffle(this.hand4);
    console.log(this.hand1[0]);

    this.button1?.addEventListener('click', this.but1);
    this.button2?.addEventListener('click', this.but2);
    this.button3?.addEventListener('click', this.but3);
    this.button4?.addEventListener('click', this.but4);
  }
}
