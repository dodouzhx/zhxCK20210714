(function() {
    //获取画布元素
    var canvas = document.getElementsByClassName("canvas")[0];
    //所有生成的元素
    var cells = canvas.getElementsByClassName("cell");
    //开始按钮
    var btnStart = document.getElementById('btnStart');
    //暂停按钮
    var btnPause = document.getElementById('btnPause');
    //游戏开始暂停的标志位
    var gameFlag = false;
    //获取得等元素
    var score = document.getElementById('game-score');
    //获取减分元素
    var unscore = document.getElementById('game-faildcount');
    //生成字母的定时器
    var timer = null;

    // 声明两个变量来存储 得分 和 错误分
    var score11 = 0;
    var faildCount = 0;

    // 声明一个变量，来决定小盒子移动的速度
    var step = 1;

    // 2. 设置定时器，让所有的小盒子能够向下自动移动
    // 帧： 每秒有多少幅图像  60帧是常见的比较流畅的帧率
    // 1秒60帧， 1帧多少毫秒？？
    // 1000 / 60 = 16.7

    // 声明一个变量，用来设置一秒中内产生多少个文字盒子
    var appearSpeed = 2;

    // 声明一个变量，用来记录当前在第几帧
    var count = 1;

    btnStart.onclick = function() {
        //每次开始时清除定时器
        clearInterval(timer);
        gameFlag = true;
        //每一帧每一帧累加
        timer = setInterval(creatZM, 16.7);
    }
    btnPause.onclick = function() {
        gameFlag = false;
        clearInterval(timer);
    }

    document.onkeydown = function(e) {
        // console.log(String.fromCharCode(e.keyCode));
        // 通过e.keyCode 我们可以知道用户按的是哪个键
        // 知道用户的按键内容之后，我们需要找到和用户按的对应的字母小盒子
        // cells 是一个类数组 伪数组
        // 我们可以借用数组查找元素的方法，找到对应的元素

        // 如果有戏没开始，啥也不干
        if (!gameFlag) return;
        var target = Array.prototype.find.call(cells, function(item) {
            return item.innerText === String.fromCharCode(e.keyCode);
        });
        if (target) {
            canvas.removeChild(target);
            score11++;
            score.innerText = "得分：" + score11;
        } else {
            faildCount++;
            unscore.innerText = "错误：" + faildCount;
            gameOver();
        }
    }

    //生成字母
    function creatZM() {
        count++;
        count = count % 60;
        // 每隔多少帧产生一个字母 通过下面的公式计算
        // 60 / appearSpeed =  30
        if (count % (60 / appearSpeed) == 0) {
            // 这里需要动态生成文字盒子
            var cell = document.createElement("div");
            cell.className = "cell";
            // 用ascii码的方式生成随机字母 给cell
            cell.innerText = String.fromCharCode(Math.round(Math.random() * 25) + 65);
            // 生成随机颜色交给背景色
            cell.style.backgroundColor = randomColor();
            //生成随机位置
            cell.style.left = Math.random() * (canvas.offsetWidth - 40) + "px";
            canvas.appendChild(cell);
        }
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.top = cells[i].offsetTop + step + 'px';
            var top = cells[i].offsetTop;
            if (top >= canvas.offsetHeight - cells[i].offsetHeight) {
                canvas.removeChild(cells[i]);
                faildCount++;
                unscore.innerText = "错误：" + faildCount;
            }
        }
        gameOver();
    }

    //结束游戏
    function gameOver() {
        if (faildCount >= 10) {
            //clearInterval(timer);
            var isDel = confirm('\r~游戏结束~\n\r当前得分：' + score11 + '\n\r重新开始请点击 ‘确定’ 按钮');
            if (isDel) {
                clearInterval(timer);
                window.location.reload();
            }
        }
    }

    //生成随机颜色
    function randomColor() {
        var r = Math.round(Math.random() * 254);
        var g = Math.round(Math.random() * 254);
        var b = Math.round(Math.random() * 254);
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
})()