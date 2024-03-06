// Объекты задние блоки
const blocksBehind = {
    "BlockGrass": "assets/img/textures/Блок трава2.jpg",
    "BlockDirt": "assets/img/textures/Блок грязь2.jpg",
    "BlockStone": "assets/img/textures/Блок камень2.jpg",
    "BlockBedrock": "assets/img/textures/Блок бедрок2.jpg"
};


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