import { IDay, IPart } from '../internalTypes';

const part1: IPart = (input) => {
  const corruptedMemory  = input.string;

  const instructions = corruptedMemory.matchAll(/mul\((\d+),(\d+)\)/g);
  let memory = 0;
  for (const instruction of instructions) {
    memory += parseInt(instruction[1]) * parseInt(instruction[2]);
  }

  return memory;
};

const part2: IPart = (input) => {
  const corruptedMemory  = input.string;
  let enabled = true;

  let accumulator = 0;
  
  const parsedInstructions = corruptedMemory.matchAll(/(?<enable>do\(\)|don't\(\))|(?<command>mul\(\d+,\d+\))/g);

  for (const instruction of parsedInstructions) {
    if (instruction.groups?.enable) {
      enabled = instruction.groups.enable === 'do()';

    } else if (instruction.groups?.command && enabled) {
      const [a, b] = instruction.groups.command.match(/\d+/g)!.map(Number);
      accumulator += a * b;
    }
  }
  
  return accumulator;
};

export const Day: IDay = {
  part1,
  part2
};

