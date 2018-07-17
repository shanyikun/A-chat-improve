$('#form1').bind('submit',function(event) {
    var dataForm = $(this).serialize()
    console.log(dataForm)
    event.preventDefault()
})