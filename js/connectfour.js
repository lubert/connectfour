/*

 Connect 4 board representation

 .  .  .  .  .  .  .  TOP
 0  1  2  3  4  5  6
 7  8  9  10 11 12 13
 14 15 16 17 18 19 20
 21 22 23 24 25 26 27
 28 29 30 31 32 33 34
 35 36 37 38 39 40 41  BOTTOM

 */

var ConnectFour = (function (document) {
    'use strict';

    var ConnectFour = function (div) {
        this.boardDiv = div;
        this.newGame();
    };

    ConnectFour.prototype.newGame = function () {
        this.boardDiv.innerHTML = '';
        this.boardModel = [];
        this.boardView = [];
        this.playerTurn = [];
        this.gameOver = false;
        this.initBoard();
    }

    ConnectFour.prototype.initBoard = function () {
        var self = this;

        var table = document.createElement('table');
        table.className = 'board-table';

        var colgroup = document.createElement('colgroup');
        var tbody = document.createElement('tbody');

        // create table columns
        for (var i = 0; i < 7; i++) {
            var col = document.createElement('col');
            col.className = 'board-col';
            colgroup.appendChild(col);
        }

        // create drop row
        var top = document.createElement('tr');
        top.className = 'board-row';
        for (var i = 0; i < 7; i++) {
            var td = document.createElement('td');
            td.id = 'top' + i;

            // on hover effect
            $(td).hover(function () {
                if (!self.gameOver && !document.getElementById('activePiece')) {
                    var piece = document.createElement('div');
                    piece.id = 'activePiece';
                    piece.className = self.playerTurn === 1 ? 'piece red-piece' : 'piece black-piece';
                    $(this).append(piece);
                }
                self.move('#activePiece', $(this), false);
            }, null);


            // on click animation
            $(td).click(function () {
                if (!self.gameOver && document.getElementById('activePiece')) {
                    var col = parseInt($(this).attr('id').substring(3));
                    var target = self.getOpenCell(col);
                    if (target != -1) {
                        document.getElementById('activePiece').id = 'moving';
                        self.togglePlayer();
                        self.boardModel[target] = self.playerTurn;
                        self.checkWinner(function (hasWinner, player) {
                            if (hasWinner) {
                                self.gameOver = true;
                                self.move('#moving', '#' + target, true, function (element) {
                                    element.removeAttr('id');
                                    alert('Player ' + player + ' has won!');
                                });
                            } else {
                                self.checkFull(function (isFull) {
                                    if (isFull) {
                                        self.gameOver = true;
                                        self.move('#moving', '#' + target, true, function (element) {
                                            element.removeAttr('id');
                                            alert('Tie!');
                                        });
                                    } else {
                                        self.move('#moving', '#' + target, true, function (element) {
                                            element.removeAttr('id');
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });

            top.appendChild(td);
        }
        tbody.appendChild(top);

        // create rows and cells
        var cell_id = 0;
        for (var i = 0; i < 6; i++) {
            var tr = document.createElement('tr');

            tr.className = 'board-row';

            for (var j = 0; j < 7; j++) {
                // add id according to representation
                var td = document.createElement('td');
                td.id = cell_id;
                cell_id++;

                td.className = 'board-cell';
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        table.appendChild(colgroup);
        table.appendChild(tbody);
        this.boardDiv.appendChild(table);
    };

    ConnectFour.prototype.getOpenCell = function (col_id) {
        for (var i = col_id + 35; i >= 0; i -= 7) {
            if (!this.boardModel[i]) {
                this.boardModel[i] = this.playerTurn;
                return i;
            }
        }
        return -1;
    };

    ConnectFour.prototype.move = function (element, newParent, isAnimated, callback) {
        element = $(element);
        newParent = $(newParent);
        if (isAnimated) {
            var oldOffset = element.offset();
            element.appendTo(newParent);
            var newOffset = element.offset();

            var temp = element.clone().appendTo('body');
            temp.css('position', 'absolute')
                .css('left', oldOffset.left)
                .css('top', oldOffset.top)
            element.hide();
            temp.animate({'top': newOffset.top, 'left': newOffset.left}, 'slow', function () {
                element.show();
                temp.remove();
                if (callback) {
                    callback(element);
                }
            });
        } else {
            element.appendTo(newParent);
            if (callback) {
                callback(element);
            }
        }
    };

    ConnectFour.prototype.togglePlayer = function () {
        this.playerTurn = this.playerTurn === 1 ? 2 : 1;
    };

    ConnectFour.prototype.checkWinner = function (callback) {
        var boardModel = this.boardModel;

        for (var i = 0; i < boardModel.length; i++) {
            for (var player = 1; player <= 2; player++) {
                // check vertical
                if (i <= 20) {
                    if (boardModel[i] === player && boardModel[i + 7] === player && boardModel[i + 14] === player && boardModel[i + 21] === player) {
                        callback(true, player);
                    }
                }
                // check horizontal
                if (i % 7 <= 3) {
                    if (boardModel[i] === player && boardModel[i + 1] === player && boardModel[i + 2] === player && boardModel[i + 3] === player) {
                        callback(true, player);
                    }
                }
                // check diagonal down right
                if (i % 7 <= 3 && i <= 20) {
                    if (boardModel[i] === player && boardModel[i + 8] === player && boardModel[i + 16] === player && boardModel[i + 24] === player) {
                        callback(true, player);
                    }
                }

                // check diagonal down left
                if ((i % 7 >= 3 && i <= 20)) {
                    if (boardModel[i] === player && boardModel[i + 6] === player && boardModel[i + 12] === player && boardModel[i + 18] === player) {
                        callback(true, player);
                    }
                }
            }
        }
        callback(false);
    };

    ConnectFour.prototype.checkFull = function (callback) {
        var isFull = true;
        for (var i = 0; i < 42; i++) {
            if (!this.boardModel[i]) {
                isFull = false;
                break;
            }
        }
        callback(isFull);
    };

    ConnectFour.prototype.runTests = function () {
        var assert = function (condition, success, err) {
            if (!condition) {
                throw err;
            } else {
                console.log(success);
            }
        }

        // Test 1 - Empty
        this.boardModel = [];
        this.checkWinner(function(hasWinner) {
            assert(hasWinner === false, 'Test 1: passed', 'Test 1: failed');
        });

        // Test 2 - Vertical 1
        this.boardModel =
            [   0,  0,  0,  0,  0,  0,  0,
                0,  0,  0,  0,  0,  0,  0,
                1,  0,  0,  0,  0,  0,  0,
                1,  0,  0,  0,  0,  0,  0,
                1,  0,  0,  0,  0,  0,  0,
                1,  0,  0,  0,  0,  0,  0
            ];
        this.checkWinner(function(hasWinner) {
            assert(hasWinner === true, 'Test 2: passed', 'Test 2: failed');
        });

        // Test 3 - Vertical 2
        this.boardModel =
            [   1,  0,  0,  0,  0,  0,  0,
                1,  0,  0,  0,  0,  0,  0,
                1,  0,  0,  0,  0,  0,  0,
                1,  0,  0,  0,  0,  0,  0,
                0,  0,  0,  0,  0,  0,  0,
                0,  0,  0,  0,  0,  0,  0
            ];
        this.checkWinner(function(hasWinner) {
            assert(hasWinner === true, 'Test 3: passed', 'Test 3: failed');
        });

        // Test 4 - Vertical 3
        this.boardModel =
            [   0,  0,  0,  0,  0,  0,  1,
                0,  0,  0,  0,  0,  0,  1,
                0,  0,  0,  0,  0,  0,  1,
                0,  0,  0,  0,  0,  0,  1,
                0,  0,  0,  0,  0,  0,  0,
                0,  0,  0,  0,  0,  0,  0
            ];
        this.checkWinner(function(hasWinner) {
            assert(hasWinner === true, 'Test 4: passed', 'Test 4: failed');
        });

        // Test 5 - Vertical 4
        this.boardModel =
            [   0,  0,  0,  0,  0,  0,  0,
                0,  0,  0,  0,  0,  0,  0,
                0,  0,  0,  0,  0,  0,  1,
                0,  0,  0,  0,  0,  0,  1,
                0,  0,  0,  0,  0,  0,  1,
                0,  0,  0,  0,  0,  0,  1
            ];
        this.checkWinner(function(hasWinner) {
            assert(hasWinner === true, 'Test 5: passed', 'Test 5: failed');
        });

        this.newGame();
        
        // test horizontal

    }

    return ConnectFour;
})(document);