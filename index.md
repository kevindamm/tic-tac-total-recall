---
layout: home

hero:
  name: "Tic-Tac-TOTAL RECALL"
  tagline: What if you didn't know?
  actions:
    - theme: alt
      text: About
      link: /about
    - theme: brand
      text: Play Game
      link: /play

features:
  - title: Equipment
    details: one (1) classic Tic-Tac-Toe board and a deck of ten (10) cards,
             consisting of five (5) "X" cards and five (5) "O" cards; <hr>
             during play, all cards but one are dealt, then the last card is 
             dealt to the player's hand
  - title: Gameplay
    details: choose where on the grid to deal the cards face-down,
             finally seeing which card remains and choosing to deal or discard it; <hr>
             cards are then revealed <br> (edges -> corners -> center) with bidding between reveals
  - title: Winning Conditions
    details: the player's goal is to get a line of three in a row of their symbol,
             without completing a line of the opposite symbol; <hr> the player's symbol
             is the one in the majority, also the one not seen on the final card
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

<dark-mode-switch />

<!--@include: ./rules.md-->

<style>
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #424969;
  background-color: unset;
}

h1:not(.heading) {
  padding-top: 1em;
  margin-top: 2em;
  border-top: 1px solid #424969;
}
</style>
