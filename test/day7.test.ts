import assert from 'assert';

import { Day } from '../src/days/day7';
import { parseInput } from '../src/utils/input';

const testInput = parseInput(`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`);

describe('Day 7', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(testInput),3749);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(testInput),11387);
  });
});