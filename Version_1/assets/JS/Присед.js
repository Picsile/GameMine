// Присед
if (key == 'KeyS') {
        
    if (players[0]['shift'] == 0) {

        players[0]['shift'] = 1;
        players[1]['cordY'] *= 1.015;
        players[1]['height'] = 95;
        upDatePlayer2();

} else {

    players[0]['shift'] = 0;
            players[1]['cordY'] /= 1.015;
            players[1]['height'] = 100;

            // Костыль фикса бага с прыжком
            if (Math.round(players[1]['cordY']) != players[1]['cordY']) {
                players[1]['cordY'] = Math.round(players[1]['cordY']);
            }

            upDatePlayer2();
}
}


// Присед старый
if (key == 'KeyS') {

    if (players[1]['height'] == 100) {
        players[1]['cordY'] *= 1.015;
        players[1]['height'] = 95;
        upDatePlayer2();
    }

    setTimeout(() => {
        if (players[1]['height'] != 100) {
            players[1]['cordY'] /= 1.015;
            players[1]['height'] = 100;

            // Костыль фикса бага с прыжком
            if (Math.round(players[1]['cordY']) != players[1]['cordY']) {
                players[1]['cordY'] = Math.round(players[1]['cordY']);
            }
            upDatePlayer2();
        }
    }, 100)
}