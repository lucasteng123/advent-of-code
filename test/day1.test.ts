import assert from 'assert';

import { Day } from '../src/days/day1';
import { parseInput } from '../src/utils/input';

const testinput = parseInput(`3   4
4   3
2   5
1   3
3   9
3   3`);

describe('Day 1', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(testinput),11);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(testinput),31);
  });
});