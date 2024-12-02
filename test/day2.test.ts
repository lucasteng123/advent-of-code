import assert from 'assert';

import { Day } from '../src/days/day2';

const testinput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

describe('Day 2', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(testinput),2);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(testinput),4);
  });
});