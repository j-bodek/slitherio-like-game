Easy slitherio like multiplayer game for two players

 # Technologies used to build it:
 - Python 
 - Django
 - Django-Channels
 - JavaScript
 - CSS
 - HTML
 - Redis
 
 # How moving works?
 To move our snake we need coordinates of his head, coordinates of mouse
 cursor and speed at which it should be moving. Then we calculate vector that has initial point
 in coordinates of snake head and end at cursor coordinates. After that we move head coordinates
 of vector with the same direction and sense but with magnitude equal speed.  
 
