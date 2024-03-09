<h1>GameMine</h1>
<h3>Minecraft and Terraria Mashup</h3>
<img src = "preview.jpg"></img>

<!-- Управление -->
<h2>English</h2>
<h3>Controls for the first player:</h3>
<p>A - move left</p>
<p>D - move right</p>
<p>W - Jump</p>
<p>S - Crouch</p>
<p>T - break block above</p>
<p>G - break block below</p>
<p>Y - break block at head level in front</p>
<p>H - break block at foot level in front</p>
<br>
<h3>Controls for the second player:</h3>
<p>ArrowLeft - move left</p>
<p>ArrowRight - move right</p>
<p>ArrowUp - Jump</p>
<p>ArrowDown - Crouch</p>
<p>Numpad 5 - break block above</p>
<p>Numpad 2 - break block below</p>
<p>Numpad 6 - break block at head level in front</p>
<p>Numpad 3 - break block at foot level in front</p>

<br>
<h2>Русский</h2>
<h3>Управление для первого игрока:</h3>
<p>A - шаг в лево</p>
<p>D - шаг в право</p>
<p>W - Прыжок</p>
<p>S - Присед</p>
<p>T - сломать блок над собой</p>
<p>G - сломать блок под собой</p>
<p>Y - сломать блок на уровне головы перед собой</p>
<p>H - сломать блок на уровне ног перед собой</p>
<br>
<h3>Управление для второго игрока:</h3>
<p>ArrowLeft - шаг в лево</p>
<p>ArrowRight - шаг в право</p>
<p>ArrowUp - Прыжок</p>
<p>ArrowDown - Присед</p>
<p>Numpad 5 - сломать блок над собой</p>
<p>Numpad 2 - сломать блок под собой</p>
<p>Numpad 6 - сломать блок на уровне головы перед собой</p>
<p>Numpad 3 - сломать блок на уровне ног перед собой</p>

<!-- Version 1.3 -->
изменена начальная высота спавна
солнеце и луна передвинуты влево для наглядности
добавлен класс Player, теперь созданее игроков происходит через него
размер блока стал более адаптивный и теперь изначально равен 35.5 px
стили и анимации разбиты на отдельные файлы
игра сделана в виде игрового окна
настроены размеры фонов
Теперь у объекта мир есть время с начала создания мира, в милисекундах
Был полнусть переделан массив блоков
крассивые скролы
Добавлены такие шкалы как сытость и здоровье 
Добавлен урон от падения


<!-- Version 1.2 -->
<br>
<h2>Version 1.2</h2>

<p><a href="https://picsile.github.io/GameMine/Version_1.2/index.html">Link to test</a></p>

<p>Snapshots:</p>
<img src="Version_1.2/snapshots/Dark.png" width="400" height="350"></img>
<img src="Version_1.2/snapshots/change of day.gif" width="400" height="250"></img>

<h3>English</h3>
<p>Changes:</p>
<ul>
    <li>Darkness: now players will gradually reveal sections of the map to see what lies behind them.</li>
    <li>Day and night cycle: now a day and night cycle occurs every 2 minutes. The animations look as follows:</li>
    <li>Optimization: now only the block that is in the foreground or together with the background block (if the foreground block is transparent) is loaded in one cell. Also, only the blocks that the player loads or that are on the surface are displayed on the screen. Darkness is the furthest background.</li>
</ul>
<p>Other changes:</p>
<ul>
    <li>The world object has been divided into main functions: output, generation, and interaction.</li>
    <li>The cloud background has been replaced with clear sky.</li>
    <li>Changed the generation of the array of foreground and background blocks.</li>
</ul>

<br>
<h3>Русский</h3>
<p>Крупные изменения:</p>
<ul>
    <li>Темнота: теперь игрок будет постепенно открывать участки карты, чтобы увидеть, что за ними находится.</li>
    <li>Смена дня и ночи: теперь каждые 2 минуты происходит смена дня и ночи. Анимации выглядят следующим образом:</li>
    <li>Оптимизация: теперь в одной ячейке прогружается только блок, который стоит на переднем фоне или вместе с задним блоком (если передний блок прозрачный). Также на экране показываются только блоки, которые игрок прогружает или они находятся на поверхности. Темнота является самым задним фоном.</li>
</ul>
<p>Другие изменения:</p>
<ul>
    <li>Объект мира был разделён на основные функции: вывода, генерации и взаимодействия.</li>
    <li>Фон облаков заменён чистым небом.</li>
    <li>Изменена генерация массива передних блоков и задних блоков.</li>
</ul>

<!-- Version 1.1 -->
<br>
<h2>Version 1.1</h2>

<p><a href="https://picsile.github.io/GameMine/Version_1.1/index.html">Link to test</a></p>

<h3>English</h3>
<p>Changes:</p>
<ul>
    <li>Added durability to each block, now breaking blocks requires multiple clicks.</li>
    <li>Code has been split into objects.</li>
    <li>Improved animation system, animations no longer reset after each action.</li>
    <li>Enhanced cave generation.</li>
    <li>Fixed bug with simultaneous destruction of cave blocks.</li>
    <li>Fixed crouching bug.</li>
    <li>Changed management</li>
    <li>Removed ability to place blocks.</li>
</ul>

<br>
<h3>Русский</h3>
<p>Изменения:</p>
<ul>
    <li>Добавлена прочность каждому блоку, теперь для ломки блоков требуется несколько кликов.</li>
    <li>Код был разделен на объекты.</li>
    <li>Улучшена система анимации, анимации теперь не сбрасываются после каждого действия.</li>
    <li>Улучшена генерация шахт.</li>
    <li>Исправлен баг с одновременным разрушением блоков шахт.</li>
    <li>Исправлен баг с приседанием.</li>
    <li>Изменино управление</li>
    <li>Убрана возможность ставить блоки.</li>
</ul>

<!-- Version 1 -->
<br>
<h2>Version 1</h2>

<p><a href="https://picsile.github.io/GameMine/Version_1/index.html">Link to test</a></p>
