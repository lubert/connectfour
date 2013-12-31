(function runTests() {
    var tester = new ConnectFour();

    var assert = function (condition, num) {
        if (!condition) {
            throw 'Test ' + num + ': failed';
        } else {
            console.log('Test ' + num + ': passed');
        }
    }

    // Test 1 - Empty
    tester.setBoardModel([]);
    assert(!tester.checkWinner(), 1);

    // Test 2 - Vertical 1
    tester.setBoardModel(
        [   0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0
        ]
    );
    assert(tester.checkWinner(), 2);

    // Test 3 - Vertical 2
    tester.setBoardModel(
        [   1, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ]
    );
    assert(tester.checkWinner(), 3);

    // Test 4 - Vertical 3
    tester.setBoardModel(
        [   0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ]
    );
    assert(tester.checkWinner(), 4);

    // Test 5 - Vertical 4
    tester.setBoardModel(
        [   0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 1
        ]
    );
    assert(tester.checkWinner(), 5);

    // Test 6 - Vertical 5
    tester.setBoardModel(
        [   0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 2,
            0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 1
        ]
    );
    assert(!tester.checkWinner(), 6);

    // Test 7 - Horizontal 1
    tester.setBoardModel(
        [   0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 0, 0, 0
        ]
    );
    assert(tester.checkWinner(), 7);

    // Test 8 - Horizontal 2
    tester.setBoardModel(
        [   0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 1, 1, 1
        ]
    );
    assert(tester.checkWinner(), 8);

    // Test 9 - Horizontal 3
    tester.setBoardModel(
        [   1, 1, 1, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ]
    );
    assert(tester.checkWinner(), 9);

    // Test 10 - Horizontal 4
    tester.setBoardModel(
        [   0, 0, 0, 1, 1, 1, 1,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ]
    );
    assert(tester.checkWinner(), 10);

    // Test 11 - Horizontal 5
    tester.setBoardModel(
        [   0, 0, 0, 2, 1, 1, 1,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ]
    );
    assert(!tester.checkWinner(), 11);

    // Test 12 - Diagonal 1
    tester.setBoardModel(
        [   1, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ]
    );
    assert(tester.checkWinner(), 12);

    // Test 13 - Diagonal 2
    tester.setBoardModel(
        [   0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0
        ]
    );
    assert(tester.checkWinner(), 13);

    // Test 14 - Diagonal 3
    tester.setBoardModel(
        [   0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ]
    );
    assert(tester.checkWinner(), 14);

    // Test 15 - Diagonal 4
    tester.setBoardModel(
        [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 1
        ]
    );
    assert(tester.checkWinner(), 15);

    // Test 16 - Diagonal 5
    tester.setBoardModel(
        [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 2, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 1
        ]
    );
    assert(!tester.checkWinner(), 16);

    // Test 17 - Diagonal 6
    tester.setBoardModel(
        [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0
        ]
    );
    assert(tester.checkWinner(), 17);

    // Test 18 - Diagonal 7
    tester.setBoardModel(
        [
            0, 0, 0, 1, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ]
    );
    assert(tester.checkWinner(), 18);

    // Test 19 - Diagonal 8
    tester.setBoardModel(
        [
            0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ]
    );
    assert(tester.checkWinner(), 19);

    // Test 20 - Diagonal 9
    tester.setBoardModel(
        [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 1, 0, 0, 0
        ]
    );
    assert(tester.checkWinner(), 20);

    // Test 21 - Diagonal 10
    tester.setBoardModel(
        [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 2, 0, 0, 0
        ]
    );
    assert(!tester.checkWinner(), 21);

    // Test 22 - Tie
    tester.setBoardModel(
        [
            2, 1, 2, 2, 1, 2, 2,
            1, 2, 1, 1, 2, 1, 1,
            2, 1, 2, 2, 1, 2, 2,
            1, 2, 1, 1, 2, 1, 1,
            2, 1, 2, 2, 1, 2, 2,
            1, 2, 1, 1, 2, 1, 1
        ]
    );
    assert(!tester.checkWinner() && tester.checkFull(), 22);

}());
