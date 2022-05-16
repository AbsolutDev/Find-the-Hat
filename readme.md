#Find The Hat#

This is a project from the **Codecademy PRO** path for **Front-End Engineer** at the end of the **JavaScript Syntax, Part III course** on **Classes**.

The project goal is to build an interactive terminal game in which the player has lost their hat in a field full of holes and they must navigate back to it without failling down one of the holes or stepping outside of the field.

##Game instructions##

The player is marked using *, the wholes as O and the hat is ^. You can move using up/down/left/right.
First time it is run, the game will prompt the user for the width and height of the field (between 3 and 50 each) as well as the difficulty level (1-3) which sets the number of wholes (10, 20 or 30%, respectively).

##Personal Approach##

I have made the game prompt if the user wants to try again and, if so, if it should keep the width/height/level settings or reinitialize them as well.

Finally, instead of losing the game when moving outside the field, I have constrained the movement so nothing happens if the user tries to "step outside" the edge.