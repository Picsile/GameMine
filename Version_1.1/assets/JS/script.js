// Получаем объекты документа
const blocksBehindDiv = document.getElementById('blocksBehind');
const blocksDiv = document.getElementById('blocks');
const blocksFrontDiv = document.getElementById('blocksFront');
const cracksDiv = document.getElementById('cracks');

const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

const player1AnimLeft = document.getElementById('player1AnimLeft');
const player1AnimRight = document.getElementById('player1AnimRight');
const player1AnimUP = document.getElementById('player1AnimUP');
const player1AnimDown = document.getElementById('player1AnimDown');

const player2AnimLeft = document.getElementById('player2AnimLeft');
const player2AnimRight = document.getElementById('player2AnimRight');
const player2AnimUP = document.getElementById('player2AnimUP');
const player2AnimDown = document.getElementById('player2AnimDown');


// Объекты блоки
const blocks = [
    {
        'src': 'assets/img/textures/Блок трава.jpg',
        'collision': 1,
        'flowability': 0,
        'strength': 3.5,
        'typeOfTool': 1
    },
    {
        'src': 'assets/img/textures/Блок грязь.jpg',
        'collision': 1,
        'flowability': 0,
        'strength': 3.5,
        'typeOfTool': 1
    },
    {
        'src': 'assets/img/textures/Блок камень.jpg',
        'collision': 1,
        'flowability': 0,
        'strength': 1.6,
        'typeOfTool': 1
    },
    {
        'src': 'assets/img/textures/Блок бедрок.jpg',
        'collision': 1,
        'flowability': 0
    },
    {
        'src': 'assets/img/textures/Блок доски.jpg',
        'collision': 1,
        'flowability': 0,
        'strength': 2,
        'typeOfTool': 1
    },
    {
        'src': 'assets/img/textures/Блок заборинка.png',
        'collision': 1,
        'flowability': 0,
        'strength': 2,
        'typeOfTool': 1
    },
    {
        'src': 'assets/img/textures/Вагонетка2.png',
        'collision': 0,
        'flowability': 0,
        'strength': 10,
        'typeOfTool': 1
    },
    {
        'src': 'assets/img/textures/Факел наклонённый.gif',
        'collision': 0,
        'flowability': 0,
        'strength': 10,
        'typeOfTool': 1
    },
    {
        'src': 'assets/img/textures/Факел наклонённый перевёрнутый.gif',
        'collision': 0,
        'flowability': 0,
        'strength': 10,
        'typeOfTool': 1
    },
    {
        'src': 'assets/img/textures/Рельсы.png',
        'collision': 0,
        'flowability': 0,
        'strength': 5,
        'typeOfTool': 1
    },
    {
        'src': 'assets/img/textures/Блок ступенки.png',
        'collision': 1,
        'flowability': 0,
        'strength': 2,
        'typeOfTool': 1
    },
    {
        'src': 'assets/img/textures/Блок ступеньки перевёрнутые.png',
        'collision': 1,
        'flowability': 0,
        'strength': 2,
        'typeOfTool': 1
    },
    {
        'src': 'assets/img/textures/Блок гравий.jpg',
        'collision': 1,
        'flowability': 1,
        'strength': 2.5,
        'typeOfTool': 1
    }
];


// Объекты задние блоки
const blocksBehind = [
    {
        'src': 'assets/img/textures/Блок трава2.jpg'
    },
    {
        'src': 'assets/img/textures/Блок грязь2.jpg'
    },
    {
        'src': 'assets/img/textures/Блок камень2.jpg'
    },
    {
        'src': 'assets/img/textures/Блок бедрок2.jpg'
    }
];


// Объкты трещены
const cracks = [
    'assets/img/textures/Трещены уровень 1.png',
    'assets/img/textures/Трещены уровень 2.png',
    'assets/img/textures/Трещены уровень 3.png',
    'assets/img/textures/Трещены уровень 4.png',
    'assets/img/textures/Трещены уровень 5.png',
    'assets/img/textures/Трещены уровень 6.png',
    'assets/img/textures/Трещены уровень 7.png',
    'assets/img/textures/Трещены уровень 8.png',
    'assets/img/textures/Трещены уровень 9.png',
    'assets/img/textures/Трещены уровень 10.png'
]


// Объект мир
const World = {
    map: [],
    mapBehind: [],
    mapFront: [],
    mapCracks: [],

    widthArray: 0,
    heightArray: 0,

    // Генерация структуры массива
    generationArray(widthArray, heightArray) {
        this.map = [];
        this.widthArray = widthArray;
        this.heightArray = heightArray;

        for (let i = 0; i < heightArray; i++) {
            this.map.push([]);
            for (let j = 0; j < widthArray; j++) {
                this.map[i].push([]);
            }
        }
    },

    // Генерация шаблона
    generationTemplate() {

        for (let i = 0; i < this.heightArray; i++) {
            for (let j = 0; j < this.widthArray; j++) {

                if (i == 7) {
                    if (j > 1) {
                        if (this.map[i][j - 2][0] == undefined && this.map[i][j - 1][0] != undefined) {

                            // Увеличиваем шанс двойного блока
                            if (!Math.floor(Math.random() * 5) == 0) {
                                this.map[i][j] = [0];
                            }
                        } else {

                            // Как с 2 Первыми и последними
                            if (Math.floor(Math.random() * 10) == 0) {
                                this.map[i][j] = [0];
                            }
                        }
                    } else {

                        // Для 2 первых
                        if (Math.floor(Math.random() * 10) == 0) {
                            this.map[i][j] = [0];
                        }
                    }
                }

                if (i >= 8 && i < 15) {
                    if (j > 0 && j < this.map[i].length - 1) {
                        if (this.map[i - 1][j][0] == undefined) {

                            // Если между, то 100%
                            if (this.map[i - 1][j - 1][0] != undefined || this.map[i - 1][j + 1][0] != undefined) {
                                this.map[i][j] = [0];
                            }

                            //  Просто шанс
                            if (Math.floor(Math.random() * 5) == 0) {
                                this.map[i][j] = [0];
                            }
                        } else {

                            // Если сверху есть блок
                            if (this.map[i - 1][j][0] != undefined && this.map[i - 2][j][0] != undefined && this.map[i - 3][j][0] != undefined && this.map[i - 4][j][0] != undefined) {

                                // Eсли слишком много блоков
                                if (!Math.floor(Math.random() * 10) == 0) {

                                    // Просто шанс
                                    this.map[i][j] = [2];

                                } else this.map[i][j] = [1];

                            } else this.map[i][j] = [1];

                        }
                    } else {

                        // Если сверху первого и последнего что-то есть                 
                        if (this.map[i - 1][j][0] != undefined) {
                            this.map[i][j] = [1];
                        } else {

                            //  Просто шанс
                            if (!Math.floor(Math.random() * 7) == 0) {
                                this.map[i][j] = [0];
                            }
                        }
                    }
                }

                if (i >= 15 && i < this.map.length - 1) {
                    this.map[i][j] = [2];
                }

                if (i == this.map.length - 1) {
                    if (Math.floor(Math.random() * 6) == 0) {
                        this.map[i - 2][j] = [3];
                    }
                    if (Math.floor(Math.random() * 2) == 0) {
                        this.map[i - 1][j] = [3];
                    }
                    this.map[i][j] = [3];
                }
            }
        }
    },

    // Генерация пещер
    generateCave() {

        // Пробегаемся по массиву
        for (let o = 0; o < this.map.length; o++) {
            for (let k = 0; k < this.map[0].length; k++) {

                // Проверка на возможность спавна
                if (o > 6 && k + 5 < this.map[0].length && this.map[o - 3][k + 5][0] != undefined) {
                    if (Math.floor(Math.random() * 4) == 0) {
                        let widthCave = Math.floor(Math.random() * 8) + 5;
                        let heightCave = Math.floor(Math.random() * 3) + 2;

                        // Проверка диапозона пещеры
                        if (this.map[0].length >= (k + widthCave) && this.map.length - 3 >= (o + heightCave)) {

                            // Создание пещеры
                            for (let i = o; i < o + heightCave; i++) {
                                for (let j = k; j < k + widthCave; j++) {

                                    // Уровень 1
                                    if (i == o) {
                                        if (j - 5 > k && j + 5 < k + widthCave)
                                            if (Math.floor(Math.random() * 10) == 0) {
                                                this.map[i][j] = [];
                                            }
                                    }

                                    // Уровень 2
                                    if (i > o && i <= o + heightCave / 2) {

                                        if (this.map[i - 1][j][0] == undefined) {
                                            this.map[i][j] = [];
                                        } else {

                                            if (j - 2 > k && j + 2 < k + widthCave) {

                                                if (this.map[i - 1][j - 1][0] == undefined) {
                                                    if (!Math.floor(Math.random() * 5) == 0) {
                                                        this.map[i][j] = [];
                                                    }
                                                }

                                                if (this.map[i - 1][j + 1][0] == undefined) {
                                                    if (!Math.floor(Math.random() * 5) == 0) {
                                                        this.map[i][j] = [];
                                                    }
                                                }

                                                if (this.map[i - 1][j + 2][0] == undefined) {
                                                    if (Math.floor(Math.random() * 2) == 0) {
                                                        this.map[i][j] = [];
                                                    }
                                                }
                                            }
                                        }

                                    }

                                    // Уровень 3
                                    if (i > o + heightCave / 2) {
                                        if (this.map[i - 1][j][0] != undefined) {

                                        } else {
                                            if (Math.floor(Math.random() * 2) == 0) {
                                                this.map[i][j] = []
                                            } else this.map[i][j] = [2]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    // Убираю лишние блоки
    removeExtraBlocks(need) {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[0].length; j++) {

                if (j > 1 && j < this.map[0].length - 1 && i > 1 && i < this.map.length) {

                    if (this.map[i][j][0] != undefined && this.map[i][j - 1][0] == undefined && this.map[i][j + 1][0] == undefined) {
                        this.map[i][j] = [];
                        (need == true) ? this.map[i + 1][j] = [0] : null;
                    }

                    if (this.map[i][j][0] != undefined && this.map[i][j - 1][0] == undefined && this.map[i][j + 1][0] == undefined) {
                        this.map[i][j] = [];
                    }

                    if (this.map[i][j][0] == undefined && this.map[i - 1][j][0] != undefined && this.map[i + 1][j][0] != undefined) {
                        this.map[i][j] = [2];
                    }
                }
            }
        }

        this.mapBehind = this.map
    },

    // Генерация шахт
    generationMine() {

        // Возможные структуры
        const structuresMine = [
            [
                [[], [7], [4], [8], []],
                [[], [], [5], [], []],
                [[], [9], [5], [], [9]],
                [[4], [4], [4], [4], [4]],
                [[2], [2], [2], [2], [2]]
            ],
            [
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[9], [], [6], [9], []],
                [[4], [4], [4], [4], [4]],
                [[2], [2], [2], [2], [2]]
            ],
            [
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [9], [9], []],
                [[4], [4], [4], [4], [4]],
                [[2], [2], [2], [2], [2]]
            ],
            [
                [[], [12], [], [], []],
                [[], [12], [12], [], []],
                [[12], [12], [12], [9], []],
                [[4], [4], [4], [4], [4]],
                [[2], [2], [2], [2], [2]]
            ],
            [
                [[], [], [], [], []],
                [[], [], [], [12], []],
                [[], [9], [9], [12], [12]],
                [[4], [4], [4], [4], [4]],
                [[2], [2], [2], [2], [2]]
            ],
            [
                [[], [], [11], [4], [5]],
                [[], [11], [4], [5], [5]],
                [[11], [4], [5], [5], [5]],
                [[4], [4], [4], [4], [4]],
                [[2], [2], [2], [2], [2]]
            ],
            [
                [[5], [4], [10], [], []],
                [[5], [5], [4], [10], []],
                [[5], [5], [5], [4], [10]],
                [[4], [4], [4], [4], [4]],
                [[2], [2], [2], [2], [2]]
            ],
            [
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], [11]],
                [[], [], [], [11], [4]],
            ],
            [
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[], [], [], [], []],
                [[10], [], [], [], []],
                [[4], [10], [], [], []],
            ]
        ];

        // Пробегаемся по карте
        let n = 0;
        let m = 0;
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[0].length; j++) {

                // Проверка на пустую ячейку
                if (i > 15 && j < this.map[i - 3][j][0] != undefined) {

                    // Шанс генерации
                    if (Math.floor(Math.random() * 300) == 0) {
                        let widthMine = (Math.floor(Math.random() * 2) + 5) * 5 + 10;
                        let heightMine = (Math.floor(Math.random() * 3) + 2) * 5;
                        let mineMap = [];

                        // Проверка что шахта не слишком огромная
                        if (i + heightMine < this.map.length - 5 && j + widthMine < this.map[0].length - 5) {

                            // Проверка что шахта не слишком рядом с другой
                            if ((j > n + 40 || j < n - 40) && i > m + 5) {
                                let floors = heightMine / 5;
                                let cell = null;

                                // Генерация карты шахты
                                for (let o = 0; o < floors; o++) {
                                    mineMap.push([]);

                                    let dop1 = 0;
                                    while (dop1 == 0 || dop1 * 5 > widthMine) {
                                        dop1 = Math.floor(Math.random() * 5) + 3;
                                    }

                                    // Заполнение массива
                                    let floorLength = dop1;
                                    for (let k = 0; k < floorLength; k++) {
                                        if (cell === null) {

                                            mineMap[o].push([Math.floor(Math.random() * 5)]);

                                            if (mineMap[o][k] == 0) {
                                                cell = 0;
                                            } else cell = 1;

                                        } else {
                                            if (cell == 0) {

                                                // Шанс спавна вагонетки с сундуком
                                                if (Math.floor(Math.random() * 10) == 0) {
                                                    mineMap[o].push([1]);
                                                } else {
                                                    if (Math.floor(Math.random() * 10) == 0) {

                                                        // Шанс спавна редкой ячейки
                                                        if (o > 0) {
                                                            mineMap[o].push([Math.floor(Math.random() * 4) + 3]);
                                                        }
                                                    } else {

                                                        // Шанс спавна обычных структур
                                                        mineMap[o].push([2]);
                                                    }
                                                }
                                                cell = 1;
                                            } else {
                                                mineMap[o].push([0]);
                                                cell = 0;
                                            }
                                        }
                                    }
                                }

                                // Вывод шахты
                                console.log('Mine');
                                for (let o = i; o < i + floors * 5; o += 5) {
                                    let dop2;

                                    if (!Math.floor(Math.random() * 3) == 0) {
                                        dop2 = Math.floor(Math.random() * 2) + 1;
                                    } else dop2 = 0;

                                    for (let k = j; k < j + mineMap[(o - i) / 5].length * 5; k += 5) {

                                        (mineMap[(o - i) / 5][(k - j) / 5] == 1) ? console.log('сокровище') : null;

                                        for (let p = 0; p < 5; p++) {
                                            for (let l = 0; l < 5; l++) {
                                                this.map[o + p][k + l + dop2 * 5] = structuresMine[mineMap[(o - i) / 5][(k - j) / 5]][p][l];
                                            }
                                        }

                                        // Спавн продолжении лестницы
                                        if (mineMap[(o - i) / 5][(k - j) / 5] == 5 || mineMap[(o - i) / 5][(k - j) / 5] == 6) {

                                            for (let p = 0; p < 5; p++) {
                                                for (let l = 0; l < 5; l++) {

                                                    (mineMap[(o - i) / 5][(k - j) / 5] == 5) ? this.map[o + p - 5][k + l + dop2 * 5] = structuresMine[7][p][l] : null;
                                                    (mineMap[(o - i) / 5][(k - j) / 5] == 6) ? this.map[o + p - 5][k + l + dop2 * 5] = structuresMine[8][p][l] : null;
                                                }
                                            }
                                        }
                                    }
                                }
                                n = j;
                                m = i;
                            }
                        }
                    }
                }
            }
        }
    },

    // Генерация игроков
    generatePlayers() {
        players[0]['cordY'] = 0;
        players[1]['cordY'] = 0;

        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i][Math.round(this.map[i].length / 30)][0] !== undefined && players[0]['cordY'] == 0) {
                players[0]['cordY'] = i - 2;
                players[0]['cordX'] = Math.round(this.map[i].length / 30);
            }

            if (this.map[i][Math.floor(this.map[i].length / 30 + 1)][0] !== undefined && players[1]['cordY'] == 0) {
                players[1]['cordY'] = i - 2;
                players[1]['cordX'] = Math.floor(this.map[i].length / 30 + 1);
            }
        }
    },

    // Вынесение некоторых блоков вперёд
    bringingForward() {
        this.mapFront = [];

        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[0].length; j++) {
                if (this.map[i][j][0] == 5) {
                    this.map[i][j] = [];
                    this.mapFront.push(
                        {
                            'block': 5,
                            'Y': i,
                            'X': j
                        });
                }
            }
        }
    },

    // Ломание блоков
    breakingBlocks(Y, X) {
        this.map[Y][X] = [];
        this.upDateMap();
    },

    // Создание трещин
    creatingCracks(Y, X) {

        // Пробигаемся по массиву с трещенами
        for (let i = 0; i < this.mapCracks.length; i++) {

            // Сравниваем координаты
            if (this.mapCracks[i]['Y'] == Y && this.mapCracks[i]['X'] == X) {

                this.mapCracks[i]['stage'] += blocks[this.mapCracks[i]['block']]['strength'];

                // Проверяем степень поломки
                if (this.mapCracks[i]['stage'] >= 10) {
                    this.breakingBlocks(Y, X);
                    this.mapCracks.splice(i, 1);
                    this.upDateCracks();
                }

                this.upDateCracks();
                return;
            }
        }

        // Если трещен на блоке нет
        this.mapCracks.push({
            'Y': Y,
            'X': X,
            'block': this.map[Y][X][0],
            'stage':  blocks[this.map[Y][X]]['strength']
        })

        if (this.mapCracks[this.mapCracks.length-1]['stage'] >= 10) {
            this.breakingBlocks(Y, X);
            this.mapCracks.splice(this.mapCracks.length-1, 1);
            this.upDateCracks();
        } else this.upDateCracks();
    },

    // Вывод трещин на блоках
    upDateCracks() {
        let mapCracksHTML = ``;
        
        for (let i = 0; i < this.mapCracks.length; i++) {

            mapCracksHTML += `<div class="block" style = "margin-top: ${this.mapCracks[i]['Y'] * 50}px; margin-left: ${this.mapCracks[i]['X'] * 50}px;"><img src = "${cracks[Math.round(this.mapCracks[i]['stage']) - 1]}" width="50px" height="50px"></div>`;
        }

        cracksDiv.innerHTML = mapCracksHTML;
    },

    // Вывод задних блоков
    upDateMapBehind() {
        let mapBehindHTML = ``;

        for (let i = 0; i < this.mapBehind.length; i++) {

            for (let j = 0; j < this.mapBehind[i].length; j++) {

                if (this.mapBehind[i][j][0] !== undefined) {
                    mapBehindHTML += `<div class="block" style = "margin-top: ${i * 50}px; margin-left: ${j * 50}px;"><img src = "${blocksBehind[this.mapBehind[i][j][0]]['src']}" width="50px" height="50px"></div>`;
                }
            }
        }

        blocksBehindDiv.innerHTML = mapBehindHTML;
    },

    // Вывод блоков
    upDateMap() {
        let mapHTML = ``;

        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j][0] !== undefined) {
                    mapHTML += `<div class="block" style = "margin-top: ${i * 50}px; margin-left: ${j * 50}px;"><img src = "${blocks[this.map[i][j][0]]['src']}" width="50px" height="50px"></div>`;
                }
            }
        }

        blocksDiv.innerHTML = mapHTML;
        players[0].checkBlockDown();
        players[1].checkBlockDown();
    },

    // Вывод передних блоков
    upDateMapFront() {
        let mapFrontHTML = ``;

        for (let i = 0; i < this.mapFront.length; i++) {
            mapFrontHTML += `<div class="block" style = "margin-top: ${this.mapFront[i]['Y'] * 50}px; margin-left: ${this.mapFront[i]['X'] * 50}px;"><img src = "${blocks[this.mapFront[i]['block']]['src']}" width="50px" height="50px"></div>`;
        }

        blocksFrontDiv.innerHTML = mapFrontHTML;
    },

    // Получение массива
    getMap() {
        return this.map;
    }
}


// Объекты игроки
const players = [
    {
        'src': 'assets/img/players/Стив.png',
        'cordX': 0,
        'cordY': 0,
        'width': 50,
        'height': 100,
        'side': -1,
        'shift': 0,
        'ControlKeys': ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'KeyT', 'KeyG', 'KeyY', 'KeyH', 'KeyQ', 'KeyE'],

        // Передвижение
        movement(event) {

            // Движение влево
            if (event == this.ControlKeys[2]) {

                if (this.side == 1 && this.cordX > 0) {

                    if (World.map[Math.round(this.cordY)][this.cordX - 1][0] == undefined || blocks[World.map[Math.round(this.cordY)][this.cordX - 1][0]]['collision'] == 0) {
                        if (World.map[Math.round(this.cordY) - 1][this.cordX - 1][0] == undefined || blocks[World.map[Math.round(this.cordY) - 1][this.cordX - 1][0]]['collision'] == 0) {
                            this.cordX -= 1;
                            this.upDatePlayer(1);
                        }
                    }
                } else {
                    this.side = 1;
                    this.upDatePlayer();
                }
            }

            // Движение вправо
            if (event == this.ControlKeys[3]) {

                if (this.side == -1 && this.cordX < World.map[0].length - 1) {

                    if (World.map[Math.round(this.cordY)][this.cordX + 1][0] == undefined || blocks[World.map[Math.round(this.cordY)][this.cordX + 1][0]]['collision'] == 0) {
                        if (World.map[Math.round(this.cordY) - 1][this.cordX + 1][0] == undefined || blocks[World.map[Math.round(this.cordY) - 1][this.cordX + 1][0]]['collision'] == 0) {
                            this.cordX += 1;
                            this.upDatePlayer(0);
                        }
                    }
                } else {
                    this.side = -1;
                    this.upDatePlayer();
                }
            }

            // Прыжок
            if (event == this.ControlKeys[0]) {

                if (this.cordY > 2) {

                    if ((World.map[Math.round(this.cordY - 2)][this.cordX][0] == undefined || blocks[World.map[Math.round(this.cordY - 2)][this.cordX][0]]['collision'] == 0) && World.map[Math.round(this.cordY) + 1][this.cordX][0] != undefined) {
                        this.cordY -= 1;
                        this.upDatePlayer(2);
                    }
                }
            }

            // Присед
            if (event == this.ControlKeys[1]) {

                if (Math.round(this.cordY) == this.cordY) {
                    this.height = 95;
                    this.cordY += 0.12;
                    this.upDatePlayer();

                    setTimeout(() => {
                        this.height = 100;
                        this.cordY -= 0.12;
                        this.upDatePlayer();
                    }, 100)
                }
            }
        },

        // Ломать
        breakBlock(event) {
            if (event == 'KeyT') {
                World.creatingCracks(Math.round(this.cordY) - 2, this.cordX);
            }

            if (event == 'KeyG') {
                World.creatingCracks(Math.round(this.cordY) + 1, this.cordX);
            }

            if (event == 'KeyY') {
                World.creatingCracks(Math.round(this.cordY) - 1, this.cordX + this.side * (-1));
            }

            if (event == 'KeyH') {
                World.creatingCracks(Math.round(this.cordY), this.cordX + this.side * (-1));
            }
        },

        // Строить

        // Вывод игрока
        upDatePlayer(varAnim) {
            let playerHTML = ``;

            playerHTML += `
            <div style = "margin-top: ${this.cordY * 50 - 50}px; margin-left: ${this.cordX * 50}px;">
            <div class="anim">
            <img width="${this.width}" height="${this.height}" src = "${this.src}" style = "transform: scale(${this.side}, 1);">
            </div>
            </div>`;

            player1.innerHTML = playerHTML;

            switch (varAnim) {
                case 0: player1AnimRight.style.animation = 'MovementFront 0.15s ease-out';
                    setTimeout(() => {
                        player1AnimRight.style.animation = '';
                        player1AnimLeft.style.animation = '';
                    }, 150);
                    break;
                case 1: player1AnimLeft.style.animation = 'MovementBehind 0.15s ease-out';
                    setTimeout(() => {
                        player1AnimRight.style.animation = '';
                        player1AnimLeft.style.animation = '';
                    }, 150);
                    break;
                case 2: player1AnimUP.style.animation = 'MovementUp 0.1s ease-out';
                    setTimeout(() => {
                        player1AnimUP.style.animation = '';
                        player1AnimDown.style.animation = '';
                    }, 100);
                    break;
                case 3: player1AnimDown.style.animation = 'MovementDown 0.1s ease-in';
                    setTimeout(() => {
                        player1AnimUP.style.animation = '';
                        player1AnimDown.style.animation = '';
                    }, 100);
                    break;
            }

            this.checkBlockDown();
        },

        // Проверка нижнего блока
        checkBlockDown() {

            setTimeout(() => {

                if (World.map[Math.round(this.cordY) + 1][this.cordX][0] == undefined || blocks[World.map[Math.round(this.cordY) + 1][this.cordX][0]]['collision'] == 0) {
                    this.cordY += 1;
                    this.upDatePlayer(3);
                }
            }, 150);
        }
    },
    {
        'src': 'assets/img/players/Алекс.png',
        'cordX': 0,
        'cordY': 0,
        'width': 50,
        'height': 100,
        'side': -1,
        'shift': 0,
        'ControlKeys': ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Numpad5', 'Numpad2', 'Numpad6', 'Numpad3', 'Numpad4', 'Numpad1'],

        // Передвижение
        movement(event) {

            // Движение влево
            if (event == this.ControlKeys[2]) {

                if (this.side == 1 && this.cordX > 0) {

                    if (World.map[Math.round(this.cordY)][this.cordX - 1][0] == undefined || blocks[World.map[Math.round(this.cordY)][this.cordX - 1][0]]['collision'] == 0) {
                        if (World.map[Math.round(this.cordY) - 1][this.cordX - 1][0] == undefined || blocks[World.map[Math.round(this.cordY) - 1][this.cordX - 1][0]]['collision'] == 0) {
                            this.cordX -= 1;
                            this.upDatePlayer(1);
                        }
                    }
                } else {
                    this.side = 1;
                    this.upDatePlayer();
                }
            }

            // Движение вправо
            if (event == this.ControlKeys[3]) {

                if (this.side == -1 && this.cordX < World.map[0].length - 1) {

                    if (World.map[Math.round(this.cordY)][this.cordX + 1][0] == undefined || blocks[World.map[Math.round(this.cordY)][this.cordX + 1][0]]['collision'] == 0) {
                        if (World.map[Math.round(this.cordY) - 1][this.cordX + 1][0] == undefined || blocks[World.map[Math.round(this.cordY) - 1][this.cordX + 1][0]]['collision'] == 0) {
                            this.cordX += 1;
                            this.upDatePlayer(0);
                        }
                    }
                } else {
                    this.side = -1;
                    this.upDatePlayer();
                }
            }

            // Прыжок
            if (event == this.ControlKeys[0]) {

                if (this.cordY > 2) {

                    if ((World.map[Math.round(this.cordY - 2)][this.cordX][0] == undefined || blocks[World.map[Math.round(this.cordY - 2)][this.cordX][0]]['collision'] == 0) && World.map[Math.round(this.cordY) + 1][this.cordX][0] != undefined) {
                        this.cordY -= 1;
                        this.upDatePlayer(2);
                    }
                }
            }

            // Присед
            if (event == this.ControlKeys[1]) {

                if (Math.round(this.cordY) == this.cordY) {
                    this.height = 95;
                    this.cordY += 0.12;
                    this.upDatePlayer();

                    setTimeout(() => {
                        this.height = 100;
                        this.cordY -= 0.12;
                        this.upDatePlayer();
                    }, 100)
                }
            }
        },

        // Ломать
        breakBlock(event) {

            if (event == this.ControlKeys[4]) {
                World.creatingCracks(Math.round(this.cordY) - 2, this.cordX);
            }

            if (event == this.ControlKeys[5]) {
                World.creatingCracks(Math.round(this.cordY) + 1, this.cordX);
            }

            if (event == this.ControlKeys[6]) {
                World.creatingCracks(Math.round(this.cordY) - 1, this.cordX + this.side * (-1));
            }

            if (event == this.ControlKeys[7]) {
                World.creatingCracks(Math.round(this.cordY), this.cordX + this.side * (-1));
            }
        },

        // Строить

        // Вывод игрока
        upDatePlayer(varAnim) {
            let playerHTML = ``;

            playerHTML += `
            <div style = "margin-top: ${this.cordY * 50 - 50}px; margin-left: ${this.cordX * 50}px;">
            <div class="anim">
            <img width="${this.width}" height="${this.height}" src = "${this.src}" style = "transform: scale(${this.side}, 1);">
            </div>
            </div>`;

            player2.innerHTML = playerHTML;

            switch (varAnim) {
                case 0: player2AnimRight.style.animation = 'MovementFront 0.15s ease-out';
                    setTimeout(() => {
                        player2AnimRight.style.animation = '';
                        player2AnimLeft.style.animation = '';
                    }, 150);
                    break;
                case 1: player2AnimLeft.style.animation = 'MovementBehind 0.15s ease-out';
                    setTimeout(() => {
                        player2AnimRight.style.animation = '';
                        player2AnimLeft.style.animation = '';
                    }, 150);
                    break;
                case 2: player2AnimUP.style.animation = 'MovementUp 0.1s ease-out';
                    setTimeout(() => {
                        player2AnimUP.style.animation = '';
                        player2AnimDown.style.animation = '';
                    }, 100);
                    break;
                case 3: player2AnimDown.style.animation = 'MovementDown 0.1s ease-in';
                    setTimeout(() => {
                        player2AnimUP.style.animation = '';
                        player2AnimDown.style.animation = '';
                    }, 100);
                    break;
            }

            this.checkBlockDown();
        },

        // Проверка нижнего блока
        checkBlockDown() {

            setTimeout(() => {

                if (World.map[Math.round(this.cordY) + 1][this.cordX][0] == undefined || blocks[World.map[Math.round(this.cordY) + 1][this.cordX][0]]['collision'] == 0) {
                    this.cordY += 1;
                    this.upDatePlayer(3);
                }
            }, 150);
        }
    },
];


// Генерация мира
function generateMap() {

    // Генерация
    World.generationArray(100, 60);
    World.generationTemplate();
    World.removeExtraBlocks(true);
    World.mapBehind = World.getMap();
    World.upDateMapBehind();

    // Генерация
    World.generateCave();
    World.removeExtraBlocks();
    World.generationMine();
    World.bringingForward();
    World.upDateMap();
    World.upDateMapFront();

    // Вывод игроков
    World.generatePlayers();
    players[0].upDatePlayer();
    players[1].upDatePlayer();
}


// Одноразовый код
generateMap();


// Отслеживает действия игроков
document.addEventListener('keydown', (event) => {
    console.log(event.code);
    event.preventDefault();
    let currentCharacter = null;

    if (players[0]['ControlKeys'].includes(event.code)) {
        currentCharacter = 0;
    }

    if (players[1]['ControlKeys'].includes(event.code)) {
        currentCharacter = 1;
    }

    // Передвижение
    if (currentCharacter != null) {
        if (players[currentCharacter]['ControlKeys'].slice(0, 4).includes(event.code)) {
            event.preventDefault();
            setTimeout(() => {
                players[currentCharacter].movement(event.code);
            }, 40)
        }
    }

    // Сломать блок / построить блок
    if (currentCharacter != null) {

        if (players[currentCharacter]['ControlKeys'].slice(4, 8).includes(event.code)) {
            event.preventDefault();
            setTimeout(() => {

                if (event.code == players[currentCharacter]['ControlKeys'].slice(4, 5)) {
                    if (World.map[Math.round(players[currentCharacter]['cordY']) - 2][players[currentCharacter]['cordX']][0] != undefined && World.map[Math.round(players[currentCharacter]['cordY']) - 2][players[currentCharacter]['cordX']][0] != 3) {
                        players[currentCharacter].breakBlock(event.code);
                    }
                }

                if (event.code == players[currentCharacter]['ControlKeys'].slice(5, 6)) {
                    if (World.map[Math.round(players[currentCharacter]['cordY']) + 1][players[currentCharacter]['cordX']][0] != undefined && World.map[Math.round(players[currentCharacter]['cordY']) + 1][players[currentCharacter]['cordX']][0] != 3) {
                        players[currentCharacter].breakBlock(event.code);
                    }
                }

                if (event.code == players[currentCharacter]['ControlKeys'].slice(6, 7)) {
                    if (World.map[Math.round(players[currentCharacter]['cordY']) - 1][players[currentCharacter]['cordX'] + players[currentCharacter]['side'] * (-1)][0] != undefined && World.map[Math.round(players[currentCharacter]['cordY']) - 1][players[currentCharacter]['cordX'] + players[currentCharacter]['side'] * (-1)][0] != 3) {
                        players[currentCharacter].breakBlock(event.code);
                    }
                }

                if (event.code == players[currentCharacter]['ControlKeys'].slice(7, 8)) {
                    if (World.map[Math.round(players[currentCharacter]['cordY'])][players[currentCharacter]['cordX'] + players[currentCharacter]['side'] * (-1)][0] != undefined && World.map[Math.round(players[currentCharacter]['cordY'])][players[currentCharacter]['cordX'] + players[currentCharacter]['side'] * (-1)][0] != 3) {
                        players[currentCharacter].breakBlock(event.code);
                    }
                }

            }, 40)
        }
    }
});


// Отслеживает обновление мира
document.addEventListener('keydown', (event) => ['Digit0'].includes(event.code) ? generateMap() : null);
