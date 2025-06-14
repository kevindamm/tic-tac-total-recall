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

import { CardSurface, Deck, useDeck } from './cards-xo'
import { CardBoard3x3, BoardCoord, useCardBoard } from './cardboard'

// useGameRules() composable interface
export interface GameRules {
  init(): GameState
  actions(state: GameState): Action[]
  legal(state: GameState, action: Action): boolean
  next(state: GameState, turn: Action[]): GameState
  terminal(state: GameState, action?: Action): boolean
  goal(state: GameState): boolean
}

export interface PlayerRole {
  username: string
  showname: string
  rolename: 'X' | 'O' | 'solo' | undefined
}

export interface GameState {
  board: CardBoard3x3
  deck: Deck
  history: Action[]
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

  // Returns a new GameState instance, initialized to a match beginning.
  function init(): GameState {
    return {
      board: useCardBoard(),
      deck: useDeck(),
      history: [] as Action[],
    }
  }

  // Returns a list of the allowed actions for a given game state.
  function actions(state: GameState): Action[] {
    // TODO
    return
  }

  // Returns true if the action is allowed at the given game state.
  function legal(state: GameState, action: Action): boolean {
    // TODO
    return true
  }
  
  // Transform a game state with one or more (simultaneous) actions.
  function next(state: GameState, turn: Action[]): GameState {
    // TODO
    return
  }
  
  // Returns true if the 
  function terminal(state: GameState, action?: Action): boolean {
    // TODO
    return false
  }

  // Simplfied goal type for solitaire, this returns true if the player wins.
  function goal(state: GameState): boolean {
    // TODO
    return false
  }

  return {
    init,
    actions,
    legal,
    next,
    terminal,
    goal,
  }
}

// Summarize a game outcome
export interface GameOutcome {
  endgame: CardSurface[]
  outcome:
    | { type: 'win', focus: number[] }
    | { type: 'loss', focus: number[] }
    | { type: 'unk' }
}
