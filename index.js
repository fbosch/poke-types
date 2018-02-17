
const types = require('./types')
const typesObject = types.reduce((accum, type) => Object.assign({}, accum, { [type]: type }), {})
const { normal, fire, water, electric, grass, ice, fighting, poison, ground, flying, psychic, bug, rock, ghost, dragon, dark, steel, fairy } = typesObject

const noEffect = 0 // It has no effect...
const weakEffectiveness = 0.25 // It's not very effective
const notVeryEffective = 0.5 // It's not very effective
const normalEffectiveness = 1
const superEffective = 2 // It's super effective!
const ultraEffective = 4 // It's super effective!

// all type strengths that are not normal in effectiveness
const typeStrengths = {
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
    [flying]: notVeryEffective,
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
    [ghost]: superEffective
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

// creates an object with all types with normal type effectivness
const normalizedTypeEffectiveness = types.reduce((values, type) => Object.assign({}, values, { [type]: normalEffectiveness }), {})

// a chart object with empty values
const emptyTypeChart = types.reduce((chart, type) => Object.assign({}, chart, { [type]: normalizedTypeEffectiveness }), {})

// creates new chart with values declared 'typeStrengths' overriding the normal values in the empty chart
const typeChart = types.reduce((chart, type) => Object.assign({}, chart, { [type]: Object.assign({}, emptyTypeChart[type], typeStrengths[type]) }), {})

// extracts weaknesses of a given type from the 'typeChart'
const extractTypeWeaknesses = type => types.reduce((weaknesses, otherType) => Object.assign({}, weaknesses, { [otherType]: typeChart[otherType][type] }), {})

// all type weaknesess
const typeWeaknesses = types.reduce((weaknesses, type) => Object.assign({}, weaknesses, { [type]: extractTypeWeaknesses(type) }), {})

// returns the correct dual type weakness value based on the given types weaknesses
const getDualTypeWeakness = (firstWeakness, secondWeakness) => {
  const difference = Math.abs(firstWeakness - secondWeakness)
  const smallestValue = firstWeakness < secondWeakness ? firstWeakness : secondWeakness
  const largestValue = firstWeakness > secondWeakness ? firstWeakness : secondWeakness

  if (difference === 0) {
    switch (smallestValue) {
      case superEffective: return ultraEffective
      case notVeryEffective: return weakEffectiveness
      default: return smallestValue
    }
  }
  if (largestValue === superEffective) {
    switch (smallestValue) {
      case notVeryEffective: return normalEffectiveness
      case normalEffectiveness: return superEffective
    }
  }
  switch (smallestValue) {
    case noEffect: return noEffect
    case notVeryEffective: return notVeryEffective
  }
}

const getTypeWeaknesses = (firstType, secondType) => {
  if (firstType && !secondType) return typeWeaknesses[firstType]
  const firstTypeWeaknesses = getTypeWeaknesses(firstType)
  const secondTypeWeaknesses = getTypeWeaknesses(secondType)
  const dualTypeWeaknesses = types.reduce((weaknesses, type) => {
    const firstWeakness = firstTypeWeaknesses[type]
    const secondWeakness = secondTypeWeaknesses[type]
    return Object.assign({}, weaknesses, { [type]: getDualTypeWeakness(firstWeakness, secondWeakness) })
  }, {})
  return dualTypeWeaknesses
}

/** returns the strengths a given type has agains */
const getTypeStrengths = type => typeChart[type]

const validateType = value => func => {
  if (!value) throw new TypeError('Pokémon Types: missing argument')
  const checkType = type => {
    if (typeof type !== 'string') throw new TypeError('Pokémon Types: The given type "' + type + '" is not a string')
    const lowerCaseType = type.toLowerCase()
    if (types.indexOf(lowerCaseType) === -1) throw new Error('Pokémon Types: the given type "' + type + '" does not exist!')
    return lowerCaseType
  }
  if (Array.isArray(value)) {
    const formattedTypes = value.filter(type => type).map(checkType)
    if (!formattedTypes.length) throw new TypeError('Pokémon Types: invalid arguments')
    return func(...formattedTypes)
  }
  return func(checkType(value))
}

module.exports.getTypeWeaknesses = (firstType, secondType) => validateType([firstType, secondType])(getTypeWeaknesses)
module.exports.getTypeStrengths = type => validateType(type)(getTypeStrengths)
module.exports.typeChart = typeChart
module.exports.types = types
module.exports.typesObject = typesObject
module.exports.effectiveness = {
  noEffect,
  weakEffectiveness,
  notVeryEffective,
  normalEffectiveness,
  superEffective,
  ultraEffective
}
