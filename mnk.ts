// MIT License
// 
// Copyright (c) 2025 Kevin Damm
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
// github:KevinDamm/tic-tac-total-recall/mnk.ts

import { computed, ref, type Ref, type ComputedRef } from 'vue'
import { CardFront, CardSurface, Empty, Card } from './xo-cards'

export interface MNKBoard {
  m: number
  n: number
  k: number

  board: Ref<CardSurface[][]>
  board_cells: ComputedRef<CardSurface[]>
  deal(i: number, j: number, card: Card): void
  countLines(): number
  line(CardFront): boolean
}

// Composable for representing the state and logic of an <M,N,K> board.
export function useMNK(): MNKBoard {
  const board = ref<CardSurface[][]>(
    new Array(3).map(() => new Array(3).map(() => Empty)))

  const board_cells = computed(() => [
    ...board[0], ...board[1], ...board[2]
    // ].map((m) => ))
  ])

  function deal(i: number, j: number, card: Card): void {
    board[i][j] = card
  }

  function countLines(): number {
    let count = 0
    for (var row of [0, 1, 2]) {
      if (board.value[row][0].type == "HasCard" &&
          board.value[row][1].type == "HasCard" &&
          board.value[row][2].type == "HasCard" &&
          board.value[row][0].card === board.value[row][1].card &&
          board.value[row][1].card === board.value[row][2].card) {
        count += 1
      }
    }

    for (var col of [0, 1, 2]) {
      if (board.value[0][col].type == "HasCard" &&
          board.value[1][col].type == "HasCard" &&
          board.value[2][col].type == "HasCard" &&
          board.value[0][col].card === board.value[1][col].card &&
          board.value[1][col].card === board.value[2][col].card) {
        count += 1
      }
    }

    if (board.value[0][0].type == "HasCard" &&
        board.value[1][1].type == "HasCard" &&
        board.value[2][2].type == "HasCard" &&
        board.value[0][0].card === board.value[1][1].card &&
        board.value[1][1].card === board.value[2][2].card) {
      count += 1
    }

    if (board.value[0][2].type == "HasCard" &&
        board.value[1][1].type == "HasCard" &&
        board.value[2][0].type == "HasCard" &&
        board.value[0][2].card === board.value[1][1].card &&
        board.value[1][1].card === board.value[2][0].card) {
      count += 1
    }

    return count
  }

  function line(card: CardFront): boolean {
    for (var row of [0, 1, 2]) {
      if (board.value[row][0].type == "HasCard" &&
          board.value[row][1].type == "HasCard" &&
          board.value[row][2].type == "HasCard" &&
          board.value[row][0].card === card &&
          board.value[row][1].card === card &&
          board.value[row][2].card === card) {
        return true
      }
    }

    for (var col of [0, 1, 2]) {
      if (board.value[0][col].type == "HasCard" &&
          board.value[1][col].type == "HasCard" &&
          board.value[2][col].type == "HasCard" &&
          board.value[0][col].card === card &&
          board.value[1][col].card === card &&
          board.value[2][col].card === card) {
        return true
      }
    }

    if (board.value[0][0].type == "HasCard" &&
        board.value[1][1].type == "HasCard" &&
        board.value[2][2].type == "HasCard" &&
        board.value[0][0].card === card &&
        board.value[1][1].card === card &&
        board.value[2][2].card === card) {
      return true
    }

    if (board.value[0][2].type == "HasCard" &&
        board.value[1][1].type == "HasCard" &&
        board.value[2][0].type == "HasCard" &&
        board.value[0][2].card === card &&
        board.value[1][1].card === card &&
        board.value[2][0].card === card) {
      return true
    }

    return false
  }

  return {
    // state
    m: 3,
    n: 3,
    k: 3,
    // getters
    board,
    board_cells,
    // actions
    deal,
    countLines,
    line,
  }
}