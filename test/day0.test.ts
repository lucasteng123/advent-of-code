import assert from 'assert';

import { Day } from '../src/days/day0';
import { parseInput } from '../src/utils/input';

const testInput = parseInput(`
`);
describe('Day 0', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(testInput),'');
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(testInput),'');
  });
});