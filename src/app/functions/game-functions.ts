import { Card } from '../game/game.component';
import * as animals from './animals';

export function shuffle(array: Card[]) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function obshuje4(size: number, gameArray: Card[]) {
  for (let j = 0; j < size; j++) {
    if (gameArray[j].id == 4) return true;
  }
  return false;
}

export function containsOnlyCham(gameArray: Card[]): boolean {
  for (let i = 0; i < gameArray.length; i++) {
    if (gameArray[i].id != 5) return false;
  }
  return true;
}

export function vyhodnot(gameArray: Card[], bar: Card[], trash: Card[]) {
  bar.push(gameArray[0]);
  bar.push(gameArray[1]);
  trash.push(gameArray[4]);

  console.log(gameArray);

  gameArray = [gameArray[2], gameArray[3]];

  return [gameArray, bar, trash];
}

export function divFunc(
  gameArray: Card[],
  playedCard: Card,
  chameleonCard: { id: number; name: string },
  buttonId: number
) {
  let temp = {
    gameArray: gameArray,
    chameleonCard: { id: 0, name: '' },
    isNeed: true,
    logMessage: '',
  };
  let valid = true;
  if (playedCard?.id === 2 || chameleonCard.id === 2) {
    gameArray = animals.papousekSecond(buttonId, gameArray);
    chameleonCard.id = 0;
    chameleonCard.name = 'papousek';

    if (playedCard.id == 2) temp.logMessage = 'paposek vyhodil zvíře';
  } else if (
    (playedCard?.id == 3 && gameArray.length <= buttonId + 3) ||
    (chameleonCard.id === 3 && gameArray.length <= buttonId + 3)
  ) {
    gameArray = animals.klokanSecond(buttonId, gameArray, playedCard!);
    chameleonCard.id = 0;
    chameleonCard.name = 'klokan';
    valid = true;
    if (playedCard.id == 3) temp.logMessage = 'klokan přeskočil zvíře';
  } else if (playedCard?.id == 5 && chameleonCard.id != 3) {
    temp = animals.chameleonSecond(buttonId, gameArray, playedCard);
    if (temp.isNeed) {
    } else {
      gameArray = temp.gameArray;
    }
  } else {
    valid = false;
  }
  return {
    gameArray: gameArray,
    chameleonCard: temp.chameleonCard,
    valid: valid,
    logMessage: temp.logMessage,
  };
}
