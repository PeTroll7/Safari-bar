import { Component, OnInit } from '@angular/core';
import { Card } from '../game/game.component';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit {
  rules: { card: string; rules: string; show1: string[]; show2: string[] }[] = [
    {
      card: 'skunk1',
      rules:
        'skunk odpudí všechna zvířata dvou nejsilnějších druhů zvířat z řady',
      show1: ['lev4', 'hroch4', 'hroch3', 'zirafa4', 'skunk1'],
      show2: ['zirafa4', 'skunk1'],
    },
    {
      card: 'papousek1',
      rules: 'papoušek vyžene jedno vybrané zvíře z řady',
      show1: ['lev4', 'hroch4', 'papousek1'],
      show2: ['lev4', 'papousek1'],
    },
    {
      card: 'klokan1',
      rules: 'klokan přeskočí jedno nebo dvě vybraná zvířata před sebou',
      show1: ['zebra4', 'opice2', 'had3', 'klokan1'],
      show2: ['zebra4', 'klokan1', 'opice2', 'had3'],
    },
    {
      card: 'opice1',
      rules:
        'samotná opice neudělá nic, ale když do řady vejde každá další opice, tak společně vyhodí lva z řady a od zadu se přesunou do předu',
      show1: ['lev4', 'hroch3', 'opice2', 'opice1'],
      show2: ['opice1', 'opice2', 'hroch3'],
    },
    {
      card: 'chameleon1',
      rules:
        'chameleon na sebe vezme podobu jiného zvířete z řady a vydává se za ně, jakmile ale provede schopnost daného zvířete, je z něj opět chameleon',
      show1: ['papousek4', 'chameleon1'],
      show2: ['chameleon1'],
    },
    {
      card: 'tulen1',
      rules:
        'tuleň otočí pořadí zvířat v řaďe, takže on bude první, první bude poslední, atd.',
      show1: ['lev4', 'hroch3', 'zebra2', 'chameleon1', 'tulen1'],
      show2: ['tulen1', 'chameleon1', 'zebra2', 'hroch3', 'lev4'],
    },
    {
      card: 'zebra1',
      rules:
        'zebra při vstoupení do řady nic neudělá, ale zastaví se o ni hroch a krokodýl',
      show1: ['lev4', 'chameleon3', 'zebra1'],
      show2: ['lev4', 'chameleon3', 'zebra1', 'hroch2', 'krokodyl4'],
    },
    {
      card: 'zirafa1',
      rules:
        'žirafa při vstoupení do řady nic neudělá, ale při každém dalším položení karty, předběhne jednu slabší kartu před sebou',
      show1: ['lev4', 'chameleon3', 'zebra4', 'zirafa1'],
      show2: ['lev4', 'chameleon3', 'zirafa1', 'zebra4', 'zebra2'],
    },
    {
      card: 'had1',
      rules:
        'had srovná řadu podle síly zvířat, nejsilnější bude první a nejslabší bude poslední',
      show1: ['zirafa2', 'chameleon3', 'zebra3', 'lev4', 'had1'],
      show2: ['lev4', 'had1', 'zirafa2', 'zebra3', 'chameleon3'],
    },
    {
      card: 'krokodyl1',
      rules: 'krokodýl sežere slabší karty před sebou, ale zastaví se o zebru',
      show1: ['had4', 'zebra3', 'klokan2', 'chameleon3', 'krokodyl1'],
      show2: ['had4', 'zebra3', 'krokodyl1'],
    },
    {
      card: 'hroch1',
      rules: 'hroch předběhne slabší karty před sebou, ale zastaví se o zebru',
      show1: ['had4', 'zebra3', 'klokan2', 'chameleon3', 'hroch1'],
      show2: ['had4', 'zebra3', 'hroch1', 'klokan2', 'chameleon3'],
    },
    {
      card: 'lev1',
      rules:
        'lev je král zvířat, proto si stoupne na první místo v řadě a vyhodí z ní všechny opice, ale pokud už v řadě nějaký lev je, tak nový lev ihned odejde',
      show1: ['had4', 'opice2', 'zebra3', 'lev1'],
      show2: ['lev1', 'had4', 'zebra3'],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
