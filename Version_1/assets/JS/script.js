// Получаем объекты
const body = document.getElementsByTagName('body')[0];
const screenWidth = window.screen.width;

const blocksBehindDiv = document.getElementById('blocksBehind');
const blocksDiv = document.getElementById('blocks');

const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

// Переменные для анимацийwdwd
let animPlayer1X = '';
let animPlayer1Y = '';
let animPlayer2X = '';
let animPlayer2Y = '';

// Подстраиваем разрешение
// body.style.zoom = 1850 / screenWidth * 0.665;
console.log('Zoom: ', body.style.zoom);

// Переменные
const blocks = [
    { 'src': 'assets/img/textures/Блок трава.jpg', 'collision': 1 },
    { 'src': 'assets/img/textures/Блок грязь.jpg', 'collision': 1 },
    { 'src': 'assets/img/textures/Блок камень.jpg', 'collision': 1 },
    { 'src': 'assets/img/textures/Блок бедрок.jpg', 'collision': 1 },
    { 'src': 'assets/img/textures/Блок доски.jpg', 'collision': 1 },
    { 'src': 'assets/img/textures/Блок заборинка.png', 'collision': 0 },
    { 'src': 'assets/img/textures/Вагонетка2.png', 'collision': 0 },
    { 'src': 'assets/img/textures/Факел наклонённый.gif', 'collision': 0 },
    { 'src': 'assets/img/textures/Рельсы.png', 'collision': 0 },
];

const blocksBehind = [
    { 'src': 'assets/img/textures/Блок трава2.jpg', 'collision': 0 },
    { 'src': 'assets/img/textures/Блок грязь2.jpg', 'collision': 0 },
    { 'src': 'assets/img/textures/Блок камень2.jpg', 'collision': 0 },
    { 'src': 'assets/img/textures/Блок бедрок.jpg', 'collision': 1 }
];

let players = [
    {
        'src': 'assets/img/players/Стив.png',
        'cordX': 0,
        'cordY': 0,
        'side': -1,
        'width': 50,
        'height': 100,
        'shift': 0
    },
    {
        'src': 'assets/img/players/Алекс.png',
        'cordX': 0,
        'cordY': 0,
        'side': -1,
        'width': 50,
        'height': 100,
        'shift': 0
    },
];

let map = [];
let mapBehind = [];


// Генерация мира
function generateMap() {


    // Генерация структуры массива
    function generationArray(width, height) {
        map = [];

        for (let i = 0; i < height; i++) {
            map.push([]);
            for (let j = 0; j < width; j++) {
                map[i].push([]);
            }
        }
    }
    generationArray(80, 80);


    // Генерация шаблона
    function generationTemplate() {

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map.length; j++) {

                if (i == 7) {
                    if (j > 1) {
                        if (map[i][j - 2][0] == undefined && map[i][j - 1][0] != undefined) {

                            // Увеличиваем шанс двойного блока
                            if (!Math.floor(Math.random() * 5) == 0) {
                                map[i][j] = [0];
                            }
                        } else {

                            // Как с 2 Первыми и последними
                            if (Math.floor(Math.random() * 10) == 0) {
                                map[i][j] = [0];
                            }
                        }
                    } else {

                        // Для 2 первых
                        if (Math.floor(Math.random() * 10) == 0) {
                            map[i][j] = [0];
                        }
                    }
                }

                if (i >= 8 && i < 15) {
                    if (j > 0 && j < map[i].length - 1) {
                        if (map[i - 1][j][0] == undefined) {

                            // Если между, то 100%
                            if (map[i - 1][j - 1][0] != undefined || map[i - 1][j + 1][0] != undefined) {
                                map[i][j] = [0];
                            }

                            //  Просто шанс
                            if (Math.floor(Math.random() * 5) == 0) {
                                map[i][j] = [0];
                            }
                        } else {

                            // Если сверху есть блок
                            if (map[i - 1][j][0] != undefined && map[i - 2][j][0] != undefined && map[i - 3][j][0] != undefined && map[i - 4][j][0] != undefined) {

                                // Eсли слишком много блоков
                                if (!Math.floor(Math.random() * 10) == 0) {

                                    // Просто шанс
                                    map[i][j] = [2];

                                } else map[i][j] = [1];

                            } else map[i][j] = [1];

                        }
                    } else {

                        // Если сверху первого и последнего что-то есть                 
                        if (map[i - 1][j][0] != undefined) {
                            map[i][j] = [1];
                        } else {

                            //  Просто шанс
                            if (!Math.floor(Math.random() * 7) == 0) {
                                map[i][j] = [0];
                            }
                        }
                    }
                }

                if (i >= 15 && i < map.length - 1) {
                    map[i][j] = [2];
                }

                if (i == map.length - 1) {
                    if (Math.floor(Math.random() * 6) == 0) {
                        map[i - 2][j] = [3];
                    }
                    if (Math.floor(Math.random() * 2) == 0) {
                        map[i - 1][j] = [3];
                    }
                    map[i][j] = [3];
                }
            }
        }
    }
    generationTemplate();


    // Убираю лишние блоки
    function removeExtraBlocks() {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map.length; j++) {

                if (j > 1 && j < map[i].length - 1) {

                    if (map[i][j][0] != undefined && map[i][j - 1][0] == undefined && map[i][j + 1][0] == undefined) {
                        map[i][j] = [];
                        map[i + 1][j] = [0];
                    }
                }
            }
        }
    }
    removeExtraBlocks();


    // Создаём вторичный массив
    mapBehind = map;
    upDateMapBehind();


    // Генерация пещер
    function generateCave(y, x) {
        let widthCave = Math.floor(Math.random() * 8) + 5;
        let heightCave = Math.floor(Math.random() * 3) + 2;

        if (map[0].length >= (x + widthCave) && map.length - 3 >= (y + heightCave)) {

            for (let i = y; i < y + heightCave; i++) {
                for (let j = x; j < x + widthCave; j++) {

                    if (i == y) {
                        if (j - 5 > x && j + 5 < x + widthCave)
                            if (Math.floor(Math.random() * 10) == 0) {
                                map[i][j] = [];
                            } 
                    }

                    if (i > y && i <= y + heightCave / 2) {

                        if (map[i - 1][j][0] == undefined) {
                            map[i][j] = [];
                        } else {

                            if (j - 2 > x && j + 2 < x + widthCave) {

                                if (map[i - 1][j - 1][0] == undefined) {
                                    if (!Math.floor(Math.random() * 5) == 0) {
                                        map[i][j] = [];
                                    }
                                }

                                if (map[i - 1][j + 1][0] == undefined) {
                                    if (!Math.floor(Math.random() * 5) == 0) {
                                        map[i][j] = [];
                                    }
                                }

                                if (map[i - 1][j + 2][0] == undefined) {
                                    if (Math.floor(Math.random() * 2) == 0) {
                                        map[i][j] = [];
                                    }
                                }

                                // if (map[i - 1][j + 2][0] == undefined) {
                                //     if (Math.floor(Math.random() * 2)) {
                                //         map[i][j] = [];
                                //     }
                                // }
                            }
                        }
                    }

                    if (i > y + heightCave / 2) {
                        if (map[i - 1][j][0] != undefined) {

                        } else {
                            if (Math.floor(Math.random() * 2) == 0) {
                                map[i][j] = []
                            } else map[i][j] = [2]
                        }
                    }
                }
            }
        }
    }
    function generationPlaceCave() {

        for (let i = 0; i < map.length; i++) {

            for (let j = 0; j < map[0].length; j++) {

                if (i > 9 && j + 5 < map[0].length && map[i-3][j+5][0] != undefined) {
                    if (Math.floor(Math.random() * 4) == 0) {
                        generateCave(i, j);
                    }
                }
            }
        }
    }
    generationPlaceCave()


    // Генерация шахт
    function generationMine() {
        let structuresMine = [
            [
                [[2],[2],[2],[2],[2]],
                [[],[7],[4],[7],[]],
                [[],[],[5],[],[]],
                [[8],[8],[5],[8],[8]],
                [[4],[4],[4],[4],[4]]
            ],
            [
                [[2],[2],[2],[2],[2]],
                [[],[],[],[],[]],
                [[],[],[],[],[]],
                [[8],[8],[6],[8],[8]],
                [[4],[4],[4],[4],[4]]
            ],
            [
                [[2],[2],[2],[2],[2]],
                [[],[],[],[],[]],
                [[],[],[],[],[]],
                [[8],[8],[8],[8],[8]],
                [[4],[4],[4],[4],[4]]
            ],
        ]

        // Пробегаемся по карте
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[0].length; j++) {
                
                
                // Проверка на пустую ячейку
                if (i > 15 && j < map[i-3][j][0] != undefined) {

                    // Шанс генерации
                    if (Math.floor(Math.random()*2000) == 0) {
                       let widthMine =  Math.floor(Math.random()*3) + 3 * 5;
                       let heightMine =  Math.floor(Math.random()*2) + 2 * 5;
                       let cell = 0;
                       
                       // Проверка что шахта не слишком огромная
                       if (i + heightMine < map.length - 5 && j + widthMine < map[0].length - 5) {
                        
                        // for (let i = 0; i < array.length; i++) {
                        //     for (let j = 0; j < array.length; j++) {

                        //     }                   
                        // }

                        for (let o = i; o < i + heightMine; o+=5) {
                            for (let k = j; k < j + widthMine; k+=5) {
            
                                // Генерация яцейки
                                if (cell == 1 || cell == 2) {
                                    cell = 0;
                                } else {
                                    if (Math.floor(Math.random()*3) == 0) {
                                        cell = 1;
                                    } else cell = 2;
                                }
                                

                                for (let p = 0; p < 5; p++) {
                                    for (let l = 0; l < 5; l++) {
                                        console.log();
                                        map[o+p][k+l] = structuresMine[cell][p][l];
                                    }
                                }
                                
                            }
                        }
                       }

                    }
                }
            }  
        }
    }
    generationMine();


    generatePlayers();
    upDateMap();
}
generateMap();


// Генерация игроков
function generatePlayers() {
    let i = 0;
    players[0]['cordY'] = 0;
    players[1]['cordY'] = 0;

    map.forEach(strock => {
        if (strock[Math.round(strock.length / 30)][0] !== undefined && players[0]['cordY'] == 0) {
            players[0]['cordY'] = i - 2;
            players[0]['cordX'] = Math.round(strock.length / 30);
        }

        if (strock[Math.round(strock.length / 30 + 1)][0] !== undefined && players[1]['cordY'] == 0) {
            players[1]['cordY'] = i - 2;
            players[1]['cordX'] = Math.round(strock.length / 30 + 1);
        }

        i++;
    });

    upDatePlayer1(3);
    upDatePlayer2(3);
}


// Вывод мира
function upDateMap() {
    let mapHTML = ``;
    let i = 0;
    let j = 0;

    map.forEach(strock => {

        strock.forEach(block => {

            if (block[0] !== undefined) {
                mapHTML += `<div class="block" style = "margin-top: ${i * 50}px; margin-left: ${j * 50}px;"><img src = "${blocks[block[0]]['src']}" width="50px" height="50px"></div>
                `
            }
            j++;
        });
        j = 0;
        i++;
    });

    blocksDiv.innerHTML = mapHTML;

    checkBlockDown();
}


function upDateMapBehind() {
    let mapBehindHTML = ``;
    let i = 0;
    let j = 0;

    map.forEach(strock => {

        strock.forEach(block => {

            if (block[0] !== undefined) {
                mapBehindHTML += `<div class="block" style = "margin-top: ${i * 50}px; margin-left: ${j * 50}px;"><img src = "${blocksBehind[block[0]]['src']}" width="50px" height="50px"></div>
                `
            }
            j++;
        });
        j = 0;
        i++;
    });

    blocksBehindDiv.innerHTML = mapBehindHTML;
}


// Вывод игроков
function upDatePlayer1(b) {
    let player1HTML = ``;

    player1HTML += `<div class="player" style = "margin-top: ${players[0]['cordY'] * 50 - 50}px; margin-left: ${players[0]['cordX'] * 50}px;">
    <div class = "anim">
    <div id = "animPlayer1X">
    <div id = "animPlayer1Y">
    <img width="${players[0]['width']}" height="${players[0]['height']}" src = "${players[0]['src']}" style = "transform: scale(${players[0]['side']}, 1);">
    </div>
    </div>
    </div>
    </div>`;

    player1.innerHTML = player1HTML;

    animPlayer1X = document.getElementById('animPlayer1X');
    animPlayer1Y = document.getElementById('animPlayer1Y');

    switch (b) {
        case 0: animPlayer1X.style.animation = 'MovementFront 0.2s ease-out';
            break;
        case 1: animPlayer1X.style.animation = 'MovementBehind 0.2s ease-out';
            break;
        case 2: animPlayer1Y.style.animation = 'MovementUp 0.1s ease-out';
            break;
        case 3: animPlayer1Y.style.animation = 'MovementDown 0.1s ease-in';
            break;
    }

    checkBlockDown();
}


function upDatePlayer2(b) {
    let player2HTML = ``;

    player2HTML += `<div class="player" style = "margin-top: ${players[1]['cordY'] * 50 - 50}px; margin-left: ${players[1]['cordX'] * 50}px;"><div class = "anim"><div id = "animPlayer2"><img width="${players[1]['width']}" height="${players[1]['height']}" src = "${players[1]['src']}" style = "transform: scale(${players[1]['side']}, 1);"></div></div></div>`;

    player2.innerHTML = player2HTML;

    animPlayer2 = document.getElementById('animPlayer2');

    switch (b) {
        case 0: animPlayer2.style.animation = 'MovementFront 0.2s ease-out';
            break;
        case 1: animPlayer2.style.animation = 'MovementBehind 0.2s ease-out';
            break;
        case 2: animPlayer2.style.animation = 'MovementUp 0.1s ease-out';

            break;
        case 3: animPlayer2.style.animation = 'MovementDown 0.1s ease-in';
            break;
    }

    checkBlockDown();
}


// Падение
function checkBlockDown() {
    let dop1 = 0;
    let dop2 = 0;

    if (dop1 == 0) {

        dop1 = 1;
        setTimeout(() => {

            if (map[Math.round(players[0]['cordY']) + 1][players[0]['cordX']][0] === undefined) {
                players[0]['cordY'] += 1;
                upDatePlayer1(3);
            }

            dop1 = 0;
        }, 200);
    }

    if (dop2 == 0) {

        dop2 = 1;
        setTimeout(() => {

            if (map[players[1]['cordY'] + 1][players[1]['cordX']][0] === undefined) {
                players[1]['cordY'] += 1;
                upDatePlayer2(3);
            }

            dop2 = 0;
        }, 200);
    }
}


// Передвижение игроков
function movementPlayer1(key) {

    // Движение влево
    if (key == 'ArrowLeft') {
        if (players[0]['side'] == 1 && players[0]['cordX'] > 0) {

            if (map[players[0]['cordY']][players[0]['cordX'] - 1][0] === undefined && map[players[0]['cordY'] - 1][players[0]['cordX'] - 1][0] === undefined) {
                players[0]['cordX'] -= 1;
                upDatePlayer1(1);

            }
        } else {
            players[0]['side'] = 1
            upDatePlayer1();
        }
    }

    // Движение вправо
    if (key == 'ArrowRight') {
        if (players[0]['side'] == -1 && players[0]['cordX'] < map[0].length - 1) {

            if (map[players[0]['cordY']][players[0]['cordX'] + 1][0] === undefined && map[players[0]['cordY'] - 1][players[0]['cordX'] + 1][0] === undefined) {
                players[0]['cordX'] += 1;
                upDatePlayer1(0);
            }

        } else {
            players[0]['side'] = -1
            upDatePlayer1();
        }
    }

    // Прыжок
    if (key == 'ArrowUp') {
        if (players[0]['cordY'] > 2) {

            if (map[players[0]['cordY'] - 2][players[0]['cordX']][0] === undefined && map[players[0]['cordY'] + 1][players[0]['cordX']][0] !== undefined) {
                players[0]['cordY'] -= 1;
                upDatePlayer1(2);
            }

        }
    }

    // Присед
    if (key == 'ArrowDown') {

        if (players[0]['shift'] == 0) {

            players[0]['shift'] = 1
            players[0]['cordY'] *= 1.015;
            players[0]['height'] = 95;
            upDatePlayer1();

        } else {

            players[0]['shift'] = 0;
            players[0]['cordY'] /= 1.015;
            players[0]['height'] = 100;

            // Костыль фикса бага с прыжком
            if (Math.round(players[0]['cordY']) != players[0]['cordY']) {
                players[0]['cordY'] = Math.round(players[0]['cordY']);
            }

            upDatePlayer1();
        }
    }
}


function movementPlayer2(key) {

    // Движение влево
    if (key == 'KeyA') {
        if (players[1]['side'] == 1 && players[1]['cordX'] > 0) {

            if (map[players[1]['cordY']][players[1]['cordX'] - 1][0] === undefined && map[players[1]['cordY'] - 1][players[1]['cordX'] - 1][0] === undefined) {
                players[1]['cordX'] -= 1;
                upDatePlayer2(1);
            }
        } else {
            players[1]['side'] = 1
            upDatePlayer2();
        }
    }

    // Движение вправо
    if (key == 'KeyD') {
        if (players[1]['side'] == -1 && players[1]['cordX'] < map[0].length - 1) {

            if (map[players[1]['cordY']][players[1]['cordX'] + 1][0] === undefined && map[players[1]['cordY'] - 1][players[1]['cordX'] + 1][0] === undefined) {
                players[1]['cordX'] += 1;
                upDatePlayer2(0);
            }

        } else {
            players[1]['side'] = -1
            upDatePlayer2();
        }
    }

    // Прыжок
    if (key == 'KeyW') {
        if (players[1]['cordY'] > 1) {

            if (map[players[1]['cordY'] - 2][players[1]['cordX']][0] === undefined && map[players[1]['cordY'] + 1][players[1]['cordX']][0] !== undefined) {
                players[1]['cordY'] -= 1;
                upDatePlayer2(2);
            }

        }
    }

    // Присед
    if (key == 'KeyS') {

        if (players[1]['shift'] == 0) {

            players[1]['shift'] = 1;
            players[1]['cordY'] *= 1.015;
            players[1]['height'] = 95;
            upDatePlayer2();

        } else {

            players[1]['shift'] = 0;
            players[1]['cordY'] /= 1.015;
            players[1]['height'] = 100;
            upDatePlayer2();
        }

        // Костыль фикса бага с прыжком
        if (Math.round(players[1]['cordY']) != players[1]['cordY']) {
            players[1]['cordY'] = Math.round(players[1]['cordY']);
            upDatePlayer2();
        }
    }
}


// Отслеживает передвижение
document.addEventListener('keydown', (event) => {
    console.log(event.code);

    // Игрок №1
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
        event.preventDefault();
        setTimeout(() => {
            movementPlayer1(event.code);
        }, 40)
    }

    // Игрок №2
    if (['KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(event.code)) {
        event.preventDefault();
        setTimeout(() => {
            movementPlayer2(event.code);
        }, 40)
    }

    // Обновление мира
    if (['Digit0'].includes(event.code)) {
        generateMap();
    }
});


// Сломать или построить
function upLoadBlock(key, a) {
    let breakPlayerX = players[a]['cordX'];
    let breakPlayerY = Math.round(players[a]['cordY']);

    // Сломать или построить под собой
    if (key == 'Numpad2' || key == 'KeyV') {
        if (map[breakPlayerY + 1][breakPlayerX][0] != undefined) {
            if (map[breakPlayerY + 1][breakPlayerX][0] != 3) {
                map[breakPlayerY + 1][breakPlayerX][0] = undefined;
                upDateMap();
            }
        } else {
            console.log(true);
            map[breakPlayerY + 1][breakPlayerX][0] = 1;
            upDateMap();
        }
    }

    // Сломать или построить на уровне ног
    if (key == 'Numpad5' || key == 'KeyF') {
        if (map[breakPlayerY][breakPlayerX - (players[a]['side'])][0] != undefined && map[breakPlayerY][breakPlayerX - (players[a]['side'])][0] != 3) {
            map[breakPlayerY][breakPlayerX - (players[a]['side'])][0] = undefined;
            upDateMap();

        }
    }

    // Сломать или построить на уровне головы
    if (key == 'Numpad8' || key == 'KeyR') {
        if (map[breakPlayerY - 1][breakPlayerX - (players[a]['side'])][0] != undefined && map[breakPlayerY - 1][breakPlayerX - (players[a]['side'])][0] != 3) {
            map[breakPlayerY - 1][breakPlayerX - (players[a]['side'])][0] = undefined;
            upDateMap();

        }
    }

    // Сломать или построить над собой
    if (key == 'NumpadDivide' || key == 'Digit4') {
        if (map[breakPlayerY - 2][breakPlayerX][0] != undefined && map[breakPlayerY - 2][breakPlayerX][0] != 3) {
            map[breakPlayerY - 2][breakPlayerX][0] = undefined;
            upDateMap();

        }
    }
}


// Отслеживает строительство и ломательство
document.addEventListener('keydown', (event) => {

    // Игрок №1
    if (['Numpad2', 'Numpad5', 'Numpad8', 'NumpadDivide'].includes(event.code)) {
        event.preventDefault();
        upLoadBlock(event.code, 0);
    }

    // Игрок №2
    if (['KeyV', 'KeyF', 'KeyR', 'Digit4'].includes(event.code)) {
        event.preventDefault();
        upLoadBlock(event.code, 1);
    }
});