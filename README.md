# Hangman-Game

Week 3 Assignment

## Assignment Overview
_In this assignment, you'll create one of two possible computer games: Hangman or Psychic. These apps will run in the browser, and feature dynamically updated HTML powered by your JavaScript code._


## Theme - Javascript and Web Tech

Display info is formatted like a Javascript object with syntax highlighting reminiscient of the default Sublime theme, Monokai. Guess word list is comprised of terms pulled from the UCSD - BC syllabus. Input buttons are styled like a qwerty keyset.


## Gameplay

A word to guess is chosen from the pre-determined word list, at random. Underscores present on the screen indicate word length and correctly guesses letter. A Player selects which letter to guess next by clicking the typeset buttons. If successful the guessed letter will replace their representative underscores. If unsuccessful a miss is registered and a body part is added to the hangman. If the entire hangman is drawn the next guess will trigger him to 'drop' and a loss will be registered.


## Libraries

This implementation relies on the following external libraries:
- jQuery for DOM manipulation.
- Velocity for hangman svg animation.
- GoogleFonts for... well fonts.

### Bonus

I did use some CSS styling. While I would hesitate to call it "stylish" I do think the button click animation in pure css transition counts.

The majority of the game is stored in a single game object. Only excepted where I felt not much value would have been added (hangman animations, initial button element creation).

#### PS

If you're a TA and having trouble winning a round due to the low amount of guesses. Just log "gameObj.curWord"