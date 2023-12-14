

class AOCInput {
  inputString: string;
  constructor(input: string){
    this.inputString = input;
  }

  toLines(chr:string = '\n') {
    return this.inputString.split(chr);
  }

  toLinesAsNumberArray() {
    return this.inputString.split('\n').map(line=>line.split(' ').map(chr => Number(chr)));
  }
  
  toLinesAsStringArray() {
    return this.inputString.split('\n').map(ln=>ln.split(''));
  }
}


export const parseInput = (input: string)=>{
  return new AOCInput(input);
};