# PokéTypes
[![Build Status](https://travis-ci.org/fbosch/poke-types.svg?branch=master)](https://travis-ci.org/fbosch/poke-types)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Dependency Status](https://www.versioneye.com/user/projects/5a88463c0fb24f3ee283becc/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/5a88463c0fb24f3ee283becc)
[![Known Vulnerabilities](https://snyk.io/test/github/fbosch/poke-types/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fbosch/poke-types?targetFile=package.json)
---
<p align="center">
  <br/>
  <img width="64" height="64" src="https://github.com/fbosch/pokemon-types/raw/master/assets/icon-fire.png">
  <img width="64" height="64" src="https://github.com/fbosch/pokemon-types/raw/master/assets/icon-water.png">
  <img width="64" height="64" src="https://github.com/fbosch/pokemon-types/raw/master/assets/icon-grass.png" >
</p>
<p align="center">
A module that exposes all Pokémon types —
<br/>
and their weaknesses, strengths and immunities.
</p>

## Install
Yarn:
```sh
$ yarn add poke-types
```
NPM:
```sh
npm install --save poke-types
```

## Usage
```js
import { getTypeWeaknesses } from 'poke-types'
import { noEffect, notVeryEffective, superEffective, ultraEffective } from 'poke-types/effectiveness'

const abilityEffectiveness = (targetType, abilityType) => {
  switch (getTypeWeaknesses(...targetType)[abilityType]) {
    case noEffect: return 'It has no effect...'
    case notVeryEffective: return 'It\'s not very effective...'
    case superEffective: case ultraEffective: return 'It\'s super effective!'
  }
}

const attack = pokemon => target => ability => {
  return `
  ${pokemon.name} used ${ability.name}!
            💥
  ${abilityEffectiveness(target.type, ability.type)}
  `
}

const pikachu = {
  name: 'Pikachu',
  type: 'electric',
  abilities: {
    thunderbolt: {
      name: 'Thunderbolt',
      type: 'electric'
    }
  },
  attack: target => ability => attack(pikachu)(target)(pikachu.abilities[ability])
}

const gyarados = {
  name: 'Gyrados',
  type: ['water', 'flying']
}

console.log(pikachu.attack(gyarados)('thunderbolt'))
// ​​​​​ Pikachu used Thunderbolt!
// ​​​​​           💥
// ​​​​​ It's super effective!

```
