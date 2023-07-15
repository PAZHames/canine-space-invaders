# Canine Your-Space-invaders


A JavaScript Space Invaders style game built using a canvas. I initially built a basic version of this game using a tutorial, writing comments to myself along the way to ensure I understood the logic. I then removed those comments which would not be particularly helpful for future maintenance. Once I was certain I had a full grasp of the game’s basic functioning, I began adding my own components. I started with the images within the game play functioning and then added levels. I then built the game over and game won functions. I then worked on the CSS for the landing and game pages. Afterwards I began adding in the logic for the leaderboard and adding scores and details to local storage. 

# How to Play
Use the following controls to play Canine Space Invaders:

Left/Right Arrows: Move your character left or right.
Space Bar: Fling tennis balls to attack the invaders.

# Inspiration

This game is inspired by and in homage to my dog Peggy and the years of lost shoes and stolen dinners. It is also inspired by a friend whose dog recently chewed up her passport just before she was due to fly to Japan. A faultless way to ensure his owner did not leave him and on some level very, very funny. I am sure she will agree the creation of this game made it all worth it. 

# What I have done differently 

- Added a landing page with instructions and buttons which link to both the game page and the leaderboard
- Sourced and added in images for the dog, humans and ball in the game board. Created a custom board background. 
- Created a randomised selection of humans from two images, rather than just having the same image for each one. 
- Added levels and their corresponding prize images which display when certain points thresholds are reached.
- Added a win threshold after which a GAME WON screen is triggered and the form pops up to enter details for the leaderboard. 
- Added a GAME OVER screen
- Created a pop up form which elicits name and chosen image from the player and stores them as an object in local storage. 

# Challenges 

Creating the randomised humans. The steps for this were:
- I created the function
- Put it in createHumans function
- Put it outside and called it from inside the for loop
- Cleaned my code - was accidentally declaring humanImg elsewhere

I toyed with making this responsive, but as it requires/would be less fun without the key strokes, it seemed like an unnecessary task to make it playable on a mobile. It also keeps it in the retro parameters of space invaders, which I really like. 

# What I still want to improve

The humans bunch up when they move further down the board. 
I have extensively played with velocity to try and fix this, but no luck so far. I have also asked Chat GPT and several of the mentors. I think the answer may lie in the fact that I have halved the human width to make the graphics work better, but I am still trying to figure out the interplay. I managed to solve this when they were one tile wide, but they then looked, apparently, like fat little gnomes. We all agree the answer is in there somewhere but still trying to find it!

The leaderboard. The pop-up form appears on game over or game won, takes the player’s information and stores it in local storage. I have done a lot of cleaning of this code to try and get rid of any unnecessary weight. I have also gone through, placing console.logs at different points to find out where the code is being stopped. I managed to unblock it at various points (openPopup being one of them), but am currently stuck at handleSubmit. As such, the details are stored but the leaderboard will not display. Currently Chat GPT has no ideas. I shall prevail. 

# Future 

- Add peril! Make the humans throw balls back at you at random intervals. If you are hit by one it’s game over. 
- Ramp up speed increase as the game moves on. Possibly change it so each contingent of humans only increases by either a column or row. This would mean the game was playable for longer. Adjust level scores accordingly so the win threshold is higher. 
