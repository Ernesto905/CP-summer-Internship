# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Ernesto Enriquez**

Time spent: **19** hours spent in total

Link to project: 
https://glitch.com/edit/#!/im-pickle-rick <br>
Live site: 
https://im-pickle-rick.glitch.me

## Required Functionality

The following **required** functionality is complete:

* [X] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [X] "Start" button toggles between "Start" and "Stop" when clicked. 
* [X] Game buttons each light up and play a sound when clicked. 
* [X] Computer plays back sequence of clues including sound and visual cue for each button
* [X] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [X] User wins the game after guessing a complete pattern
* [X] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [X] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [X] Buttons use a pitch (frequency) other than the ones in the tutorial
* [X] More than 4 functional game buttons
* [X] Playback speeds up on each turn
* [X] Computer picks a different pattern each time the game is played
* [X] Player only loses after 3 mistakes (instead of on the first mistake)
* [X] Game button appearance change goes beyond color (e.g. add an image)
* [X] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [X] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [X] Added a custom background animation (floating stars) 
- [X] Custom cursor replaced original one (dark/white rocket) 
- [X] Custom fonts
- [X] An explanation of each challenge is offered through a popup at the bottom of the screen

## Video Walkthrough (GIF)

### All three Challenges activated at once
<img src="http://g.recordit.co/exDxkGn04c.gif" width = 500><br>
### CountDown removing one of the player's lives
<img src="http://g.recordit.co/RVCjP1M2ip.gif" width = 500><br>
### Showcasing the popup
<img src="http://g.recordit.co/8uvXvQ6cTI.gif" width=500><br>



## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
* W3Schools for javascript syntax and HTML/CSS concepts : https://www.w3schools.com/jsref/dom_obj_document.asp
* How to position content in CSS: https://www2.cs.sfu.ca/CourseCentral/165/common/study-guide/content/css2-positioning.html
* Background animation used: https://www.youtube.com/watch?v=aywzn9cf-_U
* How to add white spaces in html: https://blog.hubspot.com/website/html-space
* Custom mouse cursor: https://www.youtube.com/watch?v=FOC5RZHK_Gw
* Play sound while buton is pressed: https://stackoverflow.com/questions/49953289/play-sound-continuously-when-button-is-pressed-javascript

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it?

The hardest challenge I faced was replacing the native tones with custom sounds. Since the theme of my project was space, I wanted the buttons to relay nostalgic sci-fi sounds when pressed. However, because of the nature of the game, there was quite a bit of work to do. 

I acquired some of the sounds from a youtube video which relayed open-sourced 1960’s sci fi sound effects. The rest of the sounds came from “opengameart.com”. Since both sources offered uncut sounds grouped into one file, I had to cut out the segments of the sounds I wanted using “Audacity”, a software program useful for sound manipulation which I was previously unfamiliar with. Finally, I had to convert the youtube video from mp4 to wav, and then to mp3. 
Once I had the sounds in the correct format and a link ready to go, I immediately realized that It was not going to be as simple as copying and pasting the sound links or playing back the sounds upon the click of a button. 

I decided to break the problem down into three steps: 

- The first was timing the sounds to play while the user would hold the buttons and stop playing when the users would release them. 

- The second was integrating the sounds into the clues playback sequences. This required understanding the timing system in place with the original tones as well as rewriting some of the code. 

- Third, I had to repeat step 2 for the “speed it up” challenge.

After some trial and error, I was finally able to time the sounds in accordance to the automated clue playbacks both for regular mode and “speed it up” mode. Needless to say, debugging this feature required more than one cup of coffee. 


3. What questions about web development do you have after completing your submission?

- How should I go about creating user authentication for players? 
- If I implemented a points system which ranks player scores, what would be the necessary steps to storing each user’s current scores and high scores on a cloud hosted   database? 
- Are there front end tools which reduce the number of lines of code it takes to create cool, aesthetic, and original animations? 
- Is there a limit to how complex I make this game (or websites in general) using basic CSS, HTML, and Javascript before user experience starts to suffer through         website slowdowns? 
- Are there alternatives to CSS which enable programmers to position elements on the screen in an easier fashion?


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific.

First, I would refactor all of the functions which have to do with the timer. Because of the approach I took in integrating the timer feature, I ended up writing a great deal of redundant code. I would try to abstract away the parts of the timer feature responsible for resetting the timer as well as reducing a player’s life. 

Second, I would implement a multiplayer mode in which two or more players on different systems could go head to head over the internet, testing their memories with the same patterns. 

Finally, I would allow for more user customizability of the visual experience. I would integrate a currency system which would enable the users to purchase custom fonts, background images, button animations, and sounds. 




## Interview Recording URL Link

[My 5-minute Interview Recording](https://youtu.be/XncjjIufU6g)


## License

    Copyright Ernesto Enriquez

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

