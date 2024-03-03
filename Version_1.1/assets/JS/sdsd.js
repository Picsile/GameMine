if (players[currentCharacter]['ControlKeys'].slice(4, 8).includes(event.code)) {
    event.preventDefault();
    setTimeout(() => {

        if (event.code == players[currentCharacter]['ControlKeys'].slice(4, 5)) {
            if (World.map[Math.round(players[currentCharacter]['cordY']) - 2][players[currentCharacter]['cordX']][0] != undefined) {
                players[currentCharacter].breakBlock(event.code);
            }
        }

        if (event.code == players[currentCharacter]['ControlKeys'].slice(5, 6)) {
            if (World.map[Math.round(players[currentCharacter]['cordY']) + 1][players[currentCharacter]['cordX']][0] != undefined) {
                players[currentCharacter].breakBlock(event.code);
            }
        }

        if (event.code == players[currentCharacter]['ControlKeys'].slice(6, 7)) {
            if (World.map[Math.round(players[currentCharacter]['cordY']) - 1][players[currentCharacter]['cordX'] + players[currentCharacter]['side'] * (-1)][0] != undefined) {
                players[currentCharacter].breakBlock(event.code);
            }
        }

        if (event.code == players[currentCharacter]['ControlKeys'].slice(7, 8)) {
            if (World.map[Math.round(players[currentCharacter]['cordY'])][players[currentCharacter]['cordX'] + players[currentCharacter]['side'] * (-1)][0] != undefined) {
                players[currentCharacter].breakBlock(event.code);
            }
        }

    }, 40)
}