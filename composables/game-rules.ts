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
// github:KevinDamm/tic-tac-total-recall/game-rules.ts

import { toValue } from 'vue'

import { CardSurface, Empty, Deck, Card } from './deck'
import { CardXO, useDeckXO } from './deck-xo'
import { CardBoard3x3, BoardCoord, useCardBoard3x3, CellGroup } from './cardboard'

export type Role = 'X' | 'O' | 'solo'

// useGameRules() composable interface
export interface GameRules {
  roles(): Role[]
  init(): GameState
  actions(state: GameState, role: Role): Action[]
  legal(state: GameState, action: Action): boolean
  next(state: GameState, turn: Action[]): GameState
  terminal(state: GameState): boolean
  goal(state: GameState, role: Role): number
}

export interface PlayerRole {
  username: string
  showname: string
  rolename: Role | undefined
}

type Hand = CardSurface<CardXO>

export interface GameState {
  board: CardBoard3x3
  deck: Deck<CardXO>
  hand: Hand
  phase: 'init' | 'dealing' | 'wagering' | 'revealing' | 'terminal'
  history: Action[]
}

export type Action =
  | { type: 'deal',
      coord: BoardCoord,
    }
  | { type: 'move',
      from: BoardCoord,
      onto: BoardCoord,
    }
  | { type: 'reveal',
      selection: CellGroup,
    }
  | {
      type: 'wager',
      amount: number,
    }
  | {
      type: 'discard',
      card: Card<CardXO>
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

  function roles(): Role[] {
    return ['solo']
  }

  // Returns a new GameState instance, initialized to a match beginning.
  function init(): GameState {
    return {
      board: useCardBoard3x3(),
      deck: useDeckXO(),
      hand: Empty,
      phase: 'init',
      history: [] as Action[],
    }
  }

  // Returns a list of the allowed actions for a given game state.
  function actions(state: GameState): Action[] {
    let actions = [] as Action[]
    switch (state.phase) {
      case 'dealing':
        for (let coord of state.board.open.value) {
          actions.push({ type: 'deal', coord })
        }
        break;
      case 'wagering':
        // Hmm, will need to present variable intervals to the client sometimes.
        actions.push({ type: 'wager', amount: 0 })
        actions.push({ type: 'wager', amount: 100 })
        break;
      case 'revealing':
        if (state.board.at({row: 1, col: 2}).type === 'FaceDown' ||
            state.board.at({row: 2, col: 1}).type === 'FaceDown' ||
            state.board.at({row: 2, col: 3}).type === 'FaceDown' ||
            state.board.at({row: 3, col: 2}).type === 'FaceDown')
          actions.push({ type: 'reveal', selection: 'edges'})
        if (state.board.at({row: 1, col: 1}).type === 'FaceDown' ||
            state.board.at({row: 1, col: 3}).type === 'FaceDown' ||
            state.board.at({row: 3, col: 1}).type === 'FaceDown' ||
            state.board.at({row: 3, col: 3}).type === 'FaceDown')
          actions.push({ type: 'reveal', selection: 'corners'})
        if (state.board.at({row: 2, col: 2}).type === 'FaceDown')
          actions.push({ type: 'reveal', selection: 'center'})
        break;
    }

    return actions
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

  function terminal(state: GameState): boolean {
    for (let cell of toValue(state.board.cells)) {
      if (cell.type === "Empty" || cell.type === "FaceDown") {
        return false
      }
    }
    return true
  }
  
  // Simplfied goal type for solitaire, this returns true if the player wins.
  function goal(state: GameState, role: Role): number {
    if (state.phase !== 'terminal') {
      return 0
    }
    // TODO role's symbol, (or computed from the card in player's hand if solo)
    // e.g. forming board.line(X) and not board.line(O), then return 100 (win)

    return 0
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

// Summarize a game outcome
export interface GameOutcome {
  endgame: CardSurface<CardXO>[]
  outcome:
    | { type: 'win', focus: number[] }
    | { type: 'loss', focus: number[] }
    | { type: 'unk' }
}
