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
// github:KevinDamm/tic-tac-total-recall/deck-digits.ts

import { useDeck, Deck, CardBack } from './deck'

const DEFAULT_DECK_DIGITS_SIZE: number = 10

// Cards have a front and back, card front may be symbol "X" or symbol "O"
export type CardDigits = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0'

export interface DeckDigits extends Deck<CardDigits> {}


// COMPOSABLE useDeckDigits
//
// A deck constructed from single-digit numbers, including 0.
export function useDeckDigits(
    count: number = DEFAULT_DECK_DIGITS_SIZE,
    seed?: number[]): DeckDigits {

  function value(index: number): CardDigits {
    let value = index % 10
    switch (value) {
      case 1: return '1'
      case 2: return '2'
      case 3: return '3'
      case 4: return '4'
      case 5: return '5'
      case 6: return '6'
      case 7: return '7'
      case 8: return '8'
      case 9: return '9'
    }
    return '0'
  }

  return useDeck<CardDigits>(count, value, seed)
}
