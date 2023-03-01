export default interface IGame {
  slug: GAMES,
  name: string,
  background: string
}

export enum GAMES {
  SNEK = "snek",
  DEMO = "demo"
}
