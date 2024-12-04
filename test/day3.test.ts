import assert from 'assert';

import { Day } from '../src/days/day3';
import { parseInput } from '../src/utils/input';

const testInput = parseInput('xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))');

describe('Day 3', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(testInput),161);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(parseInput('xmul(2,4)&mul[3,7]!^don\'t()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))')),48);
  });
});