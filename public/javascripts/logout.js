$('#logout').bind('click',function(event){
    $.ajax({    //异步退出无刷新，无法返回
        type: 'GET',
        dataType: 'html',
        data: null,
        url: '/logout',
        success: function(data){
            document.body.innerHTML=data
        }
    })
    event.preventDefault()
})