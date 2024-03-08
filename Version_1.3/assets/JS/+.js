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