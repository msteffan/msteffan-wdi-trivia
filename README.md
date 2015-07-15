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

For this project, I pseudocoded the game logic for a one-category trivia game and drew out some initial wireframes on paper so that I could see what the elements would be and how I should label them. Then, I built the HTML framework for the necessary elements and added basic CSS styles so that each element appeared on the page in a logical spot (based on the wireframes).

Once I had the structure, I wrote the initial jQuery programs to run the game to play one category of trivia. From there, I refactored the jQuery into an object so that I could add the additional category of questions and answers to check against. To complete the game play portion, I added the click events to call the right functions at the right time. After the first couple user stories were met, I focused on added additional buttons—one to reset the game, and one to allow two players to each play a round of trivia and then compare the scores to determine the winner.

***

Installation

To play:
1) Load http://msteffan.github.io/msteffan-wdi-trivia/ in the browser.
2) Click either "Seattle" or "DC" in the logo to play.
3) Test your knowledge!

To run this game locally:
1) Fork the msteffan-wdi-trivia repository; then clone it to the local device to the desired location.
2) Open index.html in Google Chrome or web browser of choice.
3) Test your knowledge!

***

Unsolved problems

No real unsolved "problems" per se, as all of the logic works and the HTML/CSS check out in the validator. However...

1) My CSS isn't as DRY as I know it could be, because I started over on the HTML and CSS around 7 p.m. on Tuesday evening. As a result, I don't think this is a reflection of my total skill in writing DRY code, but rather a reflection of how quickly I put together CSS that works.

2) I'm pretty frustrated with the jQuery for this project because I very quickly ran into things I didn't know how to do. For example, we learned in class how to use .bind(this), but we didn't discuss how to apply this in a situation like the one I set up. Basically, if you have functions x, y, and z--all of which use "this" in their context--how do I set up the .bind() structure if function z calls x and y? Another unsolved problem is that I don't know when to abstract code and when to leave it; for example, I would actually find it more confusing to use "this" than to invoke the function directly (i.e. "trivia.gamePlay.checkAnswer()" vs "this.checkAnswer()" ), so I'm not actually sure *when* it is best to use "this" in order to absract it. When I brought both of these issues up to an instructor, he said what I had was fine and that I shouldn't try to refactor it because we hadn't covered that. That was frustrating because I felt like it was a squashed learning opportunity.
