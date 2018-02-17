const types = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy'
]

const typesObject = types.reduce((accum, type) => Object.assign({}, accum, { [type]: type }), {})

module.exports.types = types
module.exports.typesObject = typesObject
