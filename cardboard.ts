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
// github:KevinDamm/tic-tac-total-recall/cardboard.ts

import { ref, type Ref } from 'vue'
import { CardFront, CardSurface, Empty, Deck } from './cards-xo'

type CellGroup = 'all' | 'edges' | 'corners' | 'center' | number[]

export interface CardBoard3x3 {
  // getters
  open(): boolean
  at(row: number, col: number): CardSurface
  line(card: CardFront): boolean
  countLines(): number

  // actions
  deal(row: number, col: number, deck: Deck): void
  turn(selection: CellGroup): void
  reset(): void
}

// Composable for representing the state and logic of an <M,N,K> board.
export function useCardBoard(clone?: (i: number, j: number) => CardSurface): CardBoard3x3 {
  const board = ref<CardSurface[][]>(
    new Array(3).map(() => new Array(3).map(() => Empty)))

  if (clone) {
    for (let row of [0, 1, 2]) {
      for (let col of [0, 1, 2]) {
        board.value = Array(3).map(
          (row) => Array(3).map(
            (col) => clone(row, col)))
      }
    }
  }

  function open(): boolean {
    for (let row of [0, 1, 2]) {
      for (let col of [0, 1, 2]) {
        if (board.value[row][col].type === Empty.type) {
          return true
        }
      }
    }
    return false
  }
  
  // Returns the representation of the board cell at position (row, col)
  function at(row: number, col: number): CardSurface {
    if (row in board.value && col in board.value[row]) {
      return board.value[row][col]
    }
    return Empty
  }

  // Returns the number of complete three-aligned cards on the board, regardless
  // of the symbol on the card making up the line.  May be 0 or 1, sometimes 2.
  // This will only return three or more if the deck has more than 10 cards.
  function countLines(): number {
    let count = 0
    
    // any row
    for (var row of [0, 1, 2]) {
      if (board.value[row][0].type == 'FaceUp' &&
          board.value[row][1].type == 'FaceUp' &&
          board.value[row][2].type == 'FaceUp' &&
          board.value[row][0].card === board.value[row][1].card &&
          board.value[row][1].card === board.value[row][2].card) {
        count += 1
      }
    }

    // any col
    for (var col of [0, 1, 2]) {
      if (board.value[0][col].type == 'FaceUp' &&
          board.value[1][col].type == 'FaceUp' &&
          board.value[2][col].type == 'FaceUp' &&
          board.value[0][col].card === board.value[1][col].card &&
          board.value[1][col].card === board.value[2][col].card) {
        count += 1
      }
    }

    // backslash diagonal
    if (board.value[0][0].type == 'FaceUp' &&
        board.value[1][1].type == 'FaceUp' &&
        board.value[2][2].type == 'FaceUp' &&
        board.value[0][0].card === board.value[1][1].card &&
        board.value[1][1].card === board.value[2][2].card) {
      count += 1
    }

    // forward-slash diagonal
    if (board.value[0][2].type == 'FaceUp' &&
        board.value[1][1].type == 'FaceUp' &&
        board.value[2][0].type == 'FaceUp' &&
        board.value[0][2].card === board.value[1][1].card &&
        board.value[1][1].card === board.value[2][0].card) {
      count += 1
    }

    return count
  }

  // Returns whether the card value makes an aligned set of three
  // anywhere on the board.
  function line(card: CardFront): boolean {
    for (var row of [0, 1, 2]) {
      if (board.value[row][0].type == 'FaceUp' &&
          board.value[row][1].type == 'FaceUp' &&
          board.value[row][2].type == 'FaceUp' &&
          board.value[row][0].card === card &&
          board.value[row][1].card === card &&
          board.value[row][2].card === card) {
        return true
      }
    }

    for (var col of [0, 1, 2]) {
      if (board.value[0][col].type == 'FaceUp' &&
          board.value[1][col].type == 'FaceUp' &&
          board.value[2][col].type == 'FaceUp' &&
          board.value[0][col].card === card &&
          board.value[1][col].card === card &&
          board.value[2][col].card === card) {
        return true
      }
    }

    if (board.value[0][0].type == 'FaceUp' &&
        board.value[1][1].type == 'FaceUp' &&
        board.value[2][2].type == 'FaceUp' &&
        board.value[0][0].card === card &&
        board.value[1][1].card === card &&
        board.value[2][2].card === card) {
      return true
    }

    if (board.value[0][2].type == 'FaceUp' &&
        board.value[1][1].type == 'FaceUp' &&
        board.value[2][0].type == 'FaceUp' &&
        board.value[0][2].card === card &&
        board.value[1][1].card === card &&
        board.value[2][0].card === card) {
      return true
    }

    return false
  }

  // Deal the top card of the deck onto the position at (row, col)
  function deal(row: number, col: number, deck: Deck) {
    board.value[row][col] = {
      type: 'FaceDown',
      card: deck.draw(),
    }
  }

  // Turn over the cards that match the selection indicated.
  function turn(selection: CellGroup) {
    switch (selection) {
      case 'all':
        // Turn over all the cards
        for (var row in board) {
          for (var col in board[row]) {
            if (board[row][col].type === 'FaceDown') {
              board[row][col] = board[row][col].flip()
            }
          }
        }

      case 'edges':
        for (var coord of [
          {row: 0, col: 1},
          {row: 1, col: 0},
          {row: 1, col: 0},
          {row: 2, col: 1},
        ]) {
          let row = coord.row
          let col = coord.col
          if (board[row][col].type === 'FaceDown') {
            board[row][col] = board[row][col].flip()
          }
        }

      case 'corners':
        for (var coord of [
          {row: 0, col: 0},
          {row: 0, col: 2},
          {row: 2, col: 0},
          {row: 2, col: 2},
        ]) {
          let row = coord.row
          let col = coord.col
          if (board[row][col].type === 'FaceDown') {
            board[row][col] = board[row][col].flip()
          }
        }

      case 'center':
        if (board[1][1].type === 'FaceDown') {
          board[1][1] = board[1][1].flip()
        }
    }
  }

  // Clears the state of the board, removing cards from every position.
  function reset(): void {
    for (var row in board) {
      for (var col in board[row]) {
        board[row][col] = Empty
      }
    }
  }

  return {
    // getters
    open,
    at,
    line,
    countLines,
    // actions
    deal,
    turn,
    reset,
  }
}
