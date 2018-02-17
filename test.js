import test from 'ava'
import weaknesses from './fixtures/weaknesses'
import { getTypeWeaknesses, effectiveness, getTypeStrengths } from './'
import types from './types'

test('type weaknesses are generated correctly', assert => types.forEach(type => assert.deepEqual(weaknesses[type], getTypeWeaknesses(type), type)))

test('passing multiplie types in any order to getTypeWeaknesses should result in the same data', assert => {
  assert.deepEqual(getTypeWeaknesses('flying', 'dragon'), getTypeWeaknesses('dragon', 'flying'))
  assert.deepEqual(getTypeWeaknesses('rock', 'fire'), getTypeWeaknesses('fire', 'rock'))
})

test('types can be passsed to getTypeWeaknesses and getTypeStrengths in any casing', assert => {
  assert.truthy(getTypeWeaknesses('fIrE'), 'weaknsseses: argument mixed casing')
  assert.truthy(getTypeWeaknesses('GRASS'), 'weaknesses: argument uppercasing')
  assert.truthy(getTypeWeaknesses('ICE', 'fire'), 'weaknesses: multiple arguments in different casing')
  assert.truthy(getTypeWeaknesses('ghost', 'DARK'), 'weaknsesses: multiple arguments in different casing')
  assert.truthy(getTypeStrengths('DRAGON'), 'strengths: argument uppercasing')
  assert.truthy(getTypeStrengths('stEEl'), 'strengths: argument mixed casing')
})

test('passing wrong data type to getTypeWeaknesses and getTypeStrengths returns error', assert => {
  assert.throws(() => getTypeWeaknesses(), TypeError)
  assert.throws(() => getTypeWeaknesses(42), TypeError)
  assert.throws(() => getTypeWeaknesses(null), TypeError)
  assert.throws(() => getTypeWeaknesses(undefined), TypeError)
  assert.throws(() => getTypeWeaknesses('lizard'), Error)
  assert.throws(() => getTypeStrengths(), TypeError)
  assert.throws(() => getTypeStrengths(42), TypeError)
  assert.throws(() => getTypeStrengths(undefined), TypeError)
  assert.throws(() => getTypeStrengths(null), TypeError)
  assert.throws(() => getTypeStrengths('firea'), Error)
})

test('dual type with one sub-type having a 1x weakness modifier and the other having a 2x modifier results in a 2x modifier', assert => {
  const { superEffective } = effectiveness
  assert.true(getTypeWeaknesses('ground', 'fire').ground === superEffective)
  assert.true(getTypeWeaknesses('poison', 'ice').fire === superEffective)
  assert.true(getTypeWeaknesses('fighting', 'rock').grass === superEffective)
  assert.true(getTypeWeaknesses('ice', 'flying').electric === superEffective)
  assert.true(getTypeWeaknesses('water', 'grass').bug === superEffective)
})

test('dual type with both sub-types having a 2x weakness modifier results in a 4x modifier', assert => {
  const { ultraEffective } = effectiveness
  assert.true(getTypeWeaknesses('flying', 'dragon').ice === ultraEffective)
  assert.true(getTypeWeaknesses('rock', 'dark').fighting === ultraEffective)
  assert.true(getTypeWeaknesses('ghost', 'psychic').dark === ultraEffective)
  assert.true(getTypeWeaknesses('ground', 'fire').water === ultraEffective)
  assert.true(getTypeWeaknesses('poison', 'fire').ground === ultraEffective)
  assert.true(getTypeWeaknesses('fighting', 'bug').flying === ultraEffective)
})

test('dual type with both sub-types having a 1x weakness modifier results in a 1x modifier', assert => {
  const { normalEffectiveness } = effectiveness
  assert.true(getTypeWeaknesses('normal', 'fire').electric === normalEffectiveness)
  assert.true(getTypeWeaknesses('water', 'grass').fighting === normalEffectiveness)
  assert.true(getTypeWeaknesses('dragon', 'dark').poison === normalEffectiveness)
  assert.true(getTypeWeaknesses('fighting', 'rock').flying === normalEffectiveness)
  assert.true(getTypeWeaknesses('electric', 'bug').water === normalEffectiveness)
})

test('dual type with both sub-types having a 0.5x weakness modifier results in a 0.25x modifier', assert => {
  const { weakEffectiveness } = effectiveness
  assert.true(getTypeWeaknesses('rock', 'steel').normal === weakEffectiveness)
  assert.true(getTypeWeaknesses('psychic', 'flying').fighting === weakEffectiveness)
  assert.true(getTypeWeaknesses('bug', 'poison').grass === weakEffectiveness)
})
