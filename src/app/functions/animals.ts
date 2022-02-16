import { Card } from '../game/game.component';
import {
  vyhodnoceniTahu,
  obshuje4,
  /*toggleButtonsOff,
  toggleButtonsOn,*/
} from './game-functions';

export function skunk(gameArray: Card[], playedCard: Card): Card[] {
  let array = gameArray.map((x) => {
    return x.id;
  });
  for (let i = 0; i < 2; i++) {
    let max = Math.max(...array);
    if (max == 1 || max === playedCard.id) continue;
    while (array.includes(max)) {
      gameArray.splice(array.indexOf(max));
      array.splice(array.indexOf(max));
    }
  }

  gameArray.push(playedCard);

  return gameArray;
}

export function papousekFirst(gameArray: Card[], playedCard: Card) {
  if (gameArray.length == 0) {
    gameArray.push(playedCard);
    return gameArray;
  }

  //toggleButtonsOff();

  gameArray.push(playedCard);
  return gameArray;
}

export function papousekSecond(gameArray: Card[], cardIndex: number) {
  gameArray.splice(cardIndex, 1);

  /*vyhodnoceniTahu(-1, null);
  toggleButtonsOn();*/
}

export function klokanFirst(gameArray: Card[], playedCard: Card) {
  if (gameArray.length == 0) {
    gameArray.push(playedCard);
    return gameArray;
  }

  //toggleButtonsOff();

  gameArray.push(playedCard);
  return gameArray;
}

export function klokanSecond(
  cardIndex: number,
  gameArray: Card[],
  playedCard: Card
) {
  let tempArray = gameArray.slice(0, cardIndex);
  tempArray.push(playedCard);
  gameArray = tempArray.concat(gameArray.slice(cardIndex, 4));

  if (gameArray.length == 5) {
    //vyhodnot();
  }

  /*vyhodnoceniTahu(-1, null);

  toggleButtonsOn();*/
}

export function opice(gameArray: Card[], playedCard: Card) {
  let size = gameArray.length;

  if (obshuje4(size, gameArray)) {
    let tempPole = [playedCard];

    for (let x = size - 1; x >= 0; x--) {
      if (gameArray[x].id == 4) {
        tempPole.push(gameArray[x]);
      }
    }

    for (let x = 0; x < size; x++) {
      if (gameArray[x].id != 4 && gameArray[x].id != 12) {
        tempPole.push(gameArray[x]);
      }
    }

    gameArray = tempPole;
    return gameArray;
  } else {
    gameArray.push(playedCard);
    return gameArray;
  }
}

export function chameleonFirst(gameArray: Card[], playedCard: Card) {
  if (gameArray.length == 0) {
    gameArray.push(playedCard);
    return gameArray;
  }
  //toggleButtonsOff();

  gameArray.push(playedCard);
  return gameArray;
}

export function chameleonSecond(cardIndex: number, gameArray: Card[]) {
  /*let pozice;
  switch (gameArray[cardIndex].id) {
    case 1: {
      pozice = skunk();
      index++;
      break;
    }
    case 2: {
      chameleonCard = 2;
      pozice = papousekFirst();

      break;
    }
    case 3: {
      chameleonCard = 3;
      pozice = klokanFirst();

      index++;
      break;
    }
    case 4: {
      pozice = opice();
      index++;
      break;
    }
    case 5: {
      chameleonCard = 5;
      pozice = chameleonFirst();

      index++;
      break;
    }
    case 6: {
      pozice = tulen();
      index++;
      break;
    }
    case 7: {
      pozice = zebra();
      index++;
      break;
    }
    case 8: {
      pozice = zirafa();
      index++;
      break;
    }
    case 9: {
      pozice = had();
      index++;
      break;
    }
    case 10: {
      pozice = krokodyl();
      index++;
      break;
    }
    case 11: {
      pozice = hroch();
      index++;
      break;
    }
    case 12: {
      pozice = lev();
      if (pozice == null) pole[index] = null;
      else index++;
      break;
    }
  }

  if (index == 5) {
    vyhodnot();
  }

  vyhodnoceniTahu(-1, null);

  if (
    !(
      pole[cardIndex]?.id == 2 ||
      pole[cardIndex]?.id == 3 ||
      pole[cardIndex]?.id == 5
    )
  ) {
    toggleButtonsOn();
  }*/
}

export function tulen(gameArray: Card[], playedCard: Card) {
  gameArray.push(playedCard);
  gameArray.reverse();

  return gameArray;
}

export function zebra(gameArray: Card[], playedCard: Card) {
  gameArray.push(playedCard);
  return gameArray;
}

export function zirafa(gameArray: Card[], playedCard: Card) {
  gameArray.push(playedCard);
  return gameArray;
}

export function had(gameArray: Card[], playedCard: Card) {
  gameArray.push(playedCard);
  gameArray.sort((a, b) => (a?.id > b?.id ? -1 : 1));

  return gameArray;
}

export function krokodyl(gameArray: Card[], playedCard: Card) {
  let pozice = gameArray.length;

  for (let i = pozice - 1; i >= 0; i--) {
    if (gameArray[i].id < 10 && gameArray[i].id != 7) {
      gameArray.splice(i, 1);
    } else break;
  }

  gameArray.push(playedCard);
  return gameArray;
}

export function hroch(gameArray: Card[], playedCard: Card) {
  if (gameArray.length == 0) {
    gameArray.push(playedCard);
    return gameArray;
  }

  let p = gameArray.length - 1;
  for (p; p >= 0; p--) {
    if (gameArray[p].id >= 11 || gameArray[p].id == 7) {
      p++;
      break;
    }
    if (p == 0) break;
  }
  let tempArray1 = gameArray.slice(0, p);
  tempArray1.push(playedCard);

  let tempArray2 = gameArray.slice(p, 4);

  gameArray = tempArray1.concat(tempArray2);

  return gameArray;
}

export function lev(gameArray: Card[], playedCard: Card) {
  if (gameArray.findIndex((x) => x.id == 12) != -1) return gameArray;
  gameArray = gameArray.filter((x) => x.id != 4);
  let temp_pole = [playedCard];
  gameArray = temp_pole.concat(gameArray);

  return gameArray;
}
