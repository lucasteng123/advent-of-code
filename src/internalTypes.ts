export type IPart = (input: string) => string

export type IDay =  {
  part1: IPart
  part2: IPart
}