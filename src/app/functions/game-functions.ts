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

/*export function toggleButtonsOff(
  b1: HTMLElement,
  b2: HTMLElement,
  b3: HTMLElement,
  b4: HTMLElement,
  div1: HTMLElement,
  div2: HTMLElement,
  div3: HTMLElement,
  div4: HTMLElement,
  index: number,
  hand: Card[],
  gameArray: Card[],
  bar: Card[],
  trash: Card[]
) {
  b1.removeEventListener('click', () =>
    clicked(hand[0], 0, gameArray, bar, trash)
  );
  b2.removeEventListener('click', () =>
    clicked(hand[1], 1, gameArray, bar, trash)
  );
  b3.removeEventListener('click', () =>
    clicked(hand[2], 2, gameArray, bar, trash)
  );
  b4.removeEventListener('click', () =>
    clicked(hand[3], 3, gameArray, bar, trash)
  );
  switch (
    index // for - funkce do pole až do indexu
  ) {
    case 1: {
      div1.addEventListener('click', div1Func);
      break;
    }
    case 2: {
      div1.addEventListener('click', div1Func);
      div2.addEventListener('click', div2Func);
      break;
    }
    case 3: {
      div1.addEventListener('click', div1Func);
      div2.addEventListener('click', div2Func);
      div3.addEventListener('click', div3Func);
      break;
    }
    case 4: {
      div1.addEventListener('click', div1Func);
      div2.addEventListener('click', div2Func);
      div3.addEventListener('click', div3Func);
      div4.addEventListener('click', div4Func);
      break;
    }
  }
}

export function m() {
  console.log('ano');
}

function addEventLis(button: HTMLElement | null) {
  button?.addEventListener('click', m);
}

export function toggleButtonsOn(
  b1: HTMLElement,
  b2: HTMLElement,
  b3: HTMLElement,
  b4: HTMLElement,
  div1: HTMLElement,
  div2: HTMLElement,
  div3: HTMLElement,
  div4: HTMLElement,
  index: number,
  hand: Card[],
  gameArray: Card[],
  bar: Card[],
  trash: Card[]
) {
  b1.addEventListener('click', () =>
    clicked(hand[0], 0, gameArray, bar, trash)
  );
  b2.addEventListener('click', () =>
    clicked(hand[1], 1, gameArray, bar, trash)
  );
  b3.addEventListener('click', () =>
    clicked(hand[2], 2, gameArray, bar, trash)
  );
  b4.addEventListener('click', () =>
    clicked(hand[3], 3, gameArray, bar, trash)
  );

  switch (index) {
    case 1: {
      div1.removeEventListener('click', div1Func);
      break;
    }
    case 2: {
      div1.removeEventListener('click', div1Func);
      div2.removeEventListener('click', div2Func);
      break;
    }
    case 3: {
      div1.removeEventListener('click', div1Func);
      div2.removeEventListener('click', div2Func);
      div3.removeEventListener('click', div3Func);
      break;
    }
    case 4: {
      div1.removeEventListener('click', div1Func);
      div2.removeEventListener('click', div2Func);
      div3.removeEventListener('click', div3Func);
      div4.removeEventListener('click', div4Func);
    }
  }
}

export function div1Func(
  playedCard: Card,
  chameleonCard: number,
  index: number,
  gameArray: Card[]
) {
  if (playedCard.id === 2 || chameleonCard === 2) {
    console.log(1);
    animals.papousekSecond(gameArray, 0);
  } else if (
    (playedCard.id == 3 && index <= 3) ||
    (chameleonCard === 3 && index <= 3)
  ) {
    console.log(2);
    animals.klokanSecond(0);
  } else if (
    (playedCard.id == 5 || chameleonCard === 2) &&
    chameleonCard != 3
  ) {
    console.log(3);
    animals.chameleonSecond(0);
  }
}

export function div2Func(
  playedCard: Card,
  chameleonCard: number,
  index: number,
  gameArray: Card[]
) {
  if (playedCard.id === 2 || chameleonCard === 2) {
    console.log(1);
    animals.papousekSecond(gameArray, 1);
  } else if (
    (playedCard.id == 3 && index <= 4) ||
    (chameleonCard === 3 && index <= 4)
  ) {
    console.log(2);
    animals.klokanSecond(1);
  } else if (playedCard.id == 5 || chameleonCard === 5) {
    console.log(3);
    animals.chameleonSecond(1);
  }
}

export function div3Func(
  playedCard: Card,
  chameleonCard: number,
  index: number,
  gameArray: Card[]
) {
  if (playedCard.id === 2 || chameleonCard === 2) {
    console.log(1);
    animals.papousekSecond(gameArray, 2);
  } else if (
    (playedCard.id == 3 && index <= 5) ||
    (chameleonCard === 3 && index <= 5)
  ) {
    console.log(2);
    animals.klokanSecond(2);
  } else if (playedCard.id == 5 || chameleonCard === 5) {
    console.log(3);
    animals.chameleonSecond(2);
  }
}

export function div4Func(
  playedCard: Card,
  chameleonCard: number,
  index: number,
  gameArray: Card[]
) {
  if (playedCard.id === 2 || chameleonCard === 2) {
    animals.papousekSecond(gameArray, 3);
  } else if (playedCard.id == 3 || chameleonCard === 3) {
    animals.klokanSecond(3);
  } else if (playedCard.id == 5 || chameleonCard === 5) {
    animals.chameleonSecond(3);
  }
}*/

export function vyhodnot(gameArray: Card[], bar: Card[], trash: Card[]) {
  bar.push(gameArray[0]);
  bar.push(gameArray[1]);
  trash.push(gameArray[4]);

  gameArray = [gameArray[2], gameArray[3]];

  return [gameArray, bar, trash];
}

export function vyhodnoceniTahu(
  setting: number,
  gameArray: Card[],
  index: number,
  arrayId: number,

  div1: HTMLElement,
  div2: HTMLElement,
  div3: HTMLElement,
  div4: HTMLElement,
  div5: HTMLElement,
  button1: HTMLElement,
  button2: HTMLElement,
  button3: HTMLElement,
  button4: HTMLElement,
  hand: Card[],

  bar: Card[],
  trash: Card[],
  countHand: number
) {
  div1.textContent = gameArray[0]?.id.toString();
  div2.textContent = gameArray[1]?.id.toString();
  div3.textContent = gameArray[2]?.id.toString();
  div4.textContent = gameArray[3]?.id.toString();
  div5.textContent = gameArray[4]?.id.toString();

  if (setting == 0) {
    hand.splice(arrayId, 1);
    countHand--;
  }

  if (hand.length === 0) {
    if (index == 5) {
      vyhodnot(bar, trash, gameArray);
    }
    //end();
  }
  button1.textContent = hand[0]?.id.toString() || 'out of stock';
  button2.textContent = hand[1]?.id.toString() || 'out of stock';
  button3.textContent = hand[2]?.id.toString() || 'out of stock';
  button4.textContent = hand[3]?.id.toString() || 'out of stock';

  /*switch (countRuka) {
    case 3: {
      button4.removeEventListener('click', but4);
      break;
    }
    case 2: {
      button3.removeEventListener('click', but3);
      break;
    }
    case 1: {
      button2.removeEventListener('click', but2);
      break;
    }
    case 0: {
      button1.removeEventListener('click', but1);
      break;
    }
  }*/
}

//◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
//-----------------------------------------------------------CLICKED----------------------------------------------
//◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

export function clicked(
  card: Card,
  //arrayId: number,
  gameArray: Card[],
  bar: Card[],
  trash: Card[],
  div: (HTMLElement | null)[]
) {
  let pozice;
  let playedCard = card;
  switch (playedCard.id) {
    case 1: {
      gameArray = animals.skunk(gameArray, playedCard);

      if (gameArray.length == 5) {
        vyhodnot(bar, trash, gameArray);
      }
      break;
    }
    case 2: {
      gameArray = animals.papousekFirst(gameArray, playedCard);

      if (gameArray.length == 5) {
        vyhodnot(bar, trash, gameArray);
      }
      break;
    }
    case 3: {
      //pozice = klokanFirst();

      //gameArray = animals.papousekFirst(gameArray, playedCard);

      break;
    }
    case 4: {
      gameArray = animals.opice(gameArray, playedCard);

      if (gameArray.length == 5) {
        vyhodnot(bar, trash, gameArray);
      }
      break;
    }
    case 5: {
      gameArray = animals.chameleonFirst(gameArray, playedCard);

      if (gameArray.length == 5) {
        vyhodnot(bar, trash, gameArray);
      }
      break;
    }
    case 6: {
      gameArray = animals.tulen(gameArray, playedCard);

      if (gameArray.length == 5) {
        vyhodnot(bar, trash, gameArray);
      }
      break;
    }
    case 7: {
      gameArray = animals.zebra(gameArray, playedCard);

      if (gameArray.length == 5) {
        vyhodnot(bar, trash, gameArray);
      }
      break;
    }
    case 8: {
      gameArray = animals.zirafa(gameArray, playedCard);

      if (gameArray.length == 5) {
        vyhodnot(bar, trash, gameArray);
      }
      break;
    }
    case 9: {
      gameArray = animals.had(gameArray, playedCard);

      if (gameArray.length == 5) {
        vyhodnot(bar, trash, gameArray);
      }
      break;
    }
    case 10: {
      gameArray = animals.krokodyl(gameArray, playedCard);

      if (gameArray.length == 5) {
        vyhodnot(bar, trash, gameArray);
      }
      break;
    }
    case 11: {
      gameArray = animals.hroch(gameArray, playedCard);

      if (gameArray.length == 5) {
        vyhodnot(bar, trash, gameArray);
      }
      break;
    }
    case 12: {
      gameArray = animals.lev(gameArray, playedCard);

      if (gameArray.length == 5) {
        vyhodnot(bar, trash, gameArray);
      }
      break;
    }
    default: {
      //provede se funkce clicked bez položení karty
    }
  }
  //vyhodnoceniTahu(0, arrayId);
  //return gameArray;
}
