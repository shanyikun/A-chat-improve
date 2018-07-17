$('#form1').bind('submit',function(event){    //异步消息发送
    var dataForm=$(this).serialize()
    dataForm=dataForm+'&name='+$('#inform1').text()
    $.ajax({
        type: 'POST',
        url: '/send',
        data: dataForm,
        dataType: 'json',
        success: function(data){
            if(data.err_code==500){
                $('#inform').text(data.message)
            }
            else if(data.err_code==1){    //session验证，不存在则重定向刷新
                window.location.href='/chat'
            }
            else{
                var ret=template('shan',{
                    condition: $('#inform1').text(),
                    contents : data.message
                })
                $('#txt').html(ret)
            }
        }
    })
    $('#message').val('')
    event.preventDefault()
})


setInterval(request,1000)       //轮询

function request() {
    $.ajax({
        type: 'GET',
        url: '/send',
        data: null,
        dataType: 'json',
        success: function (data) {
            if (data.err_code == 500) {
                $('#inform').text(data.message)
            }
            else if(data.err_code==1){
                window.location.href='/chat'     //session验证，没有则重定向刷新
            }
            else {
                var ret = template('shan', {
                    condition:$('#inform1').text(),
                    contents: data.message
                })
                $('#txt').html(ret)
            }
        }
    })
}

