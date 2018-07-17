$('#form').bind('submit',function(event){      //异步提交登录页面
    var dataForm=$(this).serialize()
    $.ajax({
        type: 'POST',
        data: dataForm,
        url: '/login',
        dataType: 'json',
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