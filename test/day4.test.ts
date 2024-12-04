import assert from 'assert';

import { Day } from '../src/days/day4';
import { parseInput } from '../src/utils/input';

const testInput = parseInput(`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`);

describe.only('Day 4', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(testInput),18);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(testInput),9);
  });
});