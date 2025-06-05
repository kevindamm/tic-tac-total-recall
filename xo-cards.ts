

// Cards have a front and back, card front may be symbol "X" or symbol "O"
export type CardBack = "?"
export type CardFront = "X" | "O"
export type Card = CardFront | CardBack

// A card surface maybe has a card
export type CardSurface =
  | { type: "HasCard", card: Card }
  | { type: "Empty", card: undefined }

// Convenient constants used often with the cards on the 3x3 board.
export const Unknown = { type: "HasCard", card: "?" as const } as const
export const Empty = { type: "Empty", card: undefined } as const
