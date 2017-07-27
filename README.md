# Hangman-Game

## Overview
This app is a browser implementation of the classic word guessing game: Hangman. It features dynamically updated HTML and DOM from jQuery and Javascript. This game utilizes some ES6 syntax, so of course, if you're using IE, you are out of luck.

## Theme - Javascript and Web Tech

Display info is formatted like a Javascript object with syntax highlighting reminiscient of the default Sublime theme, Monokai. Guess word list is comprised of terms common in the web development world. Input buttons are styled like a qwerty keyset.

## Gameplay

A word to guess is chosen from the pre-determined word list, at random. Underscores present on the screen indicate word length and correctly guesses letter. A Player selects which letter to guess next by clicking the typeset buttons. If successful the guessed letter will replace their representative underscores. If unsuccessful a miss is registered and a body part is added to the hangman. If the entire hangman is drawn the next guess will trigger him to 'drop' and a loss will be registered.


## Libraries

This implementation relies on the following external libraries:
- jQuery for DOM manipulation.
- Velocity for hangman svg animation. (pure css for button animations, though.)
- GoogleFonts for... well fonts.