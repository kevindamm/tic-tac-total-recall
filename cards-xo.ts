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
// github:KevinDamm/tic-tac-total-recall/cards-xo.ts

// The interface representation for the Composable in this module.
export interface Deck {
  exhausted(): boolean

  reset(order?: number[]): Deck
  shuffle(): Deck
  draw(): CardBack
}

const DEFAULT_DECK_SIZE: number = 10

// Cards have a front and back, card front may be symbol "X" or symbol "O"
export type CardFront = "X" | "O"

// The card's value is opaque for the card with 
export interface CardBack {
  flip(): CardFront
}

// A card's front may or may not be visible and still be a Card.
// The card's intrinsic state doesn't change,
// but its value is revealed only via CardFront.
export type Card =
    | CardBack
    | CardFront 

// A card surface maybe has a card, or it may be empty.
export type CardSurface =
  | { type: "FaceDown", card: CardBack }
  | { type: "FaceUp", card: CardFront }
  | { type: "Empty", card: undefined }

// Empty representation is a singleton, (const ... as const) is intentional.
export const Empty = { type: "Empty", card: undefined } as const

// COMPOSABLE useDeck
//
// Takes an optional param `count` which can extend the number of cards in the
// the deck, but the fairest ratio is 10 cards, with 9 cards also close, 62:64.
//
// To use this, follow the type protocol above for Deck and dealing CardBack
// instances which can be flip()'ed to produce its related CardFront.  The card
// property is hidden from view in its CardBack representation.
export function useDeck(seed?: number | number[]): Deck {
  var cards: number[]
  var index = 0

  const defaultOrder = (len: number) => Array<number>(len).map((i) => i)
  const deck = { exhausted, reset, shuffle, draw }

  // Returns true if there are no more cards remaining to deal.
  function exhausted(): boolean {
    return (cards && length in cards && index === cards.length)
  }

  // Reset's the deck to the ordering it had when it was created, or to the
  // default "fresh" ordering if an initial ordering (seed) wasn't provided.
  function reset(): Deck {
    switch (typeof seed) {
      case 'undefined':
        cards = defaultOrder(DEFAULT_DECK_SIZE)
      case 'number':
        cards = defaultOrder((seed && seed > 0) ? seed : DEFAULT_DECK_SIZE)
      case 'object':
        cards = (isArrayOfNumbers(seed as object) ?
            seed as number[]
            :
            defaultOrder(DEFAULT_DECK_SIZE)
        )
    }
    return deck
  }

  // Internally used to validate the composable's paramter.
  function isArrayOfNumbers(obj: object): boolean {
    if (!Array.isArray(obj)) {
      return false
    }
    const arr = obj as any[]
    for (var i in arr) {
      if (typeof arr[i] !== 'number') {
        return false
      }
    }

    return true
  }

  // Shuffle all of the cards in the deck, producing a new deck.
  function shuffle(): Deck {
    const order: number[] = Array(cards.length).map((i) => cards[i])
    for (var from = order.length-1; from > 0; from -= 1) {
      let into = Math.floor(Math.random() * (from+1))
      if (into == from) {
        continue
      }
      let tmp = order[into]
      order[into] = order[from]
      order[from] = tmp
    }
    return useDeck(order)
  }

  // The card being dealt as CardBack hides its state behind a closure,
  // revealed when calling it produces the CardFront representation.
  function draw(): CardBack {
    const x = (cards[index]&1)>0
    index += 1
    return {
      flip: () => (x?"X":"O") as CardFront
    }   
  }

  return deck
}
