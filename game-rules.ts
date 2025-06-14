// Copyright (c) 2025 Kevin Damm
// MIT License
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// github:KevinDamm/tic-tac-total-recall/game-outcome.ts

import { CardFront, Deck } from './cards-xo'
import { CardBoard3x3, BoardCoord } from './cardboard'


export interface PlayerRole {
  username: string
  showname: string
  rolename: string
}

export interface GameState {
  board: CardBoard3x3
  deck: Deck
  history: Action[]
}

export interface GameRules {
  roles(): (PlayerRole | undefined)[]
  init(): GameState
  actions(state: GameState): Action[]
  legal(state: GameState, action: Action): boolean
  next(state: GameState, turn: Action[]): GameState
  terminal(state: GameState): boolean
  goal(state: GameState): boolean
}

export interface GameOutcome {
  endgame: GameState
  outcome:
    | { type: 'win', lines: number[] }
    | { type: 'loss', line: number[] }
    | { type: 'unk' }
}

export type Action =
  | { type: 'deal',
      row: number,
      col: number,
    }
  | { type: 'move',
      from: BoardCoord,
      onto: BoardCoord,
    }
  | { type: 'reveal',
      selection: BoardCoord[],
    }
  | {
      type: 'wager',
      amount: number,
    }
  | { type: 'fold' }
  | { type: 'resign' }


// This follows the basic GEL protocol but was only partially compiled from GEL,
// By evaluating the API in a bespoke version that follows the interpretation of
// GEL's init -> next -> terminal -> goal and actions-related semantics, some of
// its rougher edges can be worked out.  It's a little obtuse for this toy
// application but I chose the toy because it touches a lot of different surface
// & equipment (and rules with randomness) semantics.  Heavily inspired by GDL.
export function useGameRules(): GameRules {

  function roles(): (PlayerRole | undefined)[] {
    // TODO
    return []
  }

  function init(): GameState {
    // TODO
    return
  }

  function actions(state: GameState): Action[] {
    // TODO
    return
  }

  function legal(state: GameState, action: Action): boolean {
    // TODO
    return true
  }
  
  function next(state: GameState, turn: Action[]): GameState {
    // TODO
    return
  }
  
  function terminal(state: GameState): boolean {
    // TODO
    return false
  }

  // Simplfied goal type for solitaire, this returns true if the player wins.
  function goal(state: GameState): boolean {
    // TODO
    return false
  }

  return {
    roles,
    init,
    actions,
    legal,
    next,
    terminal,
    goal,
  }
}
