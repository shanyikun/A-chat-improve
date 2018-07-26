var express=require('express')
var router=express.Router()
var fs=require('fs')
var message=require('./messages.js')
var users=require('./user.js')


router.get('/chat',function(request, response){    //获取chat页面路由
   return  response.render('chat.html',{    //为客户端二次渲染做准备
       template1:'{{each contents}}',
       template2:'{{if $value.name==condition}}',
       template3:'{{$value.name}}',
       template4:'{{$value.message}}',
       template5:'{{else}}',
       template6:'{{$value.name}}',
       template7:'{{$value.message}}',
       template8:'{{/if}}',
       template9:'{{/each}}',
       user: request.session.user
   })
})

router.post('/send',function(request, response){    //主动发送消息路由
    if(request.session.user){              //加入session验证
        new message(request.body).save(function(err,data){
            if(err){
                return    response.json({
                    err_code: 500,
                    message: 'server error'
                })
            }
            message.find(function(err,data){
                if(err){
                    return      response.json({
                        err_code: 500,
                        message: 'server error'
                    })
                }
                else{
                    return    response.json({
                        err_code: 0,
                        message: data
                    })
                }
            })
        })
    }
    else{      //如果session不存在则重新登陆
        return response.json({
            err_code: 1,
            message:'please login again'
        })
    }
})



router.get('/send',function(request, response){      //轮询路由
    if(request.session.user){      //轮询验证session，不存在则客户端重定向
        message.find(function (err, data) {
            if (err) {
                return response.json({
                    err_code: 500,
                    message: 'server error'
                })
            }
            else {
                return response.json({
                    err_code: 0,
                    message: data
                })
            }
        })
    }
    else{
        return response.json({
            err_code: 1,        //不存在则客户端重定向
            message: 'please login again'
        })
    }
})


router.get('/',function(request,response){       //获取登录页面路由
    response.render('login.html')
})

router.get('/register',function(request,response){     //获取注册页面路由
    response.render('register.html')
})

router.post('/register',function(request,response){      //提交注册页面路由
    users.findOne({
        $or: [
            {
                name: request.body.name
            },
            {
                email: request.body.email
            }
        ]
    },function(err,data){
        if(err){
    return        response.json({
                err_code: 500,
                message: 'server error'
            })
        }
        else if(data){
    return       response.json({
                err_code: 1,
                message: 'email or name already exists'
            })
        }
        else{
            new users(request.body).save(function(err,data){
                if(err){
    return        response.json({
                        err_code: 500,
                        message: 'server error'
                    })
                }
                else{
                  request.session.user=data
    return        response.json({
                        err_code: 0,
                        message: 'register success!'
                    })
                }
            })
        }
    })
})


router.post('/login',function(request,response){       //提交登录页面路由
    users.findOne({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    },function(err,data){
        if(err){
            return response.json({
                err_code: 500,
                message: 'server error'
            })
        }
        else if(!data){
            return response.json({
                err_code: 1,
                message: 'name or email not exists'
            })
        }
        else{
            request.session.user=data
            return response.json({
                err_code: 0,
                message: 'login success!'
            })
        }
    })
})


router.get('/logout',function(request,response){       //退出页面路由
    delete request.session.user
    response.json({
        err_code:0,
        message: 'logout success'
    })
})


module.exports=router               //导出路由