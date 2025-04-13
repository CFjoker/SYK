document.addEventListener('DOMContentLoaded', () => {
    // 初始化各个组件
    initLogin();
    initDock();
    initWeatherApp();
    initButtonsApp();
    initMazeGame();
});

// ===== 登录页面 =====
function initLogin() {
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username-input');
    const loginError = document.getElementById('login-error');
    const loginScreen = document.getElementById('login-screen');
    const desktop = document.getElementById('desktop');

    loginButton.addEventListener('click', () => {
        if (usernameInput.value === '孙宇鲲') {
            loginScreen.classList.add('hidden');
            desktop.classList.remove('hidden');
            // 自动显示天气应用
            showApp('weather');
        } else {
            loginError.classList.remove('hidden');
            setTimeout(() => {
                loginError.classList.add('hidden');
            }, 3000);
        }
    });

    // 回车键也可以登录
    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginButton.click();
        }
    });
}

// ===== 底部应用栏 =====
function initDock() {
    const dockItems = document.querySelectorAll('.dock-item');
    
    dockItems.forEach(item => {
        item.addEventListener('click', () => {
            const appName = item.getAttribute('data-app');
            showApp(appName);
        });
    });

    // 窗口控制按钮
    document.querySelectorAll('.window-control.close').forEach(btn => {
        btn.addEventListener('click', () => {
            const appWindow = btn.closest('.app-window');
            appWindow.classList.add('hidden');
        });
    });
}

// 显示指定应用
function showApp(appName) {
    // 隐藏所有应用
    document.querySelectorAll('.app-window').forEach(app => {
        app.classList.add('hidden');
    });

    // 显示选中的应用
    const app = document.getElementById(`${appName}-app`);
    if (app) {
        app.classList.remove('hidden');
    }

    // 如果是天气应用，更新天气信息
    if (appName === 'weather') {
        updateWeather();
    }
}

// ===== 天气应用 =====
function initWeatherApp() {
    // 初始化时加载天气数据
    updateWeather();
}

function updateWeather() {
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherDescription = document.getElementById('weather-description');
    const weatherTemperature = document.getElementById('weather-temperature');
    const weatherMessage = document.getElementById('weather-message');

    // 这里是模拟天气数据
    // 实际使用时可以替换为真实的天气API
    const weatherTypes = [
        { 
            type: '晴天', 
            icon: '☀️', 
            message: '今天在悉尼阳光明媚，非常适合喝冰奶茶！' 
        },
        { 
            type: '多云', 
            icon: '⛅', 
            message: '今天悉尼有点多云，是出门逛街的好天气~' 
        },
        { 
            type: '雨天', 
            icon: '🌧️', 
            message: '哦不，悉尼下雨了！穿上你最喜欢的连帽衫，记得带伞哦~' 
        },
        { 
            type: '阴天', 
            icon: '☁️', 
            message: '今天悉尼阴天，适合呆在咖啡店里写代码！' 
        },
        { 
            type: '雷雨', 
            icon: '⛈️', 
            message: '悉尼有雷暴天气，记得待在室内安全的地方~' 
        }
    ];

    // 获取当前日期
    const today = new Date();
    const date = today.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // 随机选择一种天气（实际应用中应该使用API数据）
    const randomIndex = Math.floor(Math.random() * weatherTypes.length);
    const currentWeather = weatherTypes[randomIndex];
    
    // 随机生成温度（悉尼气温范围）
    const temperature = Math.floor(Math.random() * 15) + 15; // 15°C ~ 30°C

    // 更新UI
    weatherIcon.textContent = currentWeather.icon;
    weatherDescription.textContent = `${date}，悉尼${currentWeather.type}`;
    weatherTemperature.textContent = `温度: ${temperature}°C`;
    weatherMessage.textContent = `${currentWeather.message}`;
}

// ===== 按钮房间 =====
function initButtonsApp() {
    // 烟花效果按钮
    document.getElementById('cool-button').addEventListener('click', () => {
        createFireworks();
    });

    // 爱心效果按钮
    document.getElementById('love-button').addEventListener('click', () => {
        createHearts();
    });

    // emo按钮
    document.getElementById('emo-button').addEventListener('click', () => {
        createHug();
    });

    // 惊喜按钮
    document.getElementById('surprise-button').addEventListener('click', () => {
        playSurprise();
    });
}

// 创建烟花效果
function createFireworks() {
    const effectArea = document.getElementById('button-effect-area');
    
    // 清除现有效果
    clearEffects();
    
    // 创建多个烟花
    for (let i = 0; i < 20; i++) {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        
        // 随机位置和颜色
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        
        firework.style.left = x + '%';
        firework.style.top = y + '%';
        firework.style.backgroundColor = color;
        
        effectArea.appendChild(firework);
        
        // 动画结束后移除
        setTimeout(() => {
            firework.remove();
        }, 1000);
    }
}

// 创建爱心效果
function createHearts() {
    const effectArea = document.getElementById('button-effect-area');
    
    // 清除现有效果
    clearEffects();
    
    // 创建多个爱心
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            
            // 随机位置
            const x = Math.random() * 100;
            heart.style.left = x + '%';
            heart.style.bottom = '0';
            
            effectArea.appendChild(heart);
            
            // 动画结束后移除
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 100);
    }
}

// 创建拥抱效果
function createHug() {
    const effectArea = document.getElementById('button-effect-area');
    
    // 清除现有效果
    clearEffects();
    
    const hug = document.createElement('div');
    hug.classList.add('hug');
    hug.innerHTML = '🤗';
    effectArea.appendChild(hug);
    
    // 3秒后移除
    setTimeout(() => {
        hug.remove();
    }, 3000);
}

// 播放惊喜效果
function playSurprise() {
    const effectArea = document.getElementById('button-effect-area');
    
    // 清除现有效果
    clearEffects();
    
    // 创建随机动物表情
    const animals = ['🐱', '🐶', '🐼', '🐰', '🦊', '🐨', '🐯', '🦁', '🐸', '🐷'];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    
    const surprise = document.createElement('div');
    surprise.classList.add('hug'); // 复用hug的动画
    surprise.innerHTML = randomAnimal;
    effectArea.appendChild(surprise);
    
    // 播放声音（如果需要）
    // const audio = new Audio('sound.mp3');
    // audio.play();
    
    // 3秒后移除
    setTimeout(() => {
        surprise.remove();
    }, 3000);
}

// 清除特效区域的所有效果
function clearEffects() {
    const effectArea = document.getElementById('button-effect-area');
    effectArea.innerHTML = '';
}

// ===== 迷宫游戏 =====
let player = { x: 0, y: 0 };
let maze = [];
let cellSize = 20;
let mazeWidth = 20;
let mazeHeight = 20;
let exit = { x: 0, y: 0 };

function initMazeGame() {
    document.getElementById('close-win-modal').addEventListener('click', () => {
        document.getElementById('maze-win-modal').classList.add('hidden');
    });
    
    // 当迷宫应用显示时，生成迷宫
    document.querySelector('.dock-item[data-app="maze"]').addEventListener('click', () => {
        generateMaze();
    });
    
    // 键盘控制
    document.addEventListener('keydown', handleKeyDown);
}

// 生成迷宫
function generateMaze() {
    const mazeContainer = document.getElementById('maze-game');
    mazeContainer.innerHTML = '';
    
    cellSize = Math.min(
        Math.floor(mazeContainer.offsetWidth / mazeWidth),
        Math.floor(mazeContainer.offsetHeight / mazeHeight)
    );
    
    // 创建迷宫数据
    maze = Array(mazeHeight).fill().map(() => Array(mazeWidth).fill(1));
    
    // 使用简单算法生成迷宫
    generateSimpleMaze();
    
    // 设置玩家起始位置
    player = { x: 1, y: 1 };
    
    // 设置出口位置（迷宫的右下角）
    exit = { x: mazeWidth - 2, y: mazeHeight - 2 };
    maze[exit.y][exit.x] = 0;
    
    // 绘制迷宫
    drawMaze();
}

// 使用简单算法生成迷宫
function generateSimpleMaze() {
    // 从所有为1的单元格开始
    // 先把外围一圈设为墙
    for (let y = 0; y < mazeHeight; y++) {
        for (let x = 0; x < mazeWidth; x++) {
            if (y === 0 || x === 0 || y === mazeHeight - 1 || x === mazeWidth - 1) {
                maze[y][x] = 1; // 墙
            } else {
                // 随机设置通道和墙壁
                // 使用一个简单的随机算法，避免过于复杂的迷宫
                if (Math.random() < 0.7) { // 70%的概率是通道
                    maze[y][x] = 0; // 通道
                } else {
                    maze[y][x] = 1; // 墙
                }
            }
        }
    }
    
    // 确保起点和终点是通道
    maze[1][1] = 0;
    maze[mazeHeight - 2][mazeWidth - 2] = 0;
    
    // 确保迷宫有解，创建一条从起点到终点的路径
    ensurePath();
}

// 确保从起点到终点有一条路径
function ensurePath() {
    let x = 1;
    let y = 1;
    const endX = mazeWidth - 2;
    const endY = mazeHeight - 2;
    
    while (!(x === endX && y === endY)) {
        maze[y][x] = 0; // 设为通道
        
        if (x < endX && Math.random() < 0.6) {
            x++;
        } else if (y < endY) {
            y++;
        } else {
            x++;
        }
    }
}

// 绘制迷宫
function drawMaze() {
    const mazeContainer = document.getElementById('maze-game');
    mazeContainer.innerHTML = '';
    
    // 绘制墙壁
    for (let y = 0; y < mazeHeight; y++) {
        for (let x = 0; x < mazeWidth; x++) {
            if (maze[y][x] === 1) {
                const wall = document.createElement('div');
                wall.classList.add('maze-wall');
                wall.style.width = cellSize + 'px';
                wall.style.height = cellSize + 'px';
                wall.style.left = (x * cellSize) + 'px';
                wall.style.top = (y * cellSize) + 'px';
                mazeContainer.appendChild(wall);
            }
        }
    }
    
    // 绘制出口
    const exitElem = document.createElement('div');
    exitElem.classList.add('maze-exit');
    exitElem.style.width = cellSize + 'px';
    exitElem.style.height = cellSize + 'px';
    exitElem.style.left = (exit.x * cellSize) + 'px';
    exitElem.style.top = (exit.y * cellSize) + 'px';
    mazeContainer.appendChild(exitElem);
    
    // 绘制玩家
    const playerElem = document.createElement('div');
    playerElem.classList.add('maze-player');
    playerElem.style.width = cellSize + 'px';
    playerElem.style.height = cellSize + 'px';
    playerElem.style.left = (player.x * cellSize) + 'px';
    playerElem.style.top = (player.y * cellSize) + 'px';
    mazeContainer.appendChild(playerElem);
}

// 处理键盘按键
function handleKeyDown(e) {
    // 只有在迷宫应用可见时才响应按键
    if (document.getElementById('maze-app').classList.contains('hidden')) {
        return;
    }
    
    const key = e.key.toLowerCase();
    let newX = player.x;
    let newY = player.y;
    
    // 根据按键移动玩家
    if (key === 'arrowup' || key === 'w') {
        newY--;
    } else if (key === 'arrowdown' || key === 's') {
        newY++;
    } else if (key === 'arrowleft' || key === 'a') {
        newX--;
    } else if (key === 'arrowright' || key === 'd') {
        newX++;
    } else {
        return; // 不是方向键，不进行处理
    }
    
    // 检查是否可以移动（不是墙）
    if (newX >= 0 && newX < mazeWidth && newY >= 0 && newY < mazeHeight && maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
        
        // 更新玩家位置
        const playerElem = document.querySelector('.maze-player');
        playerElem.style.left = (player.x * cellSize) + 'px';
        playerElem.style.top = (player.y * cellSize) + 'px';
        
        // 检查是否到达终点
        if (player.x === exit.x && player.y === exit.y) {
            showWinModal();
        }
    }
}

// 显示胜利弹窗
function showWinModal() {
    const winModal = document.getElementById('maze-win-modal');
    const winGif = document.getElementById('win-gif');
    
    // 设置一个胜利的表情符号
    winGif.innerHTML = '<div style="font-size: 80px;">🎉🏆🎊</div>';
    
    winModal.classList.remove('hidden');
}