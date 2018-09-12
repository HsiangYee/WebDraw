var image = document.getElementById("canvas");
var space = image.getContext("2d");

//設定背景為白色
space.fillStyle = "#fff";
space.fillRect(0, 0, image.width, image.height);
space.stroke();

var draw = false;
image.addEventListener('mousedown', function(e){
    if(!draw){
        space.beginPath();
        space.moveTo(e.layerX, e.layerY);
        draw = true;
    }
})

image.addEventListener('mousemove', function(e){
    if(draw){
        space.lineTo(e.layerX, e.layerY);
        space.stroke();
    }
})

image.addEventListener('mouseup', function(e){
    if(draw){
        draw = false;
    }
})