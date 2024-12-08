import { IDay, IPart } from '../internalTypes';

/*
Some notes from this day: 

There were some interesting rules for the second part. I came upon the efficient solution fairly quickly,
however, it was hard to grab exactly why I was coming up with incorrect answers when submitting. 

The edge cases I ran into
- Do not double-count the obstacle positions
- Do not count the starting position as an obstacle
- you cannot add a new obstacle to a position that has already been visited
- you cannot add a new obstacle to a position that is already an obstacle (duh)

*/

const part1: IPart = (input) => {
  let position: IPosition = {
    x: 0,
    y: 0,
    direction: 'up'
  };

  const map = input.string.split('\n').map((ln, lidx) => ln.split('').map((chr, idx) => {
    if(chr === '^') position = {x: idx, y: lidx, direction: 'up'};
    return chr;
  }));
  const traversedPath = new Set<string>();

  while (isInsideMap(position, map)){
    traversedPath.add(JSON.stringify({x: position.x, y: position.y}));
    try{
      const {pos,turned} = turn(position, map);
      if(turned){
        position = pos;
        continue;
      }
      position = move(position);
    } catch {
      //can break, as the next move will cause the guard to leave
      break;
    }
  }

  return traversedPath.size;

};

const turn = (position: IPosition, map: string[][]): {pos: IPosition, turned: boolean} => {
  switch (position.direction) {
  case 'up':
    if(map[position.y-1][position.x] === '#') return {pos: {x: position.x, y: position.y, direction: 'right'}, turned: true};
    break;

  case 'down':
    if(map[position.y+1][position.x] === '#') return {pos: {x: position.x, y: position.y, direction: 'left'}, turned: true};
    break;

  case 'left':
    if(map[position.y][position.x-1] === '#') return {pos: {x: position.x, y: position.y, direction: 'up'}, turned: true};
    break;

  case 'right':
    if(map[position.y][position.x+1] === '#') return {pos: {x: position.x, y: position.y, direction: 'down'}, turned: true};
    break;
  }
  return {pos: position, turned: false};
};


const move = (position: IPosition): IPosition => {
  switch(position.direction){
  case 'up':
    return {x: position.x, y: position.y - 1, direction: position.direction};
  case 'down':
    return {x: position.x, y: position.y + 1, direction: position.direction};
  case 'left':
    return {x: position.x - 1, y: position.y, direction: position.direction};
  case 'right':
    return {x: position.x + 1, y: position.y, direction: position.direction};
  default:
    return position;
  }  
};


const isInsideMap = (position: IPosition, map: string[][]) => {
  return position.x >= 0 && position.x < map[0].length && position.y >= 0 && position.y < map.length;
};

const part2: IPart = (input) => {

  let position: IPosition = {
    x: 0,
    y: 0,
    direction: 'up'
  };

  const map = input.string.split('\n').map((ln, lidx) => ln.split('').map((chr, idx) => {
    if(chr === '^') position = {x: idx, y: lidx, direction: 'up'};
    return chr;
  }));

  const traversedPath = new Set<string>();

  const validObstacles = new Set<string>();
  validObstacles.add(JSON.stringify({x: position.x, y: position.y}));


  while (isInsideMap(position, map)){
    traversedPath.add(JSON.stringify({x: position.x, y: position.y}));
    try{
      const {pos,turned} = turn(position, map);
      if(turned){
        position = pos;
        continue;
      }
      
      const {isLoop, obstacle} = checkForLoop(position, map, traversedPath);
      if(isLoop) validObstacles.add(JSON.stringify(obstacle));
      position = move(position);
    } catch {
      //can break, as the next move will cause the guard to leave
      break;
    }
  }

  return validObstacles.size - 1;
};


const checkForLoop = (startingPosition: IPosition, map: string[][], traversedPath: Set<string>): {isLoop: boolean, obstacle: Pick<IPosition, 'x' | 'y'> } => {
  const newMap: string[][] = JSON.parse(JSON.stringify(map)); //deep clone this
  const { x, y } = move(startingPosition);
  const locationForNewObstruction = { x, y };
  newMap[y][x] = '#';

  if(traversedPath.has(JSON.stringify(locationForNewObstruction))) return {isLoop: false, obstacle: locationForNewObstruction};

  const previouslyVisited = new Set<string>();
  let position: IPosition = JSON.parse(JSON.stringify(startingPosition));

  while(!isLoop(position, previouslyVisited)) {
    previouslyVisited.add(JSON.stringify(position));
    try {
      const {pos, turned} = turn(position, newMap);
      if(!isInsideMap(position, newMap)) return {isLoop: false, obstacle: locationForNewObstruction};
      if(turned) {
        position = pos;
        continue;
      }
      position = move(position);
    } catch {
      //has fallen off the map
      return {isLoop: false, obstacle: locationForNewObstruction};
    }
  }
  return {isLoop: true, obstacle: locationForNewObstruction};
};


const isLoop =(position: IPosition, previouslyVisited: Set<string>) => {
  return previouslyVisited.has(JSON.stringify(position));
};

export const Day: IDay = {
  part1,
  part2
};

interface IPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
}