/* eslint-disable */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AOC_SESSION:string;
      AOC_YEAR:string;
    }
  }
}

export {}