# PokéTypes

<p align="center">
  <img width="64" height="64" src="https://github.com/fbosch/pokemon-types/raw/master/assets/icon-fire.png">
  <img width="64" height="64" src="https://github.com/fbosch/pokemon-types/raw/master/assets/icon-water.png">
  <img width="64" height="64" src="https://github.com/fbosch/pokemon-types/raw/master/assets/icon-grass.png" >
</p>
<p align="center">
A module that exposes all Pokémon types and their weaknesses, strengths and immunities.
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
    case noEffect: return 'It has not effect...'
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
