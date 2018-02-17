import { getTypeWeaknesses } from './index'
import { noEffect, notVeryEffective, superEffective, ultra } from './effectiveness'

const abilityEffectiveness = (abilityType, targetType) => {
  switch (getTypeWeaknesses(...targetType)[abilityType]) {
    case noEffect: return 'It has no effect...'
    case notVeryEffective: return 'It\'s not very effective...'
    case superEffective: case ultra: return 'It\'s super effective!'
    default: return ''
  }
}

const attack = pokemon => target => ability => {
  return `
  ${pokemon.name} used ${ability.name}!
            💥
  ${abilityEffectiveness(ability.type, target.type)}
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
