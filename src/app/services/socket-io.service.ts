import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Card } from '../game/game.component';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  socket: Socket | undefined;

  constructor() {}

  connect() {
    this.socket = io('https://safari-bar-server.onrender.com');   //https://safri-bar-server.herokuapp.com
  }

  connectToRoom(gameID: string) {
    this.socket!.emit('joinGame', { gameID: gameID });
  }

  amIconected(): boolean {
    if (this.socket?.emit('amIconected')) {
      return true;
    } else {
      return false;
    }
  }

  playerDisconnect() {
    return new Observable((observer) => {
      this.socket?.on('disconnected', (message) => {
        observer.next(message);
      });
    });
  }

  disconnectMe() {
    this.socket?.emit('disconnectMe');
  }

  canIConnect() {
    return new Observable((observer: Observer<number>) => {
      this.socket?.on('canIConnect', (data) => {
        observer.next(data);
      });
    });
  }

  roomExist(gameID: string) {
    this.socket?.emit('roomExist', gameID);
  }

  sendMessage(message: string, user: number) {
    this.socket?.emit('sendMessage', { message: message, user: user });
  }

  recieveMessage() {
    return new Observable(
      (observer: Observer<{ message: string; user: number }>) => {
        this.socket?.on('sendMessage', (message) => {
          observer.next(message);
        });
      }
    );
  }

  startGame() {
    this.socket?.emit('startGame');
  }

  recieveStartGame() {
    return new Observable((observer) => {
      this.socket?.on('startGame', () => {
        observer.next();
      });
    });
  }

  recieveJoinPlayers() {
    return new Observable((observer) => {
      this.socket?.on('joinGame', (message) => {
        observer.next(message);
      });
    });
  }

  recieveHand() {
    return new Observable(
      (
        observer: Observer<{
          hand: Card[];
          playerID: number;
        }>
      ) => {
        this.socket?.on('getHand', (data) => {
          observer.next(data);
        });
      }
    );
  }

  recieveGameUpdate(gameID: string) {
    return new Observable(
      (
        observer: Observer<{
          gameArray: Card[];
          bar: Card[];
          trash: Card[];
          countOfCards: number;
          playerID: number;
          logArray: (string | Card[])[];
        }>
      ) => {
        this.socket?.on(
          gameID,
          (data: {
            gameArray: Card[];
            bar: Card[];
            trash: Card[];
            countOfCards: number;
            playerID: number;
            logArray: (string | Card[])[];
          }) => {
            observer.next(data);
          }
        );
      }
    );
  }

  sendGameUpdate(
    gameID: string,
    gameArray: Card[],
    bar: Card[],
    trash: Card[],
    countOfCards: number,
    playerID: number,
    logArray: (string | Card[])[]
  ) {
    this.socket?.emit('gameUpdate', {
      gameID: gameID,
      gameArray: gameArray,
      bar: bar,
      trash: trash,
      countOfCards: countOfCards,
      playerID: playerID,
      logArray,
    });
  }
}
