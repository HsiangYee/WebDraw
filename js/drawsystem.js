$(function(){
    var image = document.getElementById('image'); //將canvas id存入image變數
    var image2 = $('#image');
    var cc = image.getContext("2d"); //設定空間
    var img = new Image();
    var fr = new FileReader();
    
    //設定背景為白色
    cc.fillStyle = "#fff";
    cc.fillRect(0,0,1199,900);
    cc.stroke();

    //清除時將canvas塗上背景顏色
    $('#del').click(function(){
        cc.fillStyle = "#fff";
        cc.fillRect(0,0,1199,900);
        cc.stroke();
    });

    //當桿槓被改變時
    $('#color input').change(function(){ //id為color 中的input  被change(改變)時
        //取得桿槓的值 並存入變數
        r = $('#r').val();
        g = $('#g').val();
        b = $('#b').val();
        changeColor(r,g,b); //觸發function
    });

    //function changrColor
    function changeColor(r,g,b){
        //將顏色存入陣列
        colors = {
            r : r,
            g : g,
            b : b
        }
        //loop陣列
        $.each(colors, function(color, value) {
            //更改 text 中的值
            $('#v' + color).val(value);
        });
        //改變canvas線段顏色
        cc.strokeStyle = "rgb("+r+","+g+","+b+")";
        $('#color2').css("background","rgb("+r+","+g+","+b+")");
        $('#swidth').css("background","rgb("+r+","+g+","+b+")");
            
    };

    //改變線寬
    $('#width').change(function(){
        width = $('#width').val();
        cc.lineWidth = width;
        $('#swidth').css("height",width);
    })

    //滑鼠按下時
    var drawMode = false;
    var status = true;
    $('#image').mousedown(function(e) {
        if(status){
            cc.beginPath();
            cc.moveTo(e.pageX - image2.position().left, e.pageY - image2.position().top);
            drawMode = true;
        }else{
            cc.drawImage(K, e.pageX - image2.position().left, e.pageY - image2.position().top);
            status = true;
        }
    })

    //滑鼠移動時
    .mousemove(function(e){
        if(drawMode){
            cc.lineTo(e.pageX - image2.position().left, e.pageY - image2.position().top);
            cc.stroke();
        }
    })

    //滑鼠離開時
    .mouseup(function(e){
        drawMode = false;
    })

    //匯入圖片
    $('#img-upload').click(function(e){
        if($('#img-file').val() == ""){
            alert('請選擇檔案!');
        }else{
            var file = $('#img-file')[0].files[0];
            fr.readAsDataURL(file);
            localStorage.filename = file.name
            localStorage.mimeType = file.type

            fr.onload = function(){
                img.src = this.result;
            }
            img.onload = function(){
                cc.drawImage(this, 10, 10);
            }
            //$('#img-file').val('');
        }
    })

    //下載圖片
    $('#img-download').click(function(e){
        var imgUrl = image.toDataURL(localStorage.mimeType);
        $('#download-icon').html(
            "<a href='" + imgUrl +"' download='"+localStorage.filename+"'>下載連結</a>"
        )
    })
                
    $('#grap img').click(function(e){
        N = $(this).attr("id");
        K = document.getElementById(N);
        status = false;
    })
})