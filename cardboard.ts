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

import { computed, type ComputedRef, ref, toValue } from 'vue'
import { CardFront, CardSurface, Empty, Deck } from './deck-xo'

export interface BoardCoord {
  row: number
  col: number
}

export type CellGroup = 'all' | 'edges' | 'corners' | 'center' | BoardCoord[]

export interface CardBoard3x3 {
  open: ComputedRef<BoardCoord[]>
  cells: ComputedRef<CardSurface[]>
  lineX: ComputedRef<boolean>
  lineO: ComputedRef<boolean>

  // getters
  at(coord: BoardCoord): CardSurface

  // actions
  deal(coord: BoardCoord, deck: Deck): void
  reveal(selection: CellGroup): void
  reset(): void
}

// Composable for representing the state and logic of an <M,N,K> board.
export function useCardBoard3x3(clone?: (coord: BoardCoord) => CardSurface): CardBoard3x3 {
  const board = ref<CardSurface[][]>(
    new Array(3).map(() => new Array(3).map(() => Empty)))

  if (clone) {
    for (let row of [1, 2, 3]) {
      for (let col of [1, 2, 3]) {
        board.value = Array(3).map(
          (row) => Array(3).map(
            (col) => clone({row, col})))
      }
    }
  }

  const open = computed(() => {
    let cells = [] as BoardCoord[]
    for (let row of [1, 2, 3]) {
      for (let col of [1, 2, 3]) {
        if (at({row, col}).type === 'Empty') {
          cells.push({row, col})
        }
      }
    }
    return cells
  })

  const cells = computed(() => [
    ...board.value[0],
    ...board.value[1],
    ...board.value[2]])
  
  // Returns the representation of the board cell at position (row, col)
  function at(coord: BoardCoord): CardSurface {
    let row = coord.row-1
    if (row in board.value) {
      let col = coord.col-1
      if (col in board.value[row]) {
        return board.value[row][col]
      }
    }
    return Empty
  }

  // Returns whether the card value makes an aligned set of three
  // anywhere on the board.
  const lineX = computed(() => {
    for (let row of [0, 1, 2]) {
      if (board.value[row][0].card === 'X' &&
          board.value[row][1].card === 'X' &&
          board.value[row][2].card === 'X')
        return true
    }
    for (var col of [0, 1, 2]) {
      if (board.value[0][col].card === 'X' &&
          board.value[1][col].card === 'X' &&
          board.value[2][col].card === 'X')
        return true
    }
    if (board.value[0][0].card === 'X' &&
        board.value[1][1].card === 'X' &&
        board.value[2][2].card === 'X') {
      return true
    }
    if (board.value[0][2].card === 'X' &&
        board.value[1][1].card === 'X' &&
        board.value[2][0].card === 'X') {
      return true
    }

    return false
  })

  const lineO = computed(() => {
    for (let row of [0, 1, 2]) {
      if (board.value[row][0].card === 'O' &&
          board.value[row][1].card === 'O' &&
          board.value[row][2].card === 'O')
        return true
    }
    for (var col of [0, 1, 2]) {
      if (board.value[0][col].card === 'O' &&
          board.value[1][col].card === 'O' &&
          board.value[2][col].card === 'O')
        return true
    }
    if (board.value[0][0].card === 'O' &&
        board.value[1][1].card === 'O' &&
        board.value[2][2].card === 'O') {
      return true
    }
    if (board.value[0][2].card === 'O' &&
        board.value[1][1].card === 'O' &&
        board.value[2][0].card === 'O') {
      return true
    }

    return false
  })

  // Deal the top card of the deck onto the position at (row, col)
  function deal(coord: BoardCoord, deck: Deck) {
    if ((coord.row-1) in board.value && (coord.col-1) in board.value[coord.row-1])
    board.value[coord.row-1][coord.col-1] = {
      type: 'FaceDown',
      card: deck.draw(),
    }
  }

  // Turn over the cards that match the selection indicated.
  function reveal(selection: CellGroup) {
    switch (selection) {
      case 'all':
        // Turn over all the cards
        for (var row in board.value) {
          for (var col in board.value[row]) {
            if (board.value[row][col].type === 'FaceDown') {
              board.value[row][col] = board.value[row][col].flip()
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
          if (board.value[row][col].type === 'FaceDown') {
            board.value[row][col] = board.value[row][col].flip()
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
          if (board.value[row][col].type === 'FaceDown') {
            board.value[row][col] = board.value[row][col].flip()
          }
        }

      case 'center':
        if (board.value[1][1].type === 'FaceDown') {
          board.value[1][1] = board.value[1][1].flip()
        }
    }
  }

  // Clears the state of the board, removing cards from every position.
  function reset(): void {
    for (var row in board.value) {
      for (var col in board.value[row]) {
        board.value[row][col] = Empty
      }
    }
  }

  return {
    open,
    cells,
    lineX,
    lineO,

    // getters
    at,

    // actions
    deal,
    reveal,
    reset,
  }
}
