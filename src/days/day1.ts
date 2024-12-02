import { IDay, IPart } from "../internalTypes"

const part1: IPart = (input) => {
  const {list1, list2} = parseInput(input)

  let sum = list1.reduce((acc, val, i)=> {
    return acc + Math.abs(val - list2[i])
  }, 0)

  return sum
}

const part2: IPart = (input) => {
  const {list1, list2} = parseInput(input)

  let sum = list1.reduce((acc, val, i)=> {
    return acc + (list2.filter(cell=>cell === val).length * val) 
  }, 0)

  return sum
}

const parseInput = (input: string) => {
  const lines = input.split("\n")
  const numbers = lines.map(line => line.split(/\s+/).map(Number))
  const list1 = numbers.map(([a, b]) => a).sort((a, b) => a - b)
  const list2 = numbers.map(([a, b]) => b).sort((a, b) => a - b)

  return {list1, list2}

}

  
export const Day: IDay = {
  part1,
  part2
}

