---
title: Game Rules | Tic-Tac-Total-Recall
author: Kevin Damm
---

<!--
Copyright (c) 2025 Kevin Damm
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
-->

# Game Rules, in detail

The game is played in three phases, *Dealing*, *Revealing* and *Bidding*.  You
can optionally play without the bidding phase, in which case the other rules are
also simpler.

The central game mechanic is meant to answer the question: "what if you could
only choose *where* you played in Tic-Tac-Toe, but had no control over whether
the marker used was an `X` or an `O`?"  A special deck of cards is defined, to
represent the uncertainty involved.  This deck has ten cards, five each of `X`
and `O` suits with no relative ranking.


## First Phase: Dealing

In the first phase, all cards are dealt from the deck onto open positions of a
(3 &times; 3) Tic-Tac-Toe board.  The deck has been shuffled and the cards are
dealt face-down, so the player also has the option of just dealing them randomly.

After all cards are dealt, the final card remains hidden.  Its value determines
the opponent's symbol but it also leaves the final reveal (the center card) as
uncertain, even when all other cards are known.

If playing the non-bidding version, the deck only has nine cards and the player
sees all cards revealed immediately after they are dealt.


## Second Phase: Revealing

Play then alternates between the second and third phases.  The player first sees
all cards on edge positions, as these are connected to the fewest possible lines.

After an opportunity to bid on their position, the corner positions are revealed
together, and the player is given another opportunity for bidding.

Finally, the center card is revealed.  At this point it is clear which symbol
has the majority of cards (it will either be 4:5 or 5:4 `X`s and `O`s).
The player wins if the majority symbol forms a line of three in a row while the
opposite symbol does not also form a line.


## Third Phase: Bidding

Players begin each series with 100 coins that they can wager any proportion of.
There are two opportunities to wager, between the three reveal phases.

If they win, their payout is double the value of the pot.  Otherwise, they lose
everything that was wagered and begin another game if they still have a positive
balance.  Play continues until the player decides to stop or they run out of coins.


## Fairness

The deck is shuffled such that all card orderings are equally likely (see the
deck composables for more details) and this will result in 62:64 odds that the
resulting arrangement on the board will result in a win for the player,
regardless of whether the player has any agency over where the cards are dealt.
With the ability to place the last card on any position, the likelihood of the
card underneath being the same symbol is 50:50 and the likelihood of winning is
still the same either way -- the reason why is left as an exercise for the
reader.

With the bidding game mechanic added, the chances are a little different because
the player is given incrementally more information while having some agency to
influence their winnings or minimize their risk.  But, because the final card is
unknown, if the final card might result in a win it is still exactly 50/50
whether it will.

If this is not immediately clear, play the game a few times to get an intuition
for the odds.  If you would like to see a complete writeup of the probabilities
involved, contact me and let me know!
