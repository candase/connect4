(function () {
    var currentPlayer = "player1";
    var selectedColumn = $("div#column");
    var holes = $(".hole");
    var holeDiWinList = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [21, 26, 31, 36],
        [22, 27, 32, 37],
        [23, 28, 33, 38],
    ];
    var columnHighlightNumber = 0;

    $(document).on("keydown", function (e) {
        if (e.which === 39) {
            if (columnHighlightNumber == 6) {
                columnHighlightNumber = 0;
                $(".column6").removeClass(highlight);
                $(".column" + columnHighlightNumber).addClass(highlight);
            } else if (
                $(".column" + columnHighlightNumber).hasClass(highlight)
            ) {
                $(".column" + columnHighlightNumber).removeClass(highlight);
                columnHighlightNumber++;
                $(".column" + columnHighlightNumber).addClass(highlight);
            } else {
                $(".column" + columnHighlightNumber).addClass(highlight);
            }
        }
        if (e.which === 37) {
            if (columnHighlightNumber === 0) {
                columnHighlightNumber = 6;
                $(".column0").removeClass(highlight);
                $(".column" + columnHighlightNumber).addClass(highlight);
                console.log("all the way left");
            } else if (
                $(".column" + columnHighlightNumber).hasClass(highlight)
            ) {
                $(".column" + columnHighlightNumber).removeClass(highlight);
                columnHighlightNumber--;
                $(".column" + columnHighlightNumber).addClass(highlight);
            } else {
                $(".column" + columnHighlightNumber).addClass(highlight);
            }
        }
        if (e.which === 13) {
            $(".column" + columnHighlightNumber).removeClass(highlight);

            var slotsList = $(".column" + columnHighlightNumber).children();
            var slots = slotsList.children();
            $(".column" + columnHighlightNumber).removeClass(highlight);

            for (var i = 5; i >= 0; i--) {
                if (
                    !slots.eq(i).hasClass("player1") &&
                    !slots.eq(i).hasClass("player2")
                ) {
                    slots.eq(i).addClass(currentPlayer);
                    break;
                }
            }
            if (i == -1) {
                return;
            }
            checkVictory(slots);
            switchPlayer(currentPlayer);
            var color = $("." + currentPlayer).css("backgroundColor");
            $(".followMouse").css({
                backgroundColor: color,
                left: e.pageX,
                top: e.pageY,
            });
            columnHighlightNumber = 0;
        }
    });
    $(document).on("mousemove", function (e) {
        var color = $("." + currentPlayer).css("backgroundColor");
        $(".followMouse").css({
            backgroundColor: color,
            left: e.pageX,
            top: e.pageY,
        });
    });

    var highlight = "highlight1";

    selectedColumn.on("click", function (e) {
        var slotsList = $(e.currentTarget).children();
        var slots = slotsList.children();
        for (var j = 0; j < 7; j++) {
            $(".column" + j).removeClass(highlight);
        }
        for (var i = 5; i >= 0; i--) {
            if (
                !slots.eq(i).hasClass("player1") &&
                !slots.eq(i).hasClass("player2")
            ) {
                slots.eq(i).addClass(currentPlayer);
                break;
            }
        }
        if (i == -1) {
            return;
        }
        checkVictory(slots);
        switchPlayer(currentPlayer);
    });

    function checkVictory(slots) {
        var winCounter = 0;
        //column check
        for (var j = 0; j < slots.length; j++) {
            if (slots.eq(j).hasClass(currentPlayer)) {
                winCounter++;
                if (winCounter == 4) {
                    selectedColumn.off("click");
                    $(document).off("keydown");
                    slots.eq(j).addClass("glow");
                    slots.eq(j - 1).addClass("glow");
                    slots.eq(j - 2).addClass("glow");
                    slots.eq(j - 3).addClass("glow");
                    gameWon();
                    return;
                }
            } else {
                winCounter = 0;
            }
        }
        // row check
        for (j = 0; j < 7; j++) {
            var rowSlots = $("div.hole.row" + j);
            for (var k = 0; k < 7; k++) {
                if (rowSlots.eq(k).hasClass(currentPlayer)) {
                    winCounter++;
                    if (winCounter == 4) {
                        selectedColumn.off("click");
                        $(document).off("keydown");
                        rowSlots.eq(k).addClass("glow");
                        rowSlots.eq(k - 1).addClass("glow");
                        rowSlots.eq(k - 2).addClass("glow");
                        rowSlots.eq(k - 3).addClass("glow");
                        gameWon();
                        return;
                    }
                } else {
                    winCounter = 0;
                }
            }
        }

        // diagonal check

        for (j = 0; j < holeDiWinList.length; j++) {
            winCounter = 0;
            for (k = 0; k < 4; k++) {
                if (holes.eq(holeDiWinList[j][k]).hasClass(currentPlayer)) {
                    winCounter++;
                    if (winCounter == 4) {
                        selectedColumn.off("click");
                        $(document).off("keydown");
                        holes.eq(holeDiWinList[j][k]).addClass("glow");
                        holes.eq(holeDiWinList[j][k - 1]).addClass("glow");
                        holes.eq(holeDiWinList[j][k - 2]).addClass("glow");
                        holes.eq(holeDiWinList[j][k - 3]).addClass("glow");
                        gameWon();
                        return;
                    }
                } else {
                    winCounter = 0;
                }
            }
        }
    }
    function switchPlayer(player) {
        if (player == "player1") {
            currentPlayer = "player2";
            highlight = "highlight2";
        } else {
            currentPlayer = "player1";
            highlight = "highlight1";
        }
    }

    function gameWon() {
        var winnerColor;
        if (currentPlayer == "player1") {
            winnerColor = "Red";
        } else {
            winnerColor = "Green";
        }
        var winText =
            "<p class='dancer1'>👯‍♀️</p>" +
            "<p class='winText'>" +
            winnerColor +
            " won!!!!</p>" +
            "<p class='replay'>Replay!</p>" +
            "<p class='dancer2'>👯‍♀️</p>";
        $(".followMouse").css({
            visibility: "hidden",
        });
        $(".gameWon").css({
            opacity: "1",
            zIndex: "20",
        });
        $(".gameWon").html(winText);
        $(".replay").on("click", function () {
            location.reload();
        });
        moveDancer();
        setTimeout(changeColorGame, 1000);
        setTimeout(changeColorBody, 1200);
        setTimeout(changeColorBoard, 800);
    }

    function randomColor() {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        var newColor = "rgb(" + x + "," + y + "," + z + ")";
        return newColor;
    }
    function changeColorGame() {
        var color = randomColor();

        $(".gameWon").css({
            backgroundColor: color,
        });
        setTimeout(changeColorGame, 1000);
    }

    function changeColorBody() {
        var color = randomColor();

        $("body").css({
            backgroundColor: color,
        });
        setTimeout(changeColorBody, 1000);
    }

    function changeColorBoard() {
        var color = randomColor();

        $(".slot").css({
            backgroundColor: color,
        });
        setTimeout(changeColorBoard, 1000);
    }

    function moveDancer() {
        $(".dancer1").animate(
            {
                left: "-5vw",
            },
            6000,
            "linear",
            function () {
                $(".dancer1").css({
                    left: "100vw",
                });
            }
        );
        $(".dancer2").animate(
            {
                left: "100vw",
            },
            6000,
            "linear",
            function () {
                $(".dancer2").css({
                    left: "-5vw",
                });
            }
        );
        setTimeout(moveDancer, 6000);
    }
})();
