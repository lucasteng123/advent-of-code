import { AOCInput } from './utils/input';

export type IPart = (input: AOCInput) => string | number | Promise<string | number>;

export type IDay =  {
  part1: IPart
  part2: IPart
}