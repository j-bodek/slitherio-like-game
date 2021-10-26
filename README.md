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
 
![](https://github.com/LilJack118/slitherio-like-game/blob/master/snake_vector.png?raw=true)

# How destroying snake works?
If distance between snake head and any map border is less then head radius
or if distance between point at the front of snake head 
and center of any oponent snake part is less then radius of snake head then destroy snake.

# How multiplayer works?
If two players are connected to server send message that begin game. After receiving that message
calculate variables needed to change snake position and send them back to server. When server receive messages from both players 
it send it to both of them and after receiving messages updateing each snake moving direction,speed etc. That keeps repeat until 
game end.
