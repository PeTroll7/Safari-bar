import { Card } from '../game/game.component';
import { obshuje4, containsOnlyCham } from './game-functions';

export function skunk(
  gameArray: Card[],
  playedCard: Card,
  setting: boolean
): Card[] {
  if (gameArray.length != 0) {
    if (playedCard.id == 5) {
      gameArray = gameArray.slice(0, gameArray.length - 1);
    }
    let array = gameArray.map((x) => {
      return x.id;
    });

    for (let i = 0; i < 2; i++) {
      let max = Math.max(...array);

      if (max == 1) continue;

      while (array.includes(max)) {
        let index = array.indexOf(max);
        gameArray.splice(index, 1);
        array.splice(index, 1);
      }
    }
    if (playedCard.id == 5) gameArray.push(playedCard);
  }

  if (setting) gameArray.push(playedCard);

  return gameArray;
}

export function papousekFirst(
  gameArray: Card[],
  playedCard: Card,
  setting: boolean
) {
  if (gameArray.length == 0) {
    gameArray.push(playedCard);
    return { gameArray: gameArray, isNeed: false };
  }

  if (setting) gameArray.push(playedCard);
  return { gameArray: gameArray, isNeed: true };
}

export function papousekSecond(cardIndex: number, gameArray: Card[]) {
  gameArray.splice(cardIndex, 1);

  return gameArray;
}

export function klokanFirst(
  gameArray: Card[],
  playedCard: Card,
  setting: boolean
) {
  if (gameArray.length == 0) {
    gameArray.push(playedCard);
    return { gameArray: gameArray, isNeed: false };
  }

  if (setting) gameArray.push(playedCard);
  return { gameArray: gameArray, isNeed: true };
}

export function klokanSecond(
  cardIndex: number,
  gameArray: Card[],
  playedCard: Card
) {
  let tempArray = gameArray.slice(0, cardIndex);
  tempArray.push(playedCard);
  gameArray = tempArray.concat(
    gameArray.slice(cardIndex, gameArray.length - 1)
  );

  return gameArray;
}

export function opice(gameArray: Card[], playedCard: Card, setting: boolean) {
  if (!setting) gameArray.splice(gameArray.length - 1, 1);

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

export function chameleonFirst(
  gameArray: Card[],
  playedCard: Card,
  setting: boolean
) {
  if (gameArray.length == 0 || containsOnlyCham(gameArray)) {
    gameArray.push(playedCard);
    return { gameArray: gameArray, isNeed: false };
  }

  if (setting) gameArray.push(playedCard);
  return { gameArray: gameArray, isNeed: true };
}

export function chameleonSecond(
  cardIndex: number,
  gameArray: Card[],
  playedCard: Card
) {
  let currentCard = gameArray[cardIndex];
  let chameleonCard = { id: 0, name: '' };

  let logMessage = '';

  switch (currentCard.id) {
    case 1: {
      gameArray = skunk(gameArray, playedCard, false);

      logMessage = 'chameleon na sebe vzal podobu skunka';
      break;
    }
    case 2: {
      chameleonCard.id = 2;
      chameleonCard.name = 'papousek';
      let temp = papousekFirst(gameArray, playedCard, false);
      gameArray = temp.gameArray;

      logMessage = 'chameleon na sebe vzal podobu papouška';
      break;
    }
    case 3: {
      chameleonCard.id = 3;
      chameleonCard.name = 'klokan';
      let temp = klokanFirst(gameArray, playedCard, false);
      gameArray = temp.gameArray;

      logMessage = 'chameleon na sebe vzal podobu klokana';
      break;
    }
    case 4: {
      gameArray = opice(gameArray, playedCard, false);

      logMessage = 'chameleon na sebe vzal podobu opice';
      break;
    }
    case 5: {
      chameleonCard.id = 5;
      chameleonCard.name = 'chameleon';
      let temp = chameleonFirst(gameArray, playedCard, false);
      gameArray = temp.gameArray;

      logMessage = 'chameleon na sebe vzal podobu chameleona';
      break;
    }
    case 6: {
      gameArray = tulen(gameArray, playedCard, false);

      logMessage = 'chameleon na sebe vzal podobu tuleně';
      break;
    }
    case 7: {
      //zebra při položení nic neudělá
      logMessage = 'chameleon na sebe vzal podobu zebry';
      break;
    }
    case 8: {
      //žirafa při položení nic neudělá
      logMessage = 'chameleon na sebe vzal podobu žirafy';
      break;
    }
    case 9: {
      gameArray = had(gameArray, playedCard, false);

      logMessage = 'chameleon na sebe vzal podobu hada';
      break;
    }
    case 10: {
      gameArray = krokodyl(gameArray, playedCard, false, gameArray.length - 2);

      logMessage = 'chameleon na sebe vzal podobu krokodýla';
      break;
    }
    case 11: {
      gameArray = hroch(gameArray, playedCard, false, gameArray.length - 1);

      logMessage = 'chameleon na sebe vzal podobu hrocha';
      break;
    }
    case 12: {
      gameArray = lev(gameArray, playedCard, false);

      logMessage = 'chameleon na sebe vzal podobu lva';
      break;
    }
  }

  if (currentCard.id == 2 || currentCard.id == 3 || currentCard.id == 5)
    return {
      gameArray: gameArray,
      chameleonCard: chameleonCard,
      isNeed: true,
      logMessage: logMessage,
    };
  else
    return {
      gameArray: gameArray,
      chameleonCard: chameleonCard,
      isNeed: false,
      logMessage: logMessage,
    };
}

export function tulen(gameArray: Card[], playedCard: Card, setting: boolean) {
  if (setting) gameArray.push(playedCard);
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

export function had(gameArray: Card[], playedCard: Card, setting: boolean) {
  if (setting) {
    gameArray.push(playedCard);
    gameArray.sort((a, b) => (a?.id > b?.id ? -1 : 1));
  } else {
    gameArray[gameArray.length - 1].id = 9;
    gameArray.sort((a, b) => (a?.id > b?.id ? -1 : 1));
    let array = gameArray.map((x) => {
      return { name: x.name, id: x.id };
    });
    gameArray[
      array.findIndex((x) => x.name === playedCard.name && x.id === 9)
    ].id = 5;
  }
  return gameArray;
}

export function krokodyl(
  gameArray: Card[],
  playedCard: Card,
  setting: boolean,
  p: number
) {
  for (p; p >= 0; p--) {
    if (gameArray[p].id < 10 && gameArray[p].id != 7) {
      gameArray.splice(p, 1);
    } else break;
  }

  if (setting) gameArray.push(playedCard);
  return gameArray;
}

export function hroch(
  gameArray: Card[],
  playedCard: Card,
  setting: boolean,
  p: number
) {
  if (!setting) {
    gameArray.splice(p, 1);
    p--;
  }

  for (p; p >= 0; p--) {
    if (gameArray[p].id >= 11 || gameArray[p].id == 7) {
      p++;
      break;
    }
  }
  if (p < 0) p++;

  let tempArray1 = gameArray.slice(0, p);
  tempArray1.push(playedCard);

  let tempArray2 = gameArray.slice(p, 4);

  gameArray = tempArray1.concat(tempArray2);

  return gameArray;
}

export function lev(gameArray: Card[], playedCard: Card, setting: boolean) {
  if (!setting) gameArray.splice(gameArray.length - 1, 1);

  if (gameArray.findIndex((x) => x.id == 12) != -1) return gameArray;
  gameArray = gameArray.filter((x) => x.id != 4);
  let temp_pole = [playedCard];
  gameArray = temp_pole.concat(gameArray);

  return gameArray;
}
