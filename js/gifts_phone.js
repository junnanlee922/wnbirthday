let lotteryChances = localStorage.getItem("randomLotteryChances");
document.getElementById('lotteryChancesDisplay').textContent = '剩余次数：' + lotteryChances;

$(function () {
    let state = false;
    let second = 0;
    let itemWidth = 90;
    let gongge = 9;
    let offset = 1.8;
    let map = [];
    let t = null;

    let imagePathPrefix = 'img/game/level3/';

    $("#btn").click(function () {
        if (state) {
            Stop();
        } else {
            Start(gongge);
        }
    });

    $("#ago").click(function () {
        gongge = 9;
        imagePathPrefix = 'img/game/level3/';
        $(".box").html('');
        $(".btnbox .time").text('0');
        clearInterval(t);
        initMap(gongge);
        updateImages(gongge, imagePathPrefix);
        initUI();
        state = false;
        $(".btnbox .jieguo").text("");
        alert("游戏成功，即可获得一次抽奖机会！");
    });

    $("#later").click(function () {
        gongge = 16;
        imagePathPrefix = 'img/game/level4/';
        $(".box").html('');
        $(".btnbox .time").text('0');
        clearInterval(t);
        initMap(gongge);
        updateImages(gongge, imagePathPrefix);
        initUI();
        state = false;
        $(".btnbox .jieguo").text("");
        alert("游戏成功，可直接获得礼物“大满贯”！");
    });

    $("#ret").click(function () {
        // 隐藏拼图游戏
        document.getElementById('game').style.display = 'none';

        // 显示抽奖和礼物池
        document.getElementById('choosegift').style.display = 'flex';
        document.getElementById('gifts_pool').style.display = 'flex';
    });

    initMap(gongge);
    initUI();

    function initMap(total) {
        gongge = total;
        let rowCount = Math.pow(total, 1 / 2);
        let colCount = rowCount;

        let itemHeight = itemWidth;
        for (var i = 0; i < rowCount; i++) {
            map[i] = [];
            for (var j = 0; j < colCount; j++) {
                var eq = i * rowCount + j;
                if (eq < total - 1) {
                    $('.box').append('<div class="sz"><img src="img/game/level3/' + (eq + 1) + '.jpg" alt="Image"></div>');
                } else {
                    $('.box').append('<div class="sz kong">' + '</div>');
                }
                map[i][j] = [i * itemWidth, j * itemWidth, eq + 1, eq + 1];
                $('.box .sz').eq(eq).css("top", map[i][j][0] + offset);
                $('.box .sz').eq(eq).css("left", map[i][j][1] + offset);

            }
        }
    }

    function updateImages(total, imgpath) {
        let rowCount = Math.pow(total, 1 / 2);
        let colCount = rowCount;
        let itemHeight = itemWidth;

        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < colCount; j++) {
                let eq = i * rowCount + j;
                if (eq < total - 1) {
                    let imagePath = imgpath + ((eq % total) + 1) + '.jpg';
                    $('.box .sz').eq(eq).html('<img src="' + imagePath + '" alt="Image">');
                } else {
                    $('.box .sz').eq(eq).html('');
                }
            }
        }
    }

    function initUI() {
        let rowCount = Math.pow(gongge, 1 / 2);
        $("#btn").text("开始");
        $(".box").width(rowCount * itemWidth);
        $(".box").height(rowCount * itemWidth);
        if (gongge === 16) {
            $(".box .sz").css({
                width: '24%',
                height: '24%',
            });
        } else {
            $(".box .sz").css({
                width: '32%',
                height: '32%',
            });
        }
    }

    function Start(total) {
        DoRandom(total);
        DrowUI(total);
        state = true;
        move(total);
        $("#btn").text("结束");
        t = setInterval(function () {
            if (state) {
                second++;
                if (second === 101) {
                    alert("过关难度有一定的随机性，建议重新开始！");
                }
                if (second === 501) {
                    alert("你就不听劝，非得硬刚");
                }
            }
            $(".btnbox .time").text(second + 'S');
        }, 1000);
        CheckWin(total);
        $(".btnbox .jieguo").text("");
    }

    function Stop(win) {
        if (gongge === 9) {
            if (win) {
                $(".btnbox .jieguo").text("成功获得1次抽奖机会！用时：" + second + "S");
                lotteryChances++;
                document.getElementById('lotteryChancesDisplay').textContent = '剩余次数：' + lotteryChances;
            } else {
                $(".btnbox .jieguo").text("欠点火候哟！用时：" + second + "S");
            }
        } else if (gongge === 16) {
            if (win) {
	$(".btnbox .jieguo").text("直接大满贯！用时：" + second + "S");
                var giftElements = document.querySelectorAll('#gifts .text-container');
            for (var i = 0; i < giftElements.length; i++) {
                giftElements[i].classList.add('highlighted');
            }
            } else {
                $(".btnbox .jieguo").text("老实的玩三阶吧！用时：" + second + "S");
            }
        }

        $("#btn").text("重新挑战");
        $(".box .sz img").off('click');

        clearInterval(t);
        second = 0;
        $(".btnbox .time").text(second);
        t = null;
        state = false;
    }

    function DrowUI(total) {
        let rowCount = Math.pow(total, 1 / 2);
        let colCount = rowCount;
        for (var i = 0; i < rowCount; i++) {
            for (var j = 0; j < colCount; j++) {
                var eq = map[i][j][2] - 1;
                $('.box .sz').eq(eq).css("top", map[i][j][0] + offset);
                $('.box .sz').eq(eq).css("left", map[i][j][1] + offset);
            }
        }
    }

    function DoRandom(total) {
        let i = 0;
        while (i < total) {
            let rowCount = Math.pow(total, 1 / 2);
            let colCount = rowCount;
            let x = Math.floor(Math.random() * rowCount);
            let y = Math.floor(Math.random() * colCount);
            let x1 = Math.floor(Math.random() * rowCount);
            let y1 = Math.floor(Math.random() * colCount);
            let tmp = 0;
            tmp = map[x][y][2];
            map[x][y][2] = map[x1][y1][2];
            map[x1][y1][2] = tmp;
            i++;
        }
    }

    function move(total) {
        let rowCount = Math.pow(total, 1 / 2);
        let colCount = rowCount;
        let currnum = 0;
        let winnum = 0;
        let index = 0;
        if (state) {
            $(".box .sz img").click(function (e) {
                let currentImg = $(this);
                let currnum = parseInt(currentImg.attr('src').replace(imagePathPrefix, '').replace('.jpg', ''));

                if (currnum == gongge) return;
                Spance = findNum(total, gongge);
                curr = findNum(total, currnum);

                let currRow = curr[0] / itemWidth;
                let currCol = curr[1] / itemWidth;
                let SpanRow = Spance[0] / itemWidth;
                let SpanCol = Spance[1] / itemWidth;

                if (currRow == SpanRow) {
                    swapRow(currRow, currCol, SpanCol);
                    DrowUI(total);
                    CheckWin(total);
                } else if (currCol == SpanCol) {
                    swapCol(currCol, currRow, SpanRow);
                    DrowUI(total);
                    CheckWin(total);
                }
            })
        }
    }

    function swapRow(row, currCol, blankCol) {
        if (currCol == blankCol) return;

        let speed = blankCol < currCol ? 1 : -1;
        while (currCol != blankCol) {
            let n = blankCol + speed;
            let tmp = map[row][blankCol][2];
            map[row][blankCol][2] = map[row][n][2];
            map[row][n][2] = tmp;

            blankCol += speed;
        }
    }

    function swapCol(Col, currRow, blankRow) {
        if (currRow == blankRow) return;

        let speed = blankRow < currRow ? 1 : -1;
        while (currRow != blankRow) {
            let n = blankRow + speed;
            let tmp = map[blankRow][Col][2];
            map[blankRow][Col][2] = map[n][Col][2];
            map[n][Col][2] = tmp;

            blankRow += speed;
        }
    }

    function findNum(total, currnum) {
        let rowCount = Math.pow(total, 1 / 2);
        let colCount = rowCount;
        for (let x = 0; x < rowCount; x++) {
            for (let y = 0; y < colCount; y++) {
                if (map[x][y][2] == currnum) {
                    return map[x][y];
                }
            }
        }
    }

    function CheckWin(total) {
        let rowCount = Math.pow(total, 1 / 2);
        let colCount = rowCount;
        let itemWidth = 100;
        let itemHeight = itemWidth;
        let wincount = 0;
        for (var i = 0; i < rowCount; i++) {
            for (var j = 0; j < colCount; j++) {
                if (map[i][j][2] == map[i][j][3]) {
                    wincount++;
                }
            }
        }
        if (wincount == total) {
            Stop(true);
        }
    }
});


/* 抽奖模块 */
    function spinWheel() {
        var selectedCellIndex; // 将变量声明放在函数内部
        // 检查是否有抽奖机会
        if (lotteryChances > 0) {
            // 有抽奖机会，执行抽奖逻辑
            var cells = document.getElementsByClassName('cell');
            do {
                selectedCellIndex = Math.floor(Math.random() * 9);
            } while (selectedCellIndex === 4);
            lotteryChances--;

            // 更新显示抽奖次数的元素内容
            document.getElementById('lotteryChancesDisplay').textContent = '剩余次数：' + lotteryChances;

            // 每次启动时重置所有格子颜色
            for (var i = 0; i < cells.length; i++) {
                if (i == 4) {
                    continue;
                }
                cells[i].style.backgroundColor = "#fff";
            }

            // 随机初始化开始的位置
            do {
                currentIndex = Math.floor(Math.random() * 9);
            } while (currentIndex === 4);

            var rotationCount = 0; // 计数器，表示转动的次数
            animate(cells); // 开始执行，并传递 cells 作为参数
        } else {
            alert("不好意思，宝，莫得抽奖机会了！可以点击右下角“更多抽奖机会”");
        }

        function animate(cells) {
            cells[currentIndex].style.background = ''; // 将背景设置为空
            cells[currentIndex].style.backgroundSize = '';

            // 更新索引 保证它是逆时针旋转 并且绕过最中间的小正方形 
            // 这里注意索引值是0-8 这一步相当于是人工控制了下一步该往哪走
            switch (currentIndex) {
                case 0:
                    currentIndex = 3;
                    break;
                case 1:
                    currentIndex = 0;
                    break;
                case 2:
                    currentIndex = 1;
                    break;
                case 3:
                    currentIndex = 6;
                    break;
                case 5:
                    currentIndex = 2;
                    break;
                case 6:
                    currentIndex = 7;
                    break;
                case 7:
                    currentIndex = 8;
                    break;
                case 8:
                    currentIndex = 5;
                    break;
            }

            // 如果当前格子不是选中的格子，就改变颜色
            if (currentIndex !== selectedCellIndex || rotationCount < 16) {
                cells[currentIndex].style.transition = 'background-color 0.3s ease'; // 默认过渡效果
                cells[currentIndex].style.backgroundColor = 'white'; // 默认背景颜色
                setTimeout(function () {
                    animate(cells); // 将 cells 传递给下一次调用
                }, 100); // 0.1秒后继续

                // 让轮盘多转几圈，更真实一点，避免出现一开始就停止的情况
                // 每转一圈计数器加一  
                rotationCount++;
                // 如果转动的次数超过一定值，可以停止动画，避免无限递归
            } else {
                cells[currentIndex].style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease'; // 添加过渡效果
                cells[currentIndex].style.backgroundColor = '#white'; // 突出显示的背景颜色
                cells[currentIndex].style.boxShadow = '0 0 10px rgba(232, 99, 96, 1)'; // 添加阴影效果
                cells[currentIndex].style.transform = 'scale(1.1)';
                // 设置一个定时器，最后一个格子是选中的格子，等待一段时间后弹窗显示抽中的物品
                setTimeout(function () {
                    if (selectedCellIndex < 5 && rotationCount >= 16) {
                        alert("恭喜我宝抽中：" + (selectedCellIndex + 1) + "号礼物");
                        highlightSelectedGift(selectedCellIndex);
                    } else if (selectedCellIndex >= 5 && rotationCount >= 16) {
                        alert("恭喜我宝抽中：" + (selectedCellIndex) + "号礼物");
                        highlightSelectedGift(selectedCellIndex - 1);
                    }
                    cells[currentIndex].style.transform = 'scale(1)';
                    cells[currentIndex].style.boxShadow = '0 0 0 rgba(255, 255, 255, 0)';
                }, 300);
            }
        }
    }

    function highlightSelectedGift(selectedIndex) {
        // 获取礼物池中所有的 p 元素
        var giftElements = document.querySelectorAll('#gifts .text-container');
        // 高亮显示抽中的礼物
        giftElements[selectedIndex].classList.add('highlighted');
    }



    document.getElementById('selectedCell').addEventListener('click', spinWheel);
    document.getElementById('exchangeButton').addEventListener('click', function() {
  	// 隐藏抽奖和礼物池和拼图游戏
  	document.getElementById('choosegift').style.display = 'none';
  	document.getElementById('gifts_pool').style.display = 'none';
  	document.getElementById('game').style.display = 'none';
	displayHighlightedGiftsBox();
	document.querySelector('.exchange_model').style.display = 'flex';
	document.querySelector('.exchange_model').style.flexDirection = 'column';
});
    document.getElementById('getMoreChancesButton').addEventListener('click', function() {
  	// 隐藏抽奖和礼物池
  	document.getElementById('choosegift').style.display = 'none';
  	document.getElementById('gifts_pool').style.display = 'none';
  	document.querySelector('.exchange_model').style.display = 'none';
  	// 显示拼图游戏
  	document.getElementById('game').style.display = 'flex';
	document.getElementById('game').style.flexDirection = 'column';
	});

function getHighlightedGiftsText() {
    // 获取礼物池中所有带有高亮类的 p 元素
    var highlightedGifts = document.querySelectorAll('#gifts .text-container.highlighted');
    
    // 初始化一个数组来存储高亮礼物的文字
    var highlightedGiftsText = [];
    
    // 遍历高亮礼物元素，将文字添加到数组中
    highlightedGifts.forEach(function(giftElement) {
        highlightedGiftsText.push(giftElement.textContent);
    });
    
    // 返回包含高亮礼物文字的数组
    return highlightedGiftsText;
}

function displayHighlightedGiftsBox() {
    // 移除之前的显示框（如果存在）
    var existingDisplayBox = document.getElementById('highlightedGiftsDisplayBox');
    if (existingDisplayBox) {
        existingDisplayBox.remove();
    }

    // 获取高亮礼物文字数组
    var highlightedGiftsArray = getHighlightedGiftsText();

    // 创建一个新的 div 元素用于显示高亮礼物文字
    var displayBox = document.createElement('div');
    displayBox.id = 'highlightedGiftsDisplayBox'; // 设置一个唯一的 id

    // 设置 div 的样式
    displayBox.style.width = '50%'; // 设置边框样式
    displayBox.style.padding = '10px'; // 设置内边距
    displayBox.style.margin = '10px'; // 设置外边距
    displayBox.style.backgroundColor = 'rgba(255,255,255,0.5)';
    displayBox.style.borderRadius = '10px';
    // 创建一个标题元素
    var titleElement = document.createElement('h3');
    titleElement.textContent = '待兑换的礼物';

    // 将标题元素添加到 div 中
    displayBox.appendChild(titleElement);

    // 遍历高亮礼物数组，创建并添加 p 元素到 div 中
    highlightedGiftsArray.forEach(function(giftText) {
        var giftParagraph = document.createElement('p');
        giftParagraph.textContent = giftText;
        displayBox.appendChild(giftParagraph);
    });

    // 将 div 元素添加到页面的 body 中
    document.body.appendChild(displayBox);
}

function hideHighlightedGiftsBox() {
    // 移除之前的显示框（如果存在）
    var existingDisplayBox = document.getElementById('highlightedGiftsDisplayBox');
    if (existingDisplayBox) {
        existingDisplayBox.remove();
    }
}

function submitForm() {
    var userConfirmed = window.confirm('提交了就失去获得更多礼物的机会，确定要提交吗？');
    if (userConfirmed) {
        alert('3分钟后，你将收到这些生日礼物！');
        alert('在这之前还有个小彩蛋');
        window.location.href = 'lunbotu_phone.html';
    } 
    }
    function retRaffle() {
  	document.getElementById('choosegift').style.display = 'flex';
  	document.getElementById('gifts_pool').style.display = 'flex';
  	document.querySelector('.exchange_model').style.display = 'none';
  	document.getElementById('game').style.display = 'none';
	hideHighlightedGiftsBox();
        }