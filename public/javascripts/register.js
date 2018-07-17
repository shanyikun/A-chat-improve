$('#form').bind('submit',function(event){       //异步提交注册页面，注册成功即登录
    var dataForm=$(this).serialize()
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/register',
        data: dataForm,
        success: function(data){
            if(data.err_code==500){
                $('#inform').text(data.message)
            }
            else if(data.err_code==1){
                $('#inform').text(data.message)
            }
            else{
                window.location.href='/chat'
            }
        }
    })
    event.preventDefault()
})