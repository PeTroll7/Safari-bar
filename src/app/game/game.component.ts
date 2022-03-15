import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as animals from '../functions/animals';
import { vyhodnot, shuffle, divFunc } from '../functions/game-functions';
import { SocketIoService } from '../services/socket-io.service';

import { RulesComponent } from '../rules/rules.component';
import { EndComponent } from '../end/end.component';

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

export class ChatMessage {
  public text: string;
  public user: number;

  constructor(text: string, user: number) {
    this.text = text;
    this.user = user;
  }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(
    private socketIoService: SocketIoService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  copied: boolean = false;

  gameStarted: boolean = false;
  gameID: string = '';
  myID: number = 0;
  countOfPlayers = 1;
  countOfCards: number = 0;

  message: string = '';
  chatArray: ChatMessage[] = [];

  log: string = '';
  logArray: (string | Card[])[] = [];

  gameInfo: string = 'na tahu je jiný hráč';

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
  chameleonCard: { id: number; name: string } = { id: 0, name: '' };

  hand: Card[] = [];

  div: (HTMLElement | undefined)[] = [];

  moveDone: boolean = true;

  start() {
    document.getElementById('start-menu')?.classList.add('hide');
    document.getElementById('game-plan')?.classList.remove('hide');
  }

  end() {
    console.log('BAR');
    console.log(this.bar);
    console.log('TRASH');
    console.log(this.trash);

    this.openEndDialog();
  }

  ////////////////////////////////////////
  /////////////FUNKCE CLICKED/////////////
  ////////////////////////////////////////

  clicked(card: Card, arrayId: number, gameArray: Card[]) {
    this.moveDone = false;
    this.playedCard = card;
    let oldArray = gameArray;
    switch (this.playedCard.id) {
      case 1: {
        gameArray = animals.skunk(gameArray, this.playedCard, true);

        if (gameArray.length == oldArray.length + 1) {
          this.logArray.push('skunk vstoupil do řady');
          this.logArray.push([...gameArray]);
        } else {
          this.logArray.push('skunk vysmradil zvířata z řady');
          this.logArray.push([...gameArray]);
        }

        break;
      }
      case 2: {
        let temp = animals.papousekFirst(gameArray, this.playedCard, true);

        if (temp.isNeed) {
          this.toggleButtonsOff();
        } else {
          gameArray = temp.gameArray;
          this.moveDone = true;
          this.logArray.push('papousek vstoupil do řady');
          this.logArray.push([...gameArray]);
        }

        break;
      }
      case 3: {
        let temp = animals.klokanFirst(gameArray, this.playedCard, true);

        if (temp.isNeed) {
          this.toggleButtonsOff();
        } else {
          gameArray = temp.gameArray;
          this.moveDone = true;
          this.logArray.push('klokan vstoupil do řady');
          this.logArray.push([...gameArray]);
        }

        break;
      }
      case 4: {
        gameArray = animals.opice(gameArray, this.playedCard, true);

        if (gameArray[0]?.id == 4 && gameArray[1]?.id == 4) {
          this.logArray.push('opice vstoupila do řady a předběhla ji');
          this.logArray.push([...gameArray]);
        } else {
          this.logArray.push('opice vstoupila do řady');
          this.logArray.push([...gameArray]);
        }

        break;
      }
      case 5: {
        let temp = animals.chameleonFirst(gameArray, this.playedCard, true);

        if (temp.isNeed) {
          this.toggleButtonsOff();
        } else {
          gameArray = temp.gameArray;
          this.moveDone = true;
        }

        this.logArray.push('chameleon vstoupil do řady');
        this.logArray.push([...gameArray]);

        break;
      }
      case 6: {
        gameArray = animals.tulen(gameArray, this.playedCard, true);

        this.logArray.push('tuleň otočil řadu');
        this.logArray.push([...gameArray]);
        console.log(gameArray);

        break;
      }
      case 7: {
        gameArray = animals.zebra(gameArray, this.playedCard);

        this.logArray.push('zebra vstoupila do řady');
        this.logArray.push([...gameArray]);

        break;
      }
      case 8: {
        gameArray = animals.zirafa(gameArray, this.playedCard);

        this.logArray.push('žirafa vstoupila do řady');
        this.logArray.push([...gameArray]);

        break;
      }
      case 9: {
        gameArray = animals.had(gameArray, this.playedCard, true);

        this.logArray.push('had seřadil řadu');
        this.logArray.push([...gameArray]);

        break;
      }
      case 10: {
        gameArray = animals.krokodyl(
          gameArray,
          this.playedCard,
          true,
          gameArray.length - 1
        );

        if (gameArray.length == oldArray.length + 1) {
          this.logArray.push('krokodýl vstoupil do řady');
          this.logArray.push([...gameArray]);
        } else {
          this.logArray.push('krokodýl snědl slabší zvířata před sebou');
          this.logArray.push([...gameArray]);
        }

        break;
      }
      case 11: {
        gameArray = animals.hroch(
          gameArray,
          this.playedCard,
          true,
          gameArray.length - 1
        );

        if (gameArray.length == oldArray.length + 1) {
          this.logArray.push('hroch vstoupil do řady');
          this.logArray.push([...gameArray]);
        } else {
          this.logArray.push('hroch předběhl slabší zvířata před sebou');
          this.logArray.push([...gameArray]);
        }

        break;
      }
      case 12: {
        gameArray = animals.lev(gameArray, this.playedCard, true);

        if (gameArray.length == oldArray.length + 1) {
          this.logArray.push('lev vstoupil na první místo');
          this.logArray.push([...gameArray]);
        } else {
          this.logArray.push('lev vtoupil do řady, ale byl vyhnán prvním lvem');
          this.logArray.push([...gameArray]);
        }

        break;
      }
      default: {
      }
    }

    if (
      this.playedCard.id == 2 ||
      this.playedCard.id == 3 ||
      this.playedCard.id == 5
    ) {
      this.socketIoService.sendGameUpdate(
        this.gameID,
        gameArray,
        this.bar,
        this.trash,
        this.countOfCards,
        gameArray.length == 1 ? this.myID : this.myID - 1,
        this.logArray
      );
      if (gameArray.length == 1) this.isItMyTurn(false);
    } else this.moveDone = true;

    this.hand.splice(arrayId, 1);
    return gameArray;
  }

  /////////////////////////////////////////
  /////////////FUNKCE TLAČÍTEK/////////////
  /////////////////////////////////////////

  but1 = () => {
    this.gameArray = this.clicked(this.hand[0], 0, this.gameArray);
    this.vyhodnoceniTahu();
  };
  but2 = () => {
    this.gameArray = this.clicked(this.hand[1], 1, this.gameArray);
    this.vyhodnoceniTahu();
  };
  but3 = () => {
    this.gameArray = this.clicked(this.hand[2], 2, this.gameArray);
    this.vyhodnoceniTahu();
  };
  but4 = () => {
    this.gameArray = this.clicked(this.hand[3], 3, this.gameArray);
    this.vyhodnoceniTahu();
  };

  /////////////////////////////////////////
  ///////////FUNKCE HERNÍHO POLE///////////
  /////////////////////////////////////////

  d1 = () => {
    let temp = divFunc(
      this.gameArray,
      this.playedCard!,
      this.chameleonCard!,
      0
    );
    this.dFunc(temp);
  };
  d2 = () => {
    let temp = divFunc(
      this.gameArray,
      this.playedCard!,
      this.chameleonCard!,
      1
    );
    this.dFunc(temp);
  };
  d3 = () => {
    let temp = divFunc(
      this.gameArray,
      this.playedCard!,
      this.chameleonCard!,
      2
    );
    this.dFunc(temp);
  };
  d4 = () => {
    let temp = divFunc(
      this.gameArray,
      this.playedCard!,
      this.chameleonCard!,
      3
    );
    this.dFunc(temp);
  };
  logScrollDown() {
    document.getElementById('log')!.scrollTop =
      document.getElementById('log')!.scrollHeight;
  }
  chatScrollDown() {
    document.getElementById('chat')!.scrollTop =
      document.getElementById('chat')!.scrollHeight;
    document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
  }

  dFunc(temp: {
    gameArray: Card[];
    chameleonCard: { id: number; name: string };
    valid: boolean;
    logMessage: string;
  }) {
    if (temp.logMessage != '') {
      this.logArray.push(temp.logMessage);
      this.logArray.push(temp.gameArray);
    }

    if (temp.valid) {
      if (temp.chameleonCard.id == 0) {
        this.chameleonCard.id = 0;
        this.chameleonCard.name = '';
        this.toggleButtonsOn();
      } else {
        this.chameleonCard.id = temp.chameleonCard.id;
        this.chameleonCard.name = temp.chameleonCard.name;
        this.toggleButtonsOff();
      }

      this.gameArray = temp.gameArray;

      this.vyhodnoceniTahu();
    }
  }
  /////////////////////////////////////////
  ////////////ZBYLÉ FUNKCE THIS////////////
  /////////////////////////////////////////
  vyhodnoceniTahu() {
    if (this.moveDone) {
      this.gameArray = this.repeatCards(this.gameArray);
      if (this.gameArray.length == 5) {
        [this.gameArray, this.bar, this.trash] = vyhodnot(
          this.gameArray,
          this.bar,
          this.trash
        );
        this.logArray.push('řada je plná - vyhodnocení');
        this.logArray.push(this.gameArray);
      }
      this.countOfCards--;
      this.socketIoService.sendGameUpdate(
        this.gameID,
        this.gameArray,
        this.bar,
        this.trash,
        this.countOfCards,
        this.myID,
        this.logArray
      );
      this.isItMyTurn(false);
    }
  }

  repeatCards(gameArray: Card[]) {
    if (gameArray.length > 1) {
      let zirafaJump = false;
      for (let i = 0; i < gameArray.length; i++) {
        let lastArray = gameArray;
        if (this.playedCard !== gameArray[i]) {
          switch (gameArray[i].id) {
            case 8: {
              if (
                this.playedCard! !== gameArray[i] &&
                !zirafaJump &&
                gameArray[i - 1]?.id < gameArray[i]?.id
              ) {
                let temp = gameArray[i - 1];
                gameArray[i - 1] = gameArray[i];
                gameArray[i] = temp;
                zirafaJump = true;
                this.logArray.push('žirafa předběhla slabší zvíře před sebou');
                this.logArray.push([...gameArray]);
              }
              break;
            }
            case 10: {
              let size = gameArray.length;
              gameArray = animals.krokodyl(
                gameArray,
                this.playedCard!,
                false,
                i - 1
              );
              if (size - gameArray.length != 0) {
                i = i - (size - gameArray.length);
                this.logArray.push('krokodýl sežral slabší zvířata před sebou');
                this.logArray.push([...gameArray]);
              }

              break;
            }
            case 11: {
              gameArray = animals.hroch(gameArray, gameArray[i], false, i);
              if (gameArray[i] != lastArray[i]) {
                this.logArray.push('hroch předběhl slabší zvířata před sebou');
                this.logArray.push([...gameArray]);
              }

              break;
            }
            default: {
            }
          }
        }
      }
    }
    return gameArray;
  }

  toggleButtonsOff() {
    this.button1?.removeEventListener('click', this.but1);
    this.button2?.removeEventListener('click', this.but2);
    this.button3?.removeEventListener('click', this.but3);
    this.button4?.removeEventListener('click', this.but4);

    switch (this.gameArray.length - 1) {
      case 1: {
        this.div1?.addEventListener('click', this.d1);
        this.div1?.classList.add('clickable');
        break;
      }
      case 2: {
        this.div1?.addEventListener('click', this.d1);
        this.div2?.addEventListener('click', this.d2);
        this.div1?.classList.add('clickable');
        this.div2?.classList.add('clickable');
        break;
      }
      case 3: {
        this.div1?.addEventListener('click', this.d1);
        this.div2?.addEventListener('click', this.d2);
        this.div3?.addEventListener('click', this.d3);
        if (
          (this.playedCard!.id == 5 && this.chameleonCard.id == 3) ||
          this.playedCard!.id == 3
        ) {
          this.div1?.classList.remove('clickable');
        } else {
          this.div1?.classList.add('clickable');
        }

        this.div2?.classList.add('clickable');
        this.div3?.classList.add('clickable');
        break;
      }
      case 4: {
        this.div1?.addEventListener('click', this.d1);
        this.div2?.addEventListener('click', this.d2);
        this.div3?.addEventListener('click', this.d3);
        this.div4?.addEventListener('click', this.d4);
        if (
          (this.playedCard!.id == 5 && this.chameleonCard.id == 3) ||
          this.playedCard!.id == 3
        ) {
          this.div1?.classList.remove('clickable');
          this.div2?.classList.remove('clickable');
        } else {
          this.div1?.classList.add('clickable');
          this.div2?.classList.add('clickable');
        }
        this.div3?.classList.add('clickable');
        this.div4?.classList.add('clickable');
        break;
      }
    }

    if (this.chameleonCard.id != 0) {
      this.gameInfo = 'chameleon vybírá kartu pro ' + this.chameleonCard!.name;
    } else {
      this.gameInfo = 'vyber kartu z hrácího pole';
    }
  }

  toggleButtonsOn() {
    this.div1?.removeEventListener('click', this.d1);
    this.div2?.removeEventListener('click', this.d2);
    this.div3?.removeEventListener('click', this.d3);
    this.div4?.removeEventListener('click', this.d4);
    this.div1?.classList.remove('clickable');
    this.div2?.classList.remove('clickable');
    this.div3?.classList.remove('clickable');
    this.div4?.classList.remove('clickable');

    this.button1?.addEventListener('click', this.but1);
    this.button2?.addEventListener('click', this.but2);
    this.button3?.addEventListener('click', this.but3);
    this.button4?.addEventListener('click', this.but4);

    this.moveDone = true;
  }

  zobraz() {
    console.log(this.gameArray);
    console.log(this.bar);
    console.log(this.trash);
  }

  //////////////////////////////////////////////////////

  ngOnInit(): void {
    this.gameID = this.route.snapshot.paramMap.get('id')!;

    if (this.socketIoService.amIconected()) {
      this.socketIoService.connectToRoom(this.gameID);
    } else {
      this.socketIoService.connect();
      this.socketIoService.roomExist(this.gameID);
    }

    this.div1 = document.getElementById('div1')!;
    this.div2 = document.getElementById('div2')!;
    this.div3 = document.getElementById('div3')!;
    this.div4 = document.getElementById('div4')!;
    this.div5 = document.getElementById('div5')!;

    this.button1 = document.getElementById('button-1')!;
    this.button2 = document.getElementById('button-2')!;
    this.button3 = document.getElementById('button-3')!;
    this.button4 = document.getElementById('button-4')!;

    this.canIConnect();
    this.recieveHand();
    this.recieveJoinPlayers();
    this.recieveStartGame();
    this.recieveGameUpdate();
    this.recieveMessage();
    this.playerDisconnect();

    this.router.events.subscribe(() => {
      this.socketIoService.disconnectMe();
    });
  }

  startGame() {
    this.socketIoService.startGame();
  }

  recieveStartGame() {
    this.socketIoService.recieveStartGame().subscribe(() => {
      this.gameStarted = true;
      document.getElementById('waiting')?.classList.add('hide');
      document.getElementById('game')?.classList.remove('hide');
    });
  }

  canIConnect() {
    this.socketIoService.canIConnect().subscribe((data) => {
      switch (data) {
        case 1: {
          this.socketIoService.connectToRoom(this.gameID);
          break;
        }
        case 2: {
          alert('tato místnost je plná');
          this.router.navigate(['/home']);
          break;
        }
        case 3: {
          alert('hra už začala');
          this.router.navigate(['/home']);
          break;
        }
        case 4: {
          alert('místnost neexistuje');
          this.router.navigate(['/home']);
          break;
        }
      }
    });
  }

  recieveHand() {
    this.socketIoService.recieveHand().subscribe((data) => {
      this.hand = shuffle(data.hand);
      this.myID = data.playerID;
      this.countOfPlayers = data.playerID;
      this.countOfCards += 12;
      if (this.myID == 1) this.isItMyTurn(true);
    });
  }

  recieveJoinPlayers() {
    this.socketIoService.recieveJoinPlayers().subscribe((message) => {
      this.countOfPlayers++;
      this.countOfCards += 12;
    });
  }

  recieveGameUpdate() {
    this.socketIoService.recieveGameUpdate(this.gameID).subscribe((data) => {
      this.gameArray = data.gameArray;
      this.bar = data.bar;
      this.trash = data.trash;
      this.countOfCards = data.countOfCards;
      this.logArray = data.logArray;
      if (data.playerID == this.myID && this.moveDone) this.isItMyTurn(true);
      if (this.countOfCards == 0) this.end();
    });
  }

  playerDisconnect() {
    this.socketIoService.playerDisconnect().subscribe((message) => {
      setTimeout(() => window.alert(message), 10);
      this.router.navigate(['/home']);
      this.socketIoService.disconnectMe();
    });
  }

  isItMyTurn(setting: boolean) {
    if (setting) {
      this.gameInfo = 'jsi na tahu';
      this.button1?.addEventListener('click', this.but1);
      this.button2?.addEventListener('click', this.but2);
      this.button3?.addEventListener('click', this.but3);
      this.button4?.addEventListener('click', this.but4);
    } else {
      this.gameInfo = 'na tahu je jiný hráč';
      this.button1?.removeEventListener('click', this.but1);
      this.button2?.removeEventListener('click', this.but2);
      this.button3?.removeEventListener('click', this.but3);
      this.button4?.removeEventListener('click', this.but4);
    }
  }

  openRulesDialog() {
    const dialogRef = this.dialog.open(RulesComponent, {
      height: '80%',
    });
  }

  openEndDialog() {
    const dialogRef = this.dialog.open(EndComponent, {
      height: '80%',
      data: { bar: this.bar, trash: this.trash },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  sendMessage() {
    if (this.message != '') {
      this.chatArray.push(new ChatMessage(this.message, this.myID));
      this.chatScrollDown();
      this.socketIoService.sendMessage(this.message, this.myID);
      this.message = '';
    }
  }

  recieveMessage() {
    this.socketIoService.recieveMessage().subscribe((message) => {
      this.chatArray.push(new ChatMessage(message.message, message.user));
      this.chatScrollDown();
    });
  }

  getCard(log: string | Card[], id: number): string {
    let card = log[id] as Card;
    let img = '';

    if (card) img = '../../assets/imgs/' + card.name + card.player + '.png';
    else img = '../../assets/imgs/blank.png';

    return img;
  }

  copyURL() {
    navigator.clipboard.writeText(window.location.href);
    this.copied = true;
  }
}
