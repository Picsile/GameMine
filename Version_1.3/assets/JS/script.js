// Получаем объекты документа
const root = document.documentElement;

const gameDiv = document.getElementById('game');
const sizeGameDiv = document.getElementById('sizeGame');

const blocksBehindDiv = document.getElementById('blocksBehind');
const blocksDiv = document.getElementById('blocks');
const blocksFrontDiv = document.getElementById('blocksFront');
const cracksDiv = document.getElementById('cracks');

let cellSize = 35.5;
let currentZoom = cellSize;
const players = [];


// Класс игрок
class Player {
    constructor(playerNumber, src, controlKeys) {

        this.playerNumber = playerNumber;
        this.src = src;
        this.controlKeys = controlKeys;
        this.externalVariables = [];

        this.startCordX = 0;
        this.startCordY = 0;
        this.cordX = 0;
        this.cordY = 0;

        this.side = -1;
        this.shift = 0;

        this.width = cellSize;
        this.height = cellSize * 2;

        this.health = 100;

        this.state = 'alive';
        this.fallingSpeed = 0;
        this.pageCheck = false;

        this.inventory = [
            {
                'name': null,
                'quantity': null
            }
        ];
        this.currentItem = 0;
    }

    // Сформировать размеры игрока
    generatePlayerDimensions() {
        this.width = cellSize;
        this.height = cellSize * 2;
    }

    // Сформировать внешние переменные
    generateExternalVariables() {
        this.externalVariables = [
            document.getElementById(`player${this.playerNumber}`),
            document.getElementById(`player${this.playerNumber}AnimLeft`),
            document.getElementById(`player${this.playerNumber}AnimRight`),
            document.getElementById(`player${this.playerNumber}AnimUP`),
            document.getElementById(`player${this.playerNumber}AnimDown`),
            document.getElementById(`player${this.playerNumber}Invrntory`),
            document.getElementById(`player${this.playerNumber}Satiety`),
            document.getElementById(`player${this.playerNumber}Health`),
            document.getElementById(`player${this.playerNumber}Anim`)
        ];
    }

    // Получить урон
    takeDamage(damage) {
        this.health -= damage;
        if (this.health / 10 < 1) {
            this.dead();
        } else {
            this.externalVariables[0].innerHTML = `<img width="${this.width}" height="${this.height}" src = "${this.src}TakeDamage.png" style = "transform: scale(${this.side}, 1);">`;
            setTimeout(() => {
                this.upDate()[0]();
            }, 100);
        }
        this.upDate()[2]();
    }

    // Умереть
    dead() {
        this.state = 'dead';
        this.externalVariables[0].innerHTML = `<img width="${this.width}" height="${this.height}" src = "${this.src}TakeDamage.png" style = "transform: scale(${this.side}, 1);">`;
        this.externalVariables[8].style.transformOrigin = '60% 100%';
        this.externalVariables[8].style.transform = 'rotate(90deg)';
        this.externalVariables[8].style.transition = 'all 0.2s';
        setTimeout(() => {
            this.state = 'alive';
            this.health = 100;
            this.cordX = this.startCordX;
            this.cordY = this.startCordY;
            this.externalVariables[8].style.transform = '';
            this.externalVariables[8].style.transition = '';
            
            this.upDate()[0]();
            this.upDate()[2]();
        }, 100000);
    }

    // Передвижение
    movement(event) {
        if (this.state == 'alive') {

            // Движение влево
            if (event == this.controlKeys[2]) {

                if (this.side == 1 && this.cordX > 0) {

                    if (World.map[Math.round(this.cordY)][this.cordX - 1] == undefined || blocks[blockList[World.map[Math.round(this.cordY)][this.cordX - 1]]]['collision'] == false) {
                        if (World.map[Math.round(this.cordY) - 1][this.cordX - 1] == undefined || blocks[blockList[World.map[Math.round(this.cordY) - 1][this.cordX - 1]]]['collision'] == false) {
                            this.cordX -= 1;
                            this.upDate()[0](1);
                        }
                    }
                } else {
                    this.side = 1;
                    this.upDate()[0]();
                }
            }

            // Движение вправо
            if (event == this.controlKeys[3]) {

                if (this.side == -1 && this.cordX < World.widthArray - 1) {
                    if (World.map[Math.round(this.cordY)][this.cordX + 1] == undefined || blocks[blockList[World.map[Math.round(this.cordY)][this.cordX + 1]]]['collision'] == false) {
                        if (World.map[Math.round(this.cordY) - 1][this.cordX + 1] == undefined || blocks[blockList[World.map[Math.round(this.cordY - 1)][this.cordX + 1]]]['collision'] == false) {
                            this.cordX += 1;
                            this.upDate()[0](0);
                        }
                    }
                } else {
                    this.side = -1;
                    this.upDate()[0]();
                }
            }

            // Прыжок
            if (event == this.controlKeys[0]) {

                if (this.cordY > 2) {

                    if ((World.map[Math.round(this.cordY - 2)][this.cordX] == undefined || blocks[blockList[World.map[Math.round(this.cordY) - 2][this.cordX]]]['collision'] == false) && World.map[Math.round(this.cordY) + 1][this.cordX] != undefined) {
                        this.cordY -= 1;
                        this.upDate()[0](2);
                    }
                }
            }

            // Присед
            if (event == this.controlKeys[1]) {

                if (Math.round(this.cordY) == this.cordY) {
                    this.height = cellSize * 2 * 95 / 100;
                    this.cordY += cellSize * 2 / 700;
                    this.upDate()[0]();

                    setTimeout(() => {
                        this.height = cellSize * 2;
                        this.cordY = Math.round(this.cordY);
                        this.upDate()[0]();
                    }, 100)
                }
            }
        }
    }

    // Ломать
    breakBlock(event) {
        if (this.state == 'alive') {

            if (event == this.controlKeys.slice(4, 5)) {
                World.actions()[1](Math.round(this.cordY) - 2, this.cordX, this.playerNumber);
            }

            if (event == this.controlKeys.slice(5, 6)) {
                World.actions()[1](Math.round(this.cordY) + 1, this.cordX, this.playerNumber);
            }

            if (event == this.controlKeys.slice(6, 7)) {
                World.actions()[1](Math.round(this.cordY) - 1, this.cordX + this.side * (-1), this.playerNumber);
            }

            if (event == this.controlKeys.slice(7, 8)) {
                World.actions()[1](Math.round(this.cordY), this.cordX + this.side * (-1), this.playerNumber);
            }
        }
    }

    // Исследовать
    openDark() {
        let res = false;

        for (let i = -3; i < 3; i++) {
            let x = -2;

            if (this.cordX == 0) {
                x = 0;
            }
            if (this.cordX == 1) {
                x = -1;
            }

            for (let j = x; j < 3; j++) {
                if (this.cordY > 2) {

                    if (!((j == -2 || j == 2) && (i == -3 || i == 2))) {
                        if (World.mapDark[Math.round(this.cordY) + i][this.cordX + j] == 1) {
                            res = true;
                            World.mapDark[Math.round(this.cordY) + i][this.cordX + j] = [];
                        }
                    }
                }
            }
        }

        (res) ? World.upDate()[0]() : null;
    }

    // Падение
    checkBlockDown() {
        if (this.pageCheck == false) {
            this.pageCheck = true;

            setTimeout(() => {
                this.pageCheck = false;

                if (World.map[Math.round(this.cordY) + 1][this.cordX] == undefined || blocks[blockList[World.map[Math.round(this.cordY) + 1][this.cordX]]]['collision'] == false) {
                    this.cordY += 1;
                    this.fallingSpeed++;
                    this.upDate()[0](3);
                } else {

                    if (this.fallingSpeed > 3) {
                        this.takeDamage(this.fallingSpeed * 4);
                    }
                    this.fallingSpeed = 0;
                }
            }, 130);
        }
    }

    // Добавить блоки в инвентарь
    addItemInInventory(item) {
        let res = undefined;

        // Определяем есть ли блок в инвенторе
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i]['name'] == item) {
                res = i;
            }
        };

        // Проверка выпадения без инструмента и с ним
        if (blocks[item]['dropOutWithoutATool'] == true || (this.inventory[this.currentItem]['name'] == blocks[item]['typeOfTool'])) {

            if (res === undefined) {
                // Добовляем блок
                this.inventory.push({
                    'name': blocks[item]['dropBlock'],
                    'quantity': 1
                });
            } else {
                // Увеличиваем количество
                this.inventory[res]['quantity'] += 1;
            }
        }

        if (this.currentItem == 0) {
            this.currentItem = this.inventory.length - 1;
        }
        this.upDate()[1]();
    }

    upDate() {
        const this2 = this;

        function upDatePlayer(varAnim) {
            this2.externalVariables[8].style.marginTop = `${this2.cordY * cellSize - cellSize}px`;
            this2.externalVariables[8].style.marginLeft = `${this2.cordX * cellSize}px`;
            this2.externalVariables[0].innerHTML = `<img width="${this2.width}" height="${this2.height}" src = "${this2.src}.png" style = "transform: scale(${this2.side}, 1);">`;

            switch (varAnim) {
                case 0: this2.externalVariables[1].style.animation = 'MovementFront 0.15s ease-out';
                    setTimeout(() => {
                        this2.externalVariables[1].style.animation = '';
                        this2.externalVariables[2].style.animation = '';
                    }, 150);
                    break;
                case 1: this2.externalVariables[2].style.animation = 'MovementBehind 0.15s ease-out';
                    setTimeout(() => {
                        this2.externalVariables[1].style.animation = '';
                        this2.externalVariables[2].style.animation = '';
                    }, 150);
                    break;
                case 2: this2.externalVariables[3].style.animation = 'MovementUp 0.1s ease-out';
                    setTimeout(() => {
                        this2.externalVariables[3].style.animation = '';
                        this2.externalVariables[4].style.animation = '';
                    }, 100);
                    break;
                case 3: this2.externalVariables[4].style.animation = 'MovementDown 0.1s ease-in';
                    setTimeout(() => {
                        this2.externalVariables[3].style.animation = '';
                        this2.externalVariables[4].style.animation = '';
                    }, 100);
                    break;
            }

            this2.openDark();
            this2.checkBlockDown();
        };

        function upDateInventory() {
            setTimeout(() => {
                if (this2.currentItem != 0) {
                    this2.externalVariables[5].innerHTML = `
                    <img src = "${blocks[this2.inventory[this2.currentItem]['name']]['src']}" width="92px" height="92px">
                    `;
                }
            }, 100);
        };

        function upDateHealth() {
            let healthHTML = ``;

            for (let i = 1; i < this2.health / 10; i++) {
                healthHTML += `
                <img src="assets/img/players/heart.png" alt="" width="32" height="32">
                `;
            }

            this2.externalVariables[7].innerHTML = healthHTML;
        }

        return [
            upDatePlayer,
            upDateInventory,
            // upDateSatiety,
            upDateHealth
        ];
    }
}


// Объект мир
const World = {
    map: [],
    mapBehind: [],
    mapFront: [],
    mapCracks: [],
    mapDark: [],

    widthArray: 0,
    heightArray: 0,

    startheight: 15,

    time: ['day', 0],

    //Изменения дкнь / ночь
    changeOfDay() {
        console.log(true);
        if (this.time[0] == 'day') {

            document.getElementById('sky').style.animation = "colorNight 3s ease forwards";
            document.getElementById('sun').style.animation = "OFF 1.2s cubic-bezier(.5, -1, .5, 2) forwards";
            document.getElementById('moon').style.animation = "ON 2s cubic-bezier(.5, -1, .5, 2) forwards";
            document.getElementById('stars').style.animation = "starsON 3s ease forwards";

            this.time[0] = 'night';

        } else {

            document.getElementById('sky').style.animation = "colorDay 3s ease forwards";
            document.getElementById('sun').style.animation = "ON 2s cubic-bezier(.5, -1, .5, 2) forwards";
            document.getElementById('moon').style.animation = "OFF 1.2s cubic-bezier(.5, -1, .5, 2) forwards";
            document.getElementById('stars').style.animation = "starsOFF 3s ease forwards";

            this.time[0] = 'day';
        }
    },

    // Управление временем 
    timeWorld() {
        setInterval(() => {
            if (this.time[1] + 1 / 12000 == Math.floor(this.time[1] / 12000)) {
                this.changeOfDay();
            }
            this.time[1]++;
        }, 10);
    },

    // Генерация мира
    generateWorld() {
        const this2 = this;

        // Генерация структуры массива
        function generateArray(widthArray, heightArray) {
            this2.map = [];
            this2.mapBehind = [];
            this2.mapFront = [];
            this2.mapDark = [];
            this2.widthArray = widthArray;
            this2.heightArray = heightArray;

            for (let i = 0; i < heightArray; i++) {
                this2.map.push([]);
                this2.mapBehind.push([]);
                this2.mapDark.push([]);
            }
        }

        // Генерация размеров мира
        function generatingWorldSizes() {

            document.getElementById('stars').style.backgroundSize = `${30 * cellSize}px`;
            document.getElementById('sky').style.height = `${(this2.startheight + 6) * cellSize}px`;

            document.getElementById('darkFon').style.width = `${this2.widthArray * cellSize}px`;
            document.getElementById('darkFon').style.height = `${this2.heightArray * cellSize - (this2.startheight + 6) * cellSize}px`;
            document.getElementById('darkFon').style.marginTop = `${(this2.startheight + 6) * cellSize}px`;

            gameDiv.style.maxWidth = `${(this2.widthArray + 0.5) * cellSize}px`;

            root.style.setProperty('--cellSize', `${cellSize}px`);
            root.style.setProperty('--cellSizeNegative', `${cellSize * (-1)}px`);
            root.style.setProperty('--planetSize', `${cellSize * 100 * 4.4 / 100}px`);
            root.style.setProperty('--planetSizeNegative', `${cellSize * (-1) * 100 * 4.4 / 100}px`);
            root.style.setProperty('--planetPaddingSize', `${cellSize * 77 / 100}px`);
        }

        // Генерация шаблона
        function generateTemplate() {

            for (let i = 0; i < this2.heightArray; i++) {
                for (let j = 0; j < this2.widthArray; j++) {

                    if (i == this2.startheight) {
                        if (j > 1) {
                            if (this2.map[i][j - 2] == undefined && this2.map[i][j - 1] != undefined) {

                                // Увеличиваем шанс двойного блока
                                if (!Math.floor(Math.random() * 5) == 0) {
                                    this2.map[i][j] = 0;
                                    this2.mapBehind[i][j] = 0;
                                }
                            } else {

                                // Как с 2 Первыми и последними
                                if (Math.floor(Math.random() * 10) == 0) {
                                    this2.map[i][j] = 0;
                                    this2.mapBehind[i][j] = 0;
                                }
                            }
                        } else {

                            // Для 2 первых
                            if (Math.floor(Math.random() * 10) == 0) {
                                this2.map[i][j] = 0;
                                this2.mapBehind[i][j] = 0;
                            }
                        }
                    }

                    if (i >= this2.startheight + 1 && i < this2.startheight + 8) {
                        if (j > 0 && j < this2.widthArray - 1) {

                            if (this2.map[i - 1][j] == undefined) {


                                // Если между, то 100%
                                if (this2.map[i - 1][j - 1] != undefined || this2.map[i - 1][j + 1] != undefined) {
                                    this2.map[i][j] = 0;
                                    this2.mapBehind[i][j] = 0;
                                }

                                //  Просто шанс
                                if (Math.floor(Math.random() * 5) == 0) {
                                    this2.map[i][j] = 0;
                                    this2.mapBehind[i][j] = 0;
                                }
                            } else {

                                // Если сверху есть блок
                                if (this2.map[i - 1][j] != undefined && this2.map[i - 2][j] != undefined && this2.map[i - 3][j] != undefined && this2.map[i - 4][j] != undefined) {

                                    // Eсли слишком много блоков
                                    if (!Math.floor(Math.random() * 10) == 0) {

                                        // Просто шанс
                                        this2.map[i][j] = 2;
                                        this2.mapBehind[i][j] = 2;

                                    } else {
                                        this2.map[i][j] = 1;
                                        this2.mapBehind[i][j] = 1;
                                    }
                                } else {
                                    this2.map[i][j] = 1;
                                    this2.mapBehind[i][j] = 1;
                                }
                            }
                        } else {

                            // Если сверху первого и последнего что-то есть                 
                            if (this2.map[i - 1][j] != undefined) {
                                this2.map[i][j] = 1;
                                this2.mapBehind[i][j] = 1;
                            } else {

                                //  Просто шанс
                                if (!Math.floor(Math.random() * 7) == 0) {
                                    this2.map[i][j] = 0;
                                    this2.mapBehind[i][j] = 0;
                                }
                            }
                        }
                    }

                    if (i >= this2.startheight + 8 && i < this2.heightArray - 1) {
                        this2.map[i][j] = 2;
                        this2.mapBehind[i][j] = 2;
                    }

                    if (i == this2.heightArray - 1) {
                        if (Math.floor(Math.random() * 6) == 0) {
                            this2.map[i - 2][j] = 3;
                            this2.mapBehind[i - 2][j] = 3;
                        }
                        if (Math.floor(Math.random() * 2) == 0) {
                            this2.map[i - 1][j] = 3;
                            this2.mapBehind[i - 1][j] = 3;
                        }
                        this2.map[i][j] = 3;
                        this2.mapBehind[i][j] = 3;
                    }

                    // Заполнение темнотой
                    if (i > 5 && this2.map[i - 6][j] != undefined) {
                        this2.mapDark[i][j] = 1;
                    }
                }
            }
        }

        // Генерация пещер
        function generateCave() {

            // Пробегаемся по массиву
            for (let o = 0; o < this2.heightArray; o++) {
                for (let k = 0; k < this2.widthArray; k++) {

                    // Проверка на возможность спавна
                    if (o > 6 && k + 5 < this2.widthArray && this2.map[o - 3][k + 5] != undefined) {
                        if (Math.floor(Math.random() * 3) == 0) {
                            let widthCave = Math.floor(Math.random() * 8) + 5;
                            let heightCave = Math.floor(Math.random() * 2) + 2;

                            // Проверка диапозона пещеры
                            if (this2.widthArray >= (k + widthCave) && this2.heightArray - 3 >= (o + heightCave)) {

                                // Создание пещеры
                                for (let i = o; i < o + heightCave; i++) {
                                    for (let j = k; j < k + widthCave; j++) {

                                        // Уровень 1
                                        if (i == o) {
                                            if (j - 5 > k && j + 5 < k + widthCave)
                                                if (Math.floor(Math.random() * 10) == 0) {
                                                    this2.map[i][j] = undefined;
                                                }
                                        }

                                        // Уровень 2
                                        if (i > o && i <= o + heightCave / 2) {

                                            if (this2.map[i - 1][j] == undefined) {
                                                this2.map[i][j] = undefined;
                                            } else {

                                                if (j - 2 > k && j + 2 < k + widthCave) {

                                                    if (this2.map[i - 1][j - 1] == undefined) {
                                                        if (!Math.floor(Math.random() * 5) == 0) {
                                                            this2.map[i][j] = undefined;
                                                        }
                                                    }

                                                    if (this2.map[i - 1][j + 1] == undefined) {
                                                        if (!Math.floor(Math.random() * 5) == 0) {
                                                            this2.map[i][j] = undefined;
                                                        }
                                                    }

                                                    if (this2.map[i - 1][j + 2] == undefined) {
                                                        if (Math.floor(Math.random() * 2) == 0) {
                                                            this2.map[i][j] = undefined;
                                                        }
                                                    }
                                                }
                                            }

                                        }

                                        // Уровень 3
                                        if (i > o + heightCave / 2) {
                                            if (this2.map[i - 1][j] != undefined) {

                                            } else {
                                                if (Math.floor(Math.random() * 2) == 0) {
                                                    this2.map[i][j] = undefined
                                                } else this2.map[i][j] = 2;
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

        // Убираю лишние блоки
        function removeExtraBlocks() {
            for (let i = 0; i < this2.heightArray; i++) {
                for (let j = 0; j < this2.widthArray; j++) {

                    if (i > 1 && i < this2.heightArray && j > 1 && j < this2.widthArray - 1) {

                        if (this2.map[i][j] != undefined && this2.map[i][j - 1] == undefined && this2.map[i][j + 1] == undefined) {

                            if (this2.map[i][j] == 0) {
                                this2.map[i + 1][j] = 0;
                                this2.mapBehind[i][j] = undefined;
                            }

                            this2.map[i][j] = undefined;
                        }

                        if (this2.map[i][j] != undefined && this2.map[i][j - 1] == undefined && this2.map[i][j + 1] == undefined) {
                            this2.map[i][j] = undefined;
                        }

                        if (this2.map[i][j] == undefined && this2.map[i - 1][j] != undefined && this2.map[i + 1][j] != undefined) {
                            this2.map[i][j] = 2;;
                        }
                    }
                }
            }
        }

        // Генерация шахт
        function generateMine() {

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
            let n = null;
            let m = null;
            for (let i = 0; i < this2.heightArray; i++) {
                for (let j = 0; j < this2.widthArray; j++) {

                    // Проверка на пустую ячейку
                    if (i > this2.startheight + 8 && j < this2.map[i - 3][j] != undefined) {

                        // Шанс генерации
                        if (Math.floor(Math.random() * 100) == 0) {
                            let dop3 = Math.round(World.map[0].length / 30);
                            let widthMine = (Math.floor(Math.random() * 4) + 3) * 5;
                            let heightMine = (Math.floor(Math.random() * 3) + 2) * 5;
                            let mineMap = [];

                            // Проверка что шахта не слишком огромная
                            if (i + heightMine < this2.heightArray - 5 && j + widthMine < this2.widthArray - 15) {

                                // Проверка что шахта не слишком рядом с другой
                                if ((j > n + 40 || j < n - 40) && i > m + 5) {
                                    let floors = heightMine / 5;
                                    let cell = null;

                                    // Генерация карты шахты
                                    for (let o = 0; o < floors; o++) {
                                        mineMap.push([]);

                                        let dop1 = 0;
                                        while (dop1 == 0 || dop1 * 5 > widthMine) {
                                            dop1 = (Math.floor(Math.random() * 4) + 3);
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

                                    // Вставка шахты в основной массив
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
                                                    if (structuresMine[mineMap[(o - i) / 5][(k - j) / 5]][p][l] != 5) {
                                                        this2.map[o + p][k + l + dop2 * 5] = structuresMine[mineMap[(o - i) / 5][(k - j) / 5]][p][l][0];
                                                    } else {
                                                        this2.map[o + p][k + l + dop2 * 5] = undefined;
                                                        this2.mapFront.push(
                                                            {
                                                                'block': 5,
                                                                'Y': o + p,
                                                                'X': k + l + dop2 * 5
                                                            });
                                                    }
                                                }
                                            }

                                            // Спавн продолжении лестницы
                                            if (mineMap[(o - i) / 5][(k - j) / 5] == 5 || mineMap[(o - i) / 5][(k - j) / 5] == 6) {

                                                for (let p = 0; p < 5; p++) {
                                                    for (let l = 0; l < 5; l++) {

                                                        (mineMap[(o - i) / 5][(k - j) / 5] == 5) ? this2.map[o + p - 5][k + l + dop2 * 5] = structuresMine[7][p][l][0] : null;
                                                        (mineMap[(o - i) / 5][(k - j) / 5] == 6) ? this2.map[o + p - 5][k + l + dop2 * 5] = structuresMine[8][p][l][0] : null;

                                                        for (let f = 0; f < this2.mapFront.length; f++) {
                                                            if (this2.mapFront[f]['Y'] == o + p - 5 && this2.mapFront[f]['X'] == k + l + dop2 * 5) {
                                                                this2.mapFront.splice(f, 1);
                                                            }
                                                        }
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
        }

        // Генерация игроков
        function generatePlayers() {
            players[0]['cordY'] = 0;
            players[1]['cordY'] = 0;

            for (let i = 0; i < this2.heightArray; i++) {
                if (this2.map[i][Math.round(this2.widthArray / 30)] !== undefined && players[0]['cordY'] == 0) {
                    players[0]['cordY'] = i - 2;
                    players[0]['startCordY'] = i - 2;
                    players[0]['cordX'] = Math.round(this2.widthArray / 30);
                    players[0]['startCordX'] = Math.round(this2.widthArray / 30);
                }

                if (this2.map[i][Math.floor(this2.widthArray / 30 + 1)] !== undefined && players[1]['cordY'] == 0) {
                    players[1]['cordY'] = i - 2;
                    players[1]['startCordY'] = i - 2;
                    players[1]['cordX'] = Math.floor(this2.widthArray / 30 + 1);
                    players[1]['startCordX'] = Math.round(this2.widthArray / 30 + 1);
                }
            }
        }

        return [
            generateArray,
            generateTemplate,
            generateCave,
            removeExtraBlocks,
            generateMine,
            generatePlayers,
            generatingWorldSizes
        ];
    },

    // Действия
    actions() {
        const this2 = this;

        // Ломание блоков
        function breakingBlocks(Y, X, playerNumber) {
            players[playerNumber - 1].addItemInInventory(blocks[blockList[World.map[Y][X]]]['dropBlock']);
            this2.map[Y][X] = undefined;
            this2.upDate()[0]();
        }

        // Создание трещин
        function creatingCracks(Y, X, playerNumber) {

            // Пробигаемся по массиву с трещенами
            for (let i = 0; i < this2.mapCracks.length; i++) {

                // Сравниваем координаты
                if (this2.mapCracks[i]['Y'] == Y && this2.mapCracks[i]['X'] == X) {

                    this2.mapCracks[i]['stage'] += blocks[blockList[this2.map[Y][X]]]['breakingSpeed'];

                    // Проверяем степень поломки
                    if (this2.mapCracks[i]['stage'] >= 10) {
                        breakingBlocks(Y, X, playerNumber);
                        this2.mapCracks.splice(i, 1);
                    }

                    this2.upDate()[2]();
                    return;
                }
            }

            // Если трещен на блоке нет
            if (blocks[blockList[this2.map[Y][X]]]['breakingSpeed'] != 'max') {
                this2.mapCracks.push({
                    'Y': Y,
                    'X': X,
                    'block': this2.map[Y][X],
                    'stage': blocks[blockList[this2.map[Y][X]]]['breakingSpeed']
                })
            } else {
                breakingBlocks(Y, X, playerNumber);
            }

            this2.upDate()[2]();
        }

        return [
            breakingBlocks,
            creatingCracks
        ];
    },

    // Вывод
    upDate() {
        const this2 = this;

        // Вывод трещин на блоках
        function upDateCracks() {
            let mapCracksHTML = ``;

            for (let i = 0; i < this2.mapCracks.length; i++) {
                mapCracksHTML += `<div class="block" style = "margin-top: ${this2.mapCracks[i]['Y'] * cellSize}px; margin-left: ${this2.mapCracks[i]['X'] * cellSize}px;"><img src = "${cracks[Math.round(this2.mapCracks[i]['stage']) - 1]}" width="${cellSize}px" height="${cellSize}px"></div>`;
            }

            cracksDiv.innerHTML = mapCracksHTML;
        }

        // Вывод блоков
        function upDateMap() {
            let mapHTML = ``;
            let mapBehindHTML = ``;

            for (let i = 0; i < this2.heightArray; i++) {
                for (let j = 0; j < this2.widthArray; j++) {

                    // Проверка на темноту
                    if (this2.mapDark[i][j] != 1) {

                        //  Проверка на передний блок
                        if (this2.map[i][j] != undefined) {
                            mapHTML += `<div class="block" style = "margin-top: ${i * cellSize}px; margin-left: ${j * cellSize}px;"><img src = "${blocks[blockList[this2.map[i][j]]]['src']}" width="${cellSize}px" height="${cellSize}px"></div>`;
                        }

                        // Проверка на задний блок  
                        if (this2.mapBehind[i][j] != undefined && (this2.map[i][j] == undefined || blocks[blockList[this2.map[i][j]]]['src'].slice(-3) != 'jpg')) {
                            mapBehindHTML += `<div class="block" style = "margin-top: ${i * cellSize}px; margin-left: ${j * cellSize}px;"><img src = "${blocksBehind[blockList[this2.mapBehind[i][j]]]}" width="${cellSize}px" height="${cellSize}px"></div>`;
                        }
                    }
                }
            }

            blocksDiv.innerHTML = mapHTML;
            blocksBehindDiv.innerHTML = mapBehindHTML;
            upDateMapFront();

            players[0].checkBlockDown();
            players[1].checkBlockDown();
        }

        // Вывод передних блоков
        function upDateMapFront() {
            let mapFrontHTML = ``;

            for (let i = 0; i < this2.mapFront.length; i++) {

                // Проверка на темноту
                if (this2.mapDark[this2.mapFront[i]['Y']][this2.mapFront[i]['X']] != 1) {
                    mapFrontHTML += `<div class="block" style = "margin-top: ${this2.mapFront[i]['Y'] * cellSize}px; margin-left: ${this2.mapFront[i]['X'] * cellSize}px;"><img src = "${blocks[blockList[this2.mapFront[i]['block']]]['src']}" width="${cellSize}px" height="${cellSize}px"></div>`;
                }
            }

            blocksFrontDiv.innerHTML = mapFrontHTML;
        }

        return [
            upDateMap,
            upDateMapFront,
            upDateCracks
        ];
    }
}


// Объекты блоки
const blocks = {
    "BlockGrass": {
        "src": "assets/img/textures/Блок трава.jpg",
        "collision": true,
        "flowability": false,
        "breakingSpeed": 3.5,
        "typeOfTool": "Shovel",
        "dropOutWithoutATool": true,
        "dropBlock": "BlockDirt"
    },
    "BlockDirt": {
        "src": "assets/img/textures/Блок грязь.jpg",
        "collision": true,
        "flowability": false,
        "breakingSpeed": 3.5,
        "typeOfTool": "Shovel",
        "dropOutWithoutATool": true,
        "dropBlock": "BlockDirt"
    },
    "BlockGravel": {
        "src": "assets/img/textures/Блок гравий.jpg",
        "collision": true,
        "flowability": true,
        "breakingSpeed": 2.5,
        "typeOfTool": "Shovel",
        "blockFallingOutWithoutATool": true,
        "dropBlock": "BlockGravel"
    },
    "BlockStone": {
        "src": "assets/img/textures/Блок камень.jpg",
        "collision": true,
        "flowability": false,
        "breakingSpeed": 1.6,
        "typeOfTool": "Pick",
        "dropOutWithoutATool": false,
        "dropBlock": "BlockPebble"
    },
    "BlockPebble": {
        "src": "assets/img/textures/Блок булыжник.jpg",
        "collision": true,
        "flowability": false,
        "breakingSpeed": 1.6,
        "typeOfTool": "Pick",
        "dropOutWithoutATool": false,
        "dropBlock": "BlockPebble"
    },
    "BlockBedrock": {
        "src": "assets/img/textures/Блок бедрок.jpg",
        "collision": true,
        "flowability": false,
        "breakingSpeed": 0,
        "typeOfTool": null,
        "dropOutWithoutATool": false,
        "dropBlock": null
    },
    "BlockPlank": {
        "src": "assets/img/textures/Блок доски.jpg",
        "collision": true,
        "flowability": false,
        "breakingSpeed": 2,
        "typeOfTool": "Axe",
        "dropOutWithoutATool": true,
        "dropBlock": "BlockPlank"
    },
    "BlockFence": {
        "src": "assets/img/textures/Блок заборинка.png",
        "collision": true,
        "flowability": false,
        "breakingSpeed": 2,
        "typeOfTool": "Axe",
        "dropOutWithoutATool": true,
        "dropBlock": "BlockFence"
    },
    "Minecart": {
        "src": "assets/img/textures/Вагонетка2.png",
        "collision": false,
        "flowability": false,
        "breakingSpeed": "max",
        "typeOfTool": "Pick",
        "dropOutWithoutATool": true,
        "dropBlock": "Minecart"
    },
    "BlockTorch": {
        "src": "assets/img/textures/Факел наклонённый.gif",
        "collision": false,
        "flowability": false,
        "breakingSpeed": "max",
        "typeOfTool": null,
        "dropOutWithoutATool": true,
        "dropBlock": "Torch"
    },
    "BlockInvertedTorch": {
        "src": "assets/img/textures/Факел наклонённый перевёрнутый.gif",
        "collision": false,
        "flowability": false,
        "breakingSpeed": "max",
        "typeOfTool": null,
        "dropOutWithoutATool": true,
        "dropBlock": "Torch"
    },
    "Rails": {
        "src": "assets/img/textures/Рельсы.png",
        "collision": false,
        "flowability": false,
        "breakingSpeed": 5,
        "typeOfTool": "Pick",
        "dropOutWithoutATool": true,
        "dropBlock": "Rails"
    },
    "BlockStair": {
        "src": "assets/img/textures/Блок ступенки.png",
        "collision": true,
        "flowability": false,
        "breakingSpeed": 2,
        "typeOfTool": "Axe",
        "dropOutWithoutATool": true,
        "dropBlock": "BlockInvertedStair"
    },
    "BlockInvertedStair": {
        "src": "assets/img/textures/Блок ступеньки перевёрнутые.png",
        "collision": true,
        "flowability": false,
        "breakingSpeed": 2,
        "typeOfTool": "Axe",
        "dropOutWithoutATool": true,
        "dropBlock": "BlockStair"
    }
}


// Объекты задние блоки
const blocksBehind = {
    "BlockGrass": "assets/img/textures/Блок трава2.jpg",
    "BlockDirt": "assets/img/textures/Блок грязь2.jpg",
    "BlockStone": "assets/img/textures/Блок камень2.jpg",
    "BlockBedrock": "assets/img/textures/Блок бедрок2.jpg"
};


// Список проиндексированых блоков
const blockList = {
    "0": "BlockGrass",
    "1": "BlockDirt",
    "2": "BlockStone",
    "3": "BlockBedrock",
    "4": "BlockPlank",
    "5": "BlockFence",
    "6": "Minecart",
    "7": "BlockTorch",
    "8": "BlockInvertedTorch",
    "9": "Rails",
    "10": "BlockStair",
    "11": "BlockInvertedStair",
    "12": "BlockGravel",
    "13": "BlockPebble"
}


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
];


// Инструменты
const tools = {
    // "Shovel": {
    //     "material": 
    // },
    // "Pick": {

    // },
    // "Axe": {

    // }
}


// Генерация мира
function generateMap(width = 100, height = 100) {
    // Генерация 
    World.timeWorld();
    World.generateWorld()[0](width, height);
    World.generateWorld()[6]();
    World.generateWorld()[1]();
    World.generateWorld()[2]();
    World.generateWorld()[3]();
    World.generateWorld()[4]();
    World.generateWorld()[5]();

    // Обновление
    players[0].upDate()[2]();
    players[1].upDate()[2]();
    World.upDate()[1]();
    World.upDate()[0]();
}


// Одноразовый код
players.push(new Player(
    1, 
    'assets/img/players/Steve', 
    ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'KeyT', 'KeyG', 'KeyY', 'KeyH', 'KeyQ', 'KeyE']
));
players[0].generateExternalVariables();

players.push(new Player(
    2, 
    'assets/img/players/Alex', 
    ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Numpad5', 'Numpad2', 'Numpad6', 'Numpad3', 'Numpad4', 'Numpad1']
));
players[1].generateExternalVariables();

generateMap();


// Отслеживает действия игроков
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    // console.log(event.code);

    let currentCharacter = null;

    if (players[0]['controlKeys'].includes(event.code)) {
        currentCharacter = 0;
    }

    if (players[1]['controlKeys'].includes(event.code)) {
        currentCharacter = 1;
    }

    // Передвижение
    if (currentCharacter != null) {
        if (players[currentCharacter]['controlKeys'].slice(0, 4).includes(event.code)) {
            event.preventDefault();
            setTimeout(() => {
                players[currentCharacter].movement(event.code);
            }, 10);
        }
    }

    // Сломать блок / построить блок
    if (currentCharacter != null) {

        if (players[currentCharacter]['controlKeys'].slice(4, 8).includes(event.code)) {
            event.preventDefault();
            setTimeout(() => {

                if (event.code == players[currentCharacter]['controlKeys'].slice(4, 5)) {
                    if (World.map[Math.round(players[currentCharacter]['cordY']) - 2][players[currentCharacter]['cordX']] != undefined && World.map[Math.round(players[currentCharacter]['cordY']) - 2][players[currentCharacter]['cordX']] != 3) {
                        players[currentCharacter].breakBlock(event.code);
                    }
                }

                if (event.code == players[currentCharacter]['controlKeys'].slice(5, 6)) {

                    if (World.map[Math.round(players[currentCharacter]['cordY']) + 1][players[currentCharacter]['cordX']] != undefined && World.map[Math.round(players[currentCharacter]['cordY']) + 1][players[currentCharacter]['cordX']] != 3) {
                        players[currentCharacter].breakBlock(event.code);
                    }
                }

                if (event.code == players[currentCharacter]['controlKeys'].slice(6, 7)) {
                    if (World.map[Math.round(players[currentCharacter]['cordY']) - 1][players[currentCharacter]['cordX'] + players[currentCharacter]['side'] * (-1)] != undefined && World.map[Math.round(players[currentCharacter]['cordY']) - 1][players[currentCharacter]['cordX'] + players[currentCharacter]['side'] * (-1)] != 3) {
                        players[currentCharacter].breakBlock(event.code);
                    }
                }

                if (event.code == players[currentCharacter]['controlKeys'].slice(7, 8)) {
                    if (World.map[Math.round(players[currentCharacter]['cordY'])][players[currentCharacter]['cordX'] + players[currentCharacter]['side'] * (-1)] != undefined && World.map[Math.round(players[currentCharacter]['cordY'])][players[currentCharacter]['cordX'] + players[currentCharacter]['side'] * (-1)] != 3) {
                        players[currentCharacter].breakBlock(event.code);
                    }
                }

            }, 40)
        }
    }
});


// Приближение
gameDiv.addEventListener('wheel', (event) => {
    event.preventDefault();

    let direction = event.deltaY > 0 ? -1 : 1;
    const stepSize = 1;

    if (currentZoom + direction * stepSize > 20 && currentZoom + direction * stepSize < 50) {
        currentZoom += direction * stepSize;
        cellSize = currentZoom;

        World.generateWorld()[6]();

        players[0].generatePlayerDimensions();
        players[1].generatePlayerDimensions();
        players[0].upDate()[0]();
        players[1].upDate()[0]();

        World.upDate()[0]();
        World.upDate()[2]();
    }
})


// Отслеживает обновление мира
document.addEventListener('keydown', (event) => ['Digit0'].includes(event.code) ? generateMap() : null);
