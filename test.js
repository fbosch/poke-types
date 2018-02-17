import test from 'ava'
import shallowEqualObjects from 'shallow-equal/objects'
import weaknesses from './fixtures/weaknesses'
import { getTypeWeaknesses, effectiveness } from './'
import types from './types'

test('type weaknesses are generated correctly', assert => types.forEach(type => assert.true(shallowEqualObjects(getTypeWeaknesses(type), weaknesses[type]))))

test('dual type with both types having a 2x strength modifier results in a 4x modifier', assert => assert.true(getTypeWeaknesses('flying', 'dragon').ice === effectiveness.ultraEffective))
