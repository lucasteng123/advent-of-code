import assert from 'assert';

import { Day } from '../src/days/day5';
import { parseInput } from '../src/utils/input';

const testInput = parseInput(`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`);

describe.only('Day 5', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(testInput),143);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(testInput),123);
  });
});