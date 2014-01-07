# connectfour.js

Connect Four game implemented using jQuery, JavaScript, and CSS.  This was a programming assignment for a job interview.

## Usage ##
    <link href="css/connectfour.css" media="all" rel="stylesheet" type="text/css"/>
    <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
    <script src="js/connectfour.js"></script>
    <!-- Optional Unit Tests --!>
    <script src="js/connectfour-tests.js"></script>
```javascript
var boardDiv = document.getElementById('board');
var connectFour = new ConnectFour(boardDiv);
```

## TODO ##
- Rewrite animations.  It would be nice if the view could be tested/created independently of the model.  Then one could roll their own animations as well.
- Optimize checkWinner()
- Unit tests for animations