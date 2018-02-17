# PokéTypes
[![Build Status](https://travis-ci.org/fbosch/poke-types.svg?branch=master)](https://travis-ci.org/fbosch/poke-types)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![File Size](http://img.badgesize.io/fbosch/poke-types/master/index.js.svg)
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
 their weaknesses, strengths and immunities.
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

## API

### effectiveness: _Object_
| noEffect 	| weak 	| notVeryEffective 	| normal 	| superEffective 	| ultra 	|
|----------	|------	|------------------	|--------	|----------------	|-------	|
| 0 	| 0.25 	| 0.5 	| 1 	| 2 	| 4 	|

### types: _string[]_

| normal | fire | water | electric | grass | ice | fighting | poison | ground |
|--------|----------|-------|----------|-------|--------|----------|--------|--------|
| **flying** | **psychich** | **bug** | **rock** | **ghost** | **dragon** | **dark** | **steel** | **fairy** |

### .getTypeWeaknesses(type: _string_, ?secondType: _string_): Object


#### type
[type](#types-string) name to get weaknesses for


#### secondType
the second [type](#types-string) to get dual [type](#types-string) weaknesses for

```js
pokeTypes.getTypeWeaknesses('grass')
// { normal: 1, fire: 2, water: 0.5, ... }
pokeTypes.getTypeWeaknesses('fire', 'bug')
// { normal: 1, fire: 1, water: 2, ... }
```

### .getTypeStrengths(type: _string_): Object

#### type:
[type](#types-string) name to get type strengths for.

```js
pokeTypes.getTypeStrengths('electric')
// { normal: 1, fire: 1, water: 2, ... }
pokeType.getTypeStrengths('fighting')
// { normal: 2, fire: 1, water: 1, ... }
```


## License
MIT @ [Frederik Bosch](https://github.com/fbosch)
