# msteffan-wdi-triva
This repository contains the code for WDI Project #1, which will be a self-scoring trivia game.

***

User stories

- As a user, I want to be able to select a category to play from a list, so that I can have a shot at answering correctly. (//have freedom of choice?)

- As a user, I want to see the question on my screen so that I can read it.

- As a user, I want to be able to type my answer to each question and press submit.

- As a user, I want to know how many questions I have answered correctly so far, so that I can gauge how well I'm doing.

- As a user, I want to know how many questions I have left in the category so that I know how much longer until the game ends.

- As a user, I want to know how well I did (questions right vs questions wrong), so that I can brag (hopefully) to my friends about how much I know.

- As a user, I want to be able to see the correct answers at the end of the game, so I can learn more facts and improve my score the next time I play.

slightly ambitious user stories

- As a user, I want to be able to select two-player mode (vs one-player mode), so that I can play trivia against a friend.

- As a user, I want to be able to compare my score for a category against a friend's score.

- As a user, I want to have a time limit on the game so I can challenge myself.

***
Technologies used

This trivia application is built using HTML, CSS, and jQuery. There is a jQuery plugin called "SmoothScroll."

***

Approach

For this project, I pseudocoded the game logic for a one-category trivia game. Then, I built the HTML framework for the necessary elements and added basic CSS styles so that each element appeared on the page in a logical spot. Once I had the structure, I wrote the initial jQuery programs to run the game to play one category of trivia. From there, I refactored the jQuery into an object so that I could add the additional category of questions and answers to check against. To complete the game play portion, I added the click events to call the right functions at the right time. After the first couple user stories were met, I focused on added additional buttons—one to reset the game, and one to allow two players to each play a round of trivia and then compare the scores to determine the winner. 

***

Installation

To run this game locally:
1) Fork the msteffan-wdi-trivia repository; then clone it to the local device to the desired location.
2) Open index.html in Google Chrome or web browser of choice.
3) Test your knowledge!

***

Unsolved problems
