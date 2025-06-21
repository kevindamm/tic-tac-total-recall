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
// github:KevinDamm/tic-tac-total-recall/deck-xo.ts

import { useDeck, Deck, CardBack } from './deck'

const DEFAULT_DECK_XO_SIZE = 10

// Cards have a front and back, card front may be symbol "X" or symbol "O"
export type CardXO = 'X' | 'O'

export interface DeckXO extends Deck<CardXO> {}

// COMPOSABLE useDeckXO
//
// A deck constructed from "X" and "O" cards, with a default deck size of 10.
export function useDeckXO(
    count: number = DEFAULT_DECK_XO_SIZE,
    seed?: number[]): DeckXO {

  function value(index: number): CardXO {
    return ((index & 1) >0) ? 'X' : 'O'
  }

  return useDeck<CardXO>(count, value, seed)
}
