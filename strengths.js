const { typesObject } = require('./types')
const { normal, fire, water, electric, grass, ice, fighting, poison, ground, flying, psychic, bug, rock, ghost, dragon, dark, steel, fairy } = typesObject
const { noEffect, notVeryEffective, superEffective } = require('./effectiveness')

// all type strengths that are not normal in effectiveness
module.exports = {
  [normal]: {
    [rock]: notVeryEffective,
    [steel]: notVeryEffective,
    [ghost]: noEffect
  },
  [fire]: {
    [fire]: notVeryEffective,
    [water]: notVeryEffective,
    [grass]: superEffective,
    [ice]: superEffective,
    [bug]: superEffective,
    [rock]: notVeryEffective,
    [dragon]: notVeryEffective,
    [steel]: superEffective
  },
  [water]: {
    [fire]: superEffective,
    [water]: notVeryEffective,
    [grass]: notVeryEffective,
    [ground]: superEffective,
    [rock]: superEffective,
    [dragon]: notVeryEffective
  },
  [electric]: {
    [water]: superEffective,
    [electric]: notVeryEffective,
    [grass]: notVeryEffective,
    [ground]: noEffect,
    [flying]: superEffective,
    [dragon]: notVeryEffective
  },
  [grass]: {
    [fire]: notVeryEffective,
    [water]: superEffective,
    [grass]: notVeryEffective,
    [poison]: notVeryEffective,
    [ground]: superEffective,
    [flying]: notVeryEffective,
    [bug]: notVeryEffective,
    [rock]: superEffective,
    [dragon]: notVeryEffective,
    [steel]: notVeryEffective
  },
  [ice]: {
    [fire]: notVeryEffective,
    [water]: notVeryEffective,
    [grass]: superEffective,
    [ice]: notVeryEffective,
    [ground]: superEffective,
    [flying]: superEffective,
    [dragon]: superEffective,
    [steel]: notVeryEffective
  },
  [fighting]: {
    [normal]: superEffective,
    [ice]: superEffective,
    [poison]: notVeryEffective,
    [flying]: notVeryEffective,
    [psychic]: notVeryEffective,
    [bug]: notVeryEffective,
    [rock]: superEffective,
    [ghost]: noEffect,
    [dark]: superEffective,
    [steel]: superEffective,
    [fairy]: notVeryEffective
  },
  [poison]: {
    [grass]: superEffective,
    [poison]: notVeryEffective,
    [ground]: notVeryEffective,
    [rock]: notVeryEffective,
    [ghost]: notVeryEffective,
    [steel]: noEffect,
    [fairy]: superEffective
  },
  [ground]: {
    [fire]: superEffective,
    [electric]: superEffective,
    [grass]: notVeryEffective,
    [poison]: superEffective,
    [flying]: noEffect,
    [bug]: notVeryEffective,
    [rock]: superEffective,
    [steel]: superEffective
  },
  [flying]: {
    [electric]: notVeryEffective,
    [grass]: superEffective,
    [fighting]: superEffective,
    [bug]: superEffective,
    [rock]: notVeryEffective,
    [steel]: notVeryEffective
  },
  [psychic]: {
    [fighting]: superEffective,
    [poison]: superEffective,
    [psychic]: notVeryEffective,
    [dark]: noEffect,
    [steel]: notVeryEffective
  },
  [bug]: {
    [fire]: notVeryEffective,
    [grass]: superEffective,
    [fighting]: notVeryEffective,
    [poison]: notVeryEffective,
    [flying]: notVeryEffective,
    [psychic]: superEffective,
    [ghost]: notVeryEffective,
    [dark]: superEffective,
    [steel]: notVeryEffective,
    [fairy]: notVeryEffective
  },
  [rock]: {
    [fire]: superEffective,
    [ice]: superEffective,
    [fighting]: notVeryEffective,
    [ground]: notVeryEffective,
    [flying]: superEffective,
    [bug]: superEffective,
    [steel]: notVeryEffective
  },
  [ghost]: {
    [normal]: noEffect,
    [psychic]: superEffective,
    [ghost]: superEffective,
    [dark]: notVeryEffective
  },
  [dragon]: {
    [dragon]: superEffective,
    [steel]: notVeryEffective,
    [fairy]: noEffect
  },
  [dark]: {
    [fighting]: notVeryEffective,
    [psychic]: superEffective,
    [ghost]: superEffective,
    [dark]: notVeryEffective,
    [fairy]: notVeryEffective
  },
  [steel]: {
    [fire]: notVeryEffective,
    [water]: notVeryEffective,
    [electric]: notVeryEffective,
    [ice]: superEffective,
    [rock]: superEffective,
    [steel]: notVeryEffective,
    [fairy]: superEffective
  },
  [fairy]: {
    [fire]: notVeryEffective,
    [fighting]: superEffective,
    [poison]: notVeryEffective,
    [dragon]: superEffective,
    [dark]: superEffective,
    [steel]: notVeryEffective
  }
}
