//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
////////////////PAPOUSEK,KLOKAN,CHAMELEON, KDYŽ SE UMÍSTÍ/////////////////////////
////////////////JAKO PÁTÁ KARTA, TAK SE PROVEDE VYHODNOT//////////////////////////
///////////////////////////TO BY SE DÍT NEMĚLO////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
import { Component, OnInit } from '@angular/core';
import * as animals from '../functions/animals';
import {
  vyhodnot,
  shuffle,
  div1Func,
  div2Func,
  div3Func,
  div4Func,
} from '../functions/game-functions';

export class Card {
  public id: number;
  public name: string;
  public player: number;

  constructor(id: number, name: string, player: number) {
    this.id = id;
    this.name = name;
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
  chameleonCard: number = 0;

  hand1: Card[] = [];
  hand2: Card[] = [];
  hand3: Card[] = [];
  hand4: Card[] = [];

  div: (HTMLElement | undefined)[] = [];

  start() {
    document.getElementById('start-menu')?.classList.add('hide');
    document.getElementById('game-plan')?.classList.remove('hide');
  }

  end() {
    /*document.getElementById('start-menu')?.classList.remove('hide');
    document.getElementById('game-plan')?.classList.add('hide');*/
    console.log(this.bar);
    console.log(this.trash);
    let b1 = 0;
    let b2 = 0;
    let u1 = 0;
    let u2 = 0;
    this.bar.forEach((x) => (x.player == 1 ? b1++ : b2++));
    this.trash.forEach((x) => (x.player == 1 ? u1++ : u2++));

    if (b1 != b2) {
      alert(
        'vyhral hrac ' +
          (b1 > b2 ? '1' : '2') +
          ' s poctem karet ' +
          (b1 > b2 ? b1 : b2) +
          '\n' +
          'prohral hrac ' +
          (b1 < b2 ? '1' : '2') +
          ' s poctem karet ' +
          (b1 < b2 ? b1 : b2)
      );
    } else {
      alert('remiza - všichni mají ' + b1 + ' výhreních karet');
    }
  }

  ////////////////////////////////////////
  /////////////FUNKCE CLICKED/////////////
  ////////////////////////////////////////

  clicked(
    card: Card,
    arrayId: number,
    gameArray: Card[],
    bar: Card[],
    trash: Card[]
  ) {
    this.playedCard = card;
    switch (this.playedCard.id) {
      case 1: {
        gameArray = animals.skunk(gameArray, this.playedCard, true);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 2: {
        let temp = animals.papousekFirst(gameArray, this.playedCard, true);

        if (temp.isNeed) {
          this.toggleButtonsOff();
        } else {
          gameArray = temp.gameArray;
        }
        /*if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }*/

        break;
      }
      case 3: {
        let temp = animals.klokanFirst(gameArray, this.playedCard, true);

        if (temp.isNeed) {
          this.toggleButtonsOff();
        } else {
          gameArray = temp.gameArray;
        }

        /*if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }*/

        break;
      }
      case 4: {
        gameArray = animals.opice(gameArray, this.playedCard, true);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 5: {
        let temp = animals.chameleonFirst(gameArray, this.playedCard, true);

        if (temp.isNeed) {
          this.toggleButtonsOff();
        } else {
          gameArray = temp.gameArray;
        }
        /*if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }*/

        break;
      }
      case 6: {
        gameArray = animals.tulen(gameArray, this.playedCard, true);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 7: {
        gameArray = animals.zebra(gameArray, this.playedCard);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 8: {
        gameArray = animals.zirafa(gameArray, this.playedCard);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 9: {
        gameArray = animals.had(gameArray, this.playedCard, true);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 10: {
        gameArray = animals.krokodyl(gameArray, this.playedCard, true);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 11: {
        gameArray = animals.hroch(gameArray, this.playedCard, true);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      case 12: {
        gameArray = animals.lev(gameArray, this.playedCard, true);

        if (gameArray.length == 5) {
          [gameArray, this.bar, this.trash] = vyhodnot(gameArray, bar, trash);
        }
        break;
      }
      default: {
        //provede se funkce clicked bez položení karty
      }
    }

    this.hand1.splice(arrayId, 1);
    return gameArray;
  }

  /////////////////////////////////////////
  /////////////FUNKCE TLAČÍTEK/////////////
  /////////////////////////////////////////

  but1 = () => {
    this.gameArray = this.clicked(
      this.hand1[0],
      0,
      this.gameArray,
      this.bar,
      this.trash
    );
    this.vyhodnoceniTahu();
  };
  but2 = () => {
    this.gameArray = this.clicked(
      this.hand1[1],
      1,
      this.gameArray,
      this.bar,
      this.trash
    );
    this.vyhodnoceniTahu();
  };
  but3 = () => {
    this.gameArray = this.clicked(
      this.hand1[2],
      2,
      this.gameArray,
      this.bar,
      this.trash
    );
    this.vyhodnoceniTahu();
  };
  but4 = () => {
    this.gameArray = this.clicked(
      this.hand1[3],
      3,
      this.gameArray,
      this.bar,
      this.trash
    );
    this.vyhodnoceniTahu();
  };
  d1 = () => {
    let temp = div1Func(this.gameArray, this.playedCard!, this.chameleonCard!);
    this.dFunc(temp);
  };
  d2 = () => {
    let temp = div2Func(this.gameArray, this.playedCard!, this.chameleonCard!);
    this.dFunc(temp);
  };
  d3 = () => {
    let temp = div3Func(this.gameArray, this.playedCard!, this.chameleonCard!);
    this.dFunc(temp);
  };
  d4 = () => {
    let temp = div4Func(this.gameArray, this.playedCard!, this.chameleonCard!);
    this.dFunc(temp);
  };

  dFunc(temp: { gameArray: Card[]; chameleonCard: number }) {
    this.gameArray = temp.gameArray;
    this.vyhodnoceniTahu();
    if (temp.chameleonCard == 0) {
      this.chameleonCard = 0;
      this.toggleButtonsOn();
    } else this.chameleonCard = temp.chameleonCard;
    if (this.gameArray.length == 5) {
      [this.gameArray, this.bar, this.trash] = vyhodnot(
        this.gameArray,
        this.bar,
        this.trash
      );
      this.vyhodnoceniTahu();
      console.log(this.bar);
      console.log(this.trash);
    }
  }
  /////////////////////////////////////////
  ////////////ZBYLÉ FUNKCE THIS////////////
  /////////////////////////////////////////
  vyhodnoceniTahu() {
    this.div1!.textContent = this.gameArray[0]?.id.toString();
    this.div2!.textContent = this.gameArray[1]?.id.toString();
    this.div3!.textContent = this.gameArray[2]?.id.toString();
    this.div4!.textContent = this.gameArray[3]?.id.toString();
    this.div5!.textContent = this.gameArray[4]?.id.toString();

    if (this.hand1.length == 0 && this.chameleonCard == 0) {
      this.end();
    }
  }

  toggleButtonsOff() {
    this.button1?.removeEventListener('click', this.but1);
    this.button2?.removeEventListener('click', this.but2);
    this.button3?.removeEventListener('click', this.but3);
    this.button4?.removeEventListener('click', this.but4);

    switch (this.gameArray.length - 1) {
      case 1: {
        this.div1?.addEventListener('click', this.d1);
        break;
      }
      case 2: {
        this.div1?.addEventListener('click', this.d1);
        this.div2?.addEventListener('click', this.d2);
        break;
      }
      case 3: {
        this.div1?.addEventListener('click', this.d1);
        this.div2?.addEventListener('click', this.d2);
        this.div3?.addEventListener('click', this.d3);
        break;
      }
      case 4: {
        this.div1?.addEventListener('click', this.d1);
        this.div2?.addEventListener('click', this.d2);
        this.div3?.addEventListener('click', this.d3);
        this.div4?.addEventListener('click', this.d4);
        break;
      }
    }
  }

  toggleButtonsOn() {
    this.div1?.removeEventListener('click', this.d1);
    this.div2?.removeEventListener('click', this.d2);
    this.div3?.removeEventListener('click', this.d3);
    this.div4?.removeEventListener('click', this.d4);

    this.button1?.addEventListener('click', this.but1);
    this.button2?.addEventListener('click', this.but2);
    this.button3?.addEventListener('click', this.but3);
    this.button4?.addEventListener('click', this.but4);
  }

  //////////////////////////////////////////////////////

  ngOnInit(): void {
    this.hand1 = [
      new Card(1, '1 skunk', 1),
      new Card(2, '2 papousek', 1),
      new Card(3, '3 klokan', 1),
      new Card(4, '4 opice', 1),
      new Card(5, '5 chameleon', 1),
      new Card(6, '6 tulen', 1),
      new Card(7, '7 zebra', 1),
      new Card(8, '8 zirafa', 1),
      new Card(9, '9 had', 1),
      new Card(10, '10 krokodyl', 1),
      new Card(11, '11 hroch', 1),
      new Card(12, '12 lev', 1),
      new Card(1, '1 skunk', 2),
      new Card(2, '2 papousek', 2),
      new Card(3, '3 klokan', 2),
      new Card(4, '4 opice', 2),
      new Card(5, '5 chameleon', 2),
      new Card(6, '6 tulen', 2),
      new Card(7, '7 zebra', 2),
      new Card(8, '8 zirafa', 2),
      new Card(9, '9 had', 2),
      new Card(10, '10 krokodyl', 2),
      new Card(11, '11 hroch', 2),
      new Card(12, '12 lev', 2),
    ];

    this.div1 = document.getElementById('div1')!;
    this.div2 = document.getElementById('div2')!;
    this.div3 = document.getElementById('div3')!;
    this.div4 = document.getElementById('div4')!;
    this.div5 = document.getElementById('div5')!;

    this.button1 = document.getElementById('button-1')!;
    this.button2 = document.getElementById('button-2')!;
    this.button3 = document.getElementById('button-3')!;
    this.button4 = document.getElementById('button-4')!;

    this.div.push(this.div1, this.div2, this.div3, this.div4, this.div5);

    shuffle(this.hand1);
    shuffle(this.hand2);
    shuffle(this.hand3);
    shuffle(this.hand4);

    this.button1?.addEventListener('click', this.but1);
    this.button2?.addEventListener('click', this.but2);
    this.button3?.addEventListener('click', this.but3);
    this.button4?.addEventListener('click', this.but4);
  }
}
