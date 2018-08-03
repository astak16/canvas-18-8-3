var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var eraser = document.getElementsByClassName('eraser')[0]
var pen = document.getElementsByClassName('pen')[0]
var wrapper = document.getElementsByClassName('wrapper')[0]
var clear = document.getElementsByClassName('clear')[0]
var clearDrawWrapper = document.getElementsByClassName('clearDrawWrapper')[0]
var input = document.getElementById('input');
var download = document.getElementById('download');

var pressMouse = false,
    penEnable = false,
    color
var oldPoint = {'x':undefined,'y':undefined}

init(canvas)
getCanvas()


function  init(canvas) {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight

    window.onresize = function () {
        canvas.width = document.documentElement.clientWidth
        canvas.height = document.documentElement.clientHeight
    }
}

function getCanvas(){
    /* 按下鼠标 */
    if('ontouchstart' in document.body){    //特性检测
        canvas.addEventListener('touchstart',function (e) {
            pressMouse = true
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            if(penEnable){
                ctx.clearRect(x,y,10,10)
            }else{
                circle(x,y)
                oldPoint.x = x
                oldPoint.y = y
            }
        })

        /* 移动鼠标 */
        canvas.addEventListener('touchmove',function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            var newPoint = {'x':x,'y':y}
            if(pressMouse){
                if(penEnable){
                    ctx.clearRect(x-10,y-10,20,20)
                }else{
                    circle(newPoint.x,newPoint.y)
                    line(oldPoint.x,oldPoint.y,newPoint.x,newPoint.y)
                    oldPoint = newPoint
                }
            }
        })

        /* 松开鼠标 */
        canvas.addEventListener('touchend',function (e) {
            pressMouse = false
        })
    }else{
        canvas.addEventListener('mousedown',function (e) {
            pressMouse = true
            var x = e.clientX
            var y = e.clientY
            if(penEnable){
                ctx.clearRect(x,y,10,10)
            }else{
                circle(x,y)
                oldPoint.x = x
                oldPoint.y = y
            }
        })

        /* 移动鼠标 */
        canvas.addEventListener('mousemove',function (e) {
            var x = e.clientX
            var y = e.clientY
            var newPoint = {'x':x,'y':y}
            if(pressMouse){
                if(penEnable){
                    ctx.clearRect(x-10,y-10,20,20)
                }else{
                    circle(newPoint.x,newPoint.y)
                    line(oldPoint.x,oldPoint.y,newPoint.x,newPoint.y)
                    oldPoint = newPoint
                }
            }
        })

        /* 松开鼠标 */
        canvas.addEventListener('mouseup',function (e) {
            pressMouse = false
        })
    }
}

wrapper.addEventListener('click',function(e) {
    console.log(e)
    if (e.target.id === 'pen') {
        penEnable = false
        pen.classList.add('active')
        eraser.classList.remove('active')
    } else if (e.target.id === 'eraser') {
        penEnable = true
        eraser.classList.add('active')
        pen.classList.remove('active')
    } else if(e.target.id === 'clear'){
        clearDrawWrapper.style.display = 'block'
    }else if(e.target.id === 'download'){
        var url = canvas.toDataURL('image/png')
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = '我的画儿'
        a.target = '_blank'
        a.click()
    }
})
clearDrawWrapper.addEventListener('click',function(e){
    if(e.target.id === 'correct'){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        clearDrawWrapper.style.display = 'none'
    }else if(e.target.id === 'error'){
        clearDrawWrapper.style.display = 'none'
    }
})
input.addEventListener("change", function watchColorPicker(event) {
    ctx.fillStyle = event.target.value;
    ctx.strokeStyle = event.target.value;
}, false);

function circle(x,y){
    ctx.beginPath()
    ctx.arc(x,y,2.5,0,Math.PI * 2)
    ctx.fill()
}
function line(oldPointX,oldPointY,newPointX,newPointY){
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.moveTo(oldPointX,oldPointY)
    ctx.lineTo(newPointX,newPointY)
    ctx.stroke()
    ctx.closePath()
}