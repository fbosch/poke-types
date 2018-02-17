
const { types } = require('./types')
const typeStrengths = require('./strengths')
const { noEffect, weak, notVeryEffective, normal, superEffective, ultra } = require('./effectiveness')

// creates an object with all types with normal type effectivness
const normalizedTypeEffectiveness = types.reduce((values, type) => Object.assign({}, values, { [type]: normal }), {})

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
      case superEffective: return ultra
      case notVeryEffective: return weak
      default: return smallestValue
    }
  }
  if (largestValue === superEffective) {
    switch (smallestValue) {
      case notVeryEffective: return normal
      case normal: return superEffective
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
module.exports.types = types
module.exports.effectiveness = require('./effectiveness')
