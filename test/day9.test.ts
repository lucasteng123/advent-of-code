import assert from 'assert';

import { Day } from '../src/days/day9';
import { parseInput } from '../src/utils/input';

const testInput = parseInput('2333133121414131402');

describe('Day 9', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(testInput),1928);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(testInput),2858);
  });
});