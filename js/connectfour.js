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

var board_model = [];
var player_turn = 1;
var anim_queue = $({});
//board_model[35] = 1;

/**
 * dropPiece
 *
 *
 * @param col_id
 * @param player
 * @returns position of drop
 */
function dropPiece(col_id, player) {
    for (var i = col_id + 35; i > 0; i -= 7) {
        if (!board_model[i]) {
            board_model[i] = player;
            return i;
        }
    }
}

function togglePlayer() {
    player_turn = player_turn === 1 ? 2 : 1;
}

function checkWinner(board_model) {
    for (var i = 0; i < board_model.length; i++) {
        for (var j = 1; j <= 2; j++) {
            // check vertical
            if (i <= 20) {
                if (board_model[i] === j && board_model[i + 7] === j && board_model[i + 14] === j && board_model[i + 21] === j) {
                    alert('player ' + j + ' is the winner!');
                    return true;
                }
            }
            // check horizontal
            if (i % 7 <= 3) {
                if (board_model[i] === j && board_model[i + 1] === j && board_model[i + 2] === j && board_model[i + 3] === j) {
                    alert('player ' + j + ' is the winner!');
                    return true;
                }
            }
            // check diagonal down right
            if (i % 7 <= 3 && i <= 20) {
                if (board_model[i] === j && board_model[i + 8] === j && board_model[i + 16] === j && board_model[i + 24] === j) {
                    alert('player ' + j + ' is the winner!');
                    return true;
                }
            }

            // check diagonal down left
            if ((i % 7 >= 3 && i <= 20)) {
                if (board_model[i] === j && board_model[i + 6] === j && board_model[i + 12] === j && board_model[i + 18] === j) {
                    alert('player ' + j + ' is the winner!');
                    return true;
                }
            }
        }
    }
}

//alert(dropPiece(0));

function move(element, newParent, isAnimated, callback) {
    element = $(element); //Allow passing in either a JQuery object or selector
    newParent = $(newParent); //Allow passing in either a JQuery object or selector
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
}

function createBoard() {
    var board = document.getElementById('board');
    var tbl = document.createElement('table');
    tbl.style['border-spacing'] = 0;
    var colgrp = document.createElement('colgroup');
    var tbdy = document.createElement('tbody');

    // create columns
    for (var i = 0; i < 7; i++) {
        var col = document.createElement('col');
        col.className = 'board-col';
        colgrp.appendChild(col);
    }

    // create drop zone
    var top = document.createElement('tr');
    top.className = 'board-row';
    for (var i = 0; i < 7; i++) {
        var td = document.createElement('td');
        td.id = 'top' + i;

        // hover
        $(td).hover(function () {
            if (!document.getElementById('new')) {
                var piece = document.createElement('div');
                piece.id = 'new';
                piece.className = player_turn === 1 ? 'piece red-piece' : 'piece black-piece';
                $(this).append(piece);
            }
            move('#new', $(this), false);
        }, null);


        // click
        $(td).click(function () {
            document.getElementById('new').id = 'moving';
            togglePlayer();
            var col = parseInt($(this).attr('id').substring(3));
            var target = dropPiece(col);
            move('#moving', '#' + target, true, function (element) {
                board_model[target] = player_turn;
                element.removeAttr('id');
                checkWinner(board_model);
            });
        });

        top.appendChild(td);
    }
    tbdy.appendChild(top);

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

        tbdy.appendChild(tr);
    }
    tbl.appendChild(colgrp);
    tbl.appendChild(tbdy);
    board.appendChild(tbl)
}

createBoard();