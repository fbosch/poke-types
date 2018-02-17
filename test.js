import test from 'ava'
import weaknesses from './weaknesses'
import effectiveness from './effectiveness'
import { types } from './types'
import { getTypeWeaknesses, getTypeStrengths } from './'

test('type weaknesses are generated correctly', assert => types.forEach(type => assert.deepEqual(weaknesses[type], getTypeWeaknesses(type), type)))

test('passing multiplie types in any order to getTypeWeaknesses should result in the same data', assert => {
  assert.deepEqual(getTypeWeaknesses('flying', 'dragon'), getTypeWeaknesses('dragon', 'flying'))
  assert.deepEqual(getTypeWeaknesses('rock', 'fire'), getTypeWeaknesses('fire', 'rock'))
})

test('types can be passsed to getTypeWeaknesses and getTypeStrengths in any casing', assert => {
  assert.truthy(getTypeWeaknesses('fIrE'), 'weaknesses: argument mixed casing')
  assert.truthy(getTypeWeaknesses('GRASS'), 'weaknesses: argument uppercasing')
  assert.truthy(getTypeWeaknesses('ICE', 'fire'), 'weaknesses: multiple arguments in different casing')
  assert.truthy(getTypeWeaknesses('ghost', 'DARK'), 'weaknesses: multiple arguments in different casing')
  assert.truthy(getTypeStrengths('DRAGON'), 'strengths: argument uppercasing')
  assert.truthy(getTypeStrengths('stEEl'), 'strengths: argument mixed casing')
})

test('passing wrong data type to getTypeWeaknesses and getTypeStrengths returns error', assert => {
  assert.throws(() => getTypeWeaknesses(), TypeError)
  assert.throws(() => getTypeWeaknesses(42), TypeError)
  assert.throws(() => getTypeWeaknesses(null), TypeError)
  assert.throws(() => getTypeWeaknesses(undefined), TypeError)
  assert.throws(() => getTypeWeaknesses('soda'), Error)
  assert.throws(() => getTypeStrengths(), TypeError)
  assert.throws(() => getTypeStrengths(42), TypeError)
  assert.throws(() => getTypeStrengths(undefined), TypeError)
  assert.throws(() => getTypeStrengths(null), TypeError)
  assert.throws(() => getTypeStrengths('meme'), Error)
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
  const { ultra } = effectiveness
  assert.true(getTypeWeaknesses('flying', 'dragon').ice === ultra)
  assert.true(getTypeWeaknesses('rock', 'dark').fighting === ultra)
  assert.true(getTypeWeaknesses('ghost', 'psychic').dark === ultra)
  assert.true(getTypeWeaknesses('ground', 'fire').water === ultra)
  assert.true(getTypeWeaknesses('poison', 'fire').ground === ultra)
  assert.true(getTypeWeaknesses('fighting', 'bug').flying === ultra)
})

test('dual type with both sub-types having a 1x weakness modifier results in a 1x modifier', assert => {
  const { normal } = effectiveness
  assert.true(getTypeWeaknesses('normal', 'fire').electric === normal)
  assert.true(getTypeWeaknesses('water', 'grass').fighting === normal)
  assert.true(getTypeWeaknesses('dragon', 'dark').poison === normal)
  assert.true(getTypeWeaknesses('fighting', 'rock').flying === normal)
  assert.true(getTypeWeaknesses('electric', 'bug').water === normal)
})

test('dual type with both sub-types having a 0.5x weakness modifier results in a 0.25x modifier', assert => {
  const { weak } = effectiveness
  assert.true(getTypeWeaknesses('rock', 'steel').normal === weak)
  assert.true(getTypeWeaknesses('psychic', 'flying').fighting === weak)
  assert.true(getTypeWeaknesses('bug', 'poison').grass === weak)
})
