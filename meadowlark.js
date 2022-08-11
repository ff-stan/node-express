const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const handlers = require('./lib/handlers')
const weatherMiddlware = require('./lib/middleware/weather')
const { credentials } = require('./config')

const app = express()
// 禁用响应头附带服务器信息
app.disable('x-powered-by')

// 配置Handlebars视图引擎
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }
    }
}))
app.set('view engine', 'handlebars')

// 启用天气中间件
app.use(weatherMiddlware)

// 启用cookieParser
app.use(cookieParser(credentials.cookieSecret))

// 要确保在链入Session中间件之前链入了Cookie中间件
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}))

// 启用解析(以URL编码的)请求的body的中间件
app.use(bodyParser.urlencoded({ extended: true }))
// 启用解析json格式的中间件
app.use(bodyParser.json())

// Express会自动识别以下两个参数
// 所以这里需要禁用no-undef规则
/* eslint-disable no-undef */
// 设置静态文件路径
app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000
/* eslint-disable no-undef */


// 设置路由
app.get('/', handlers.home)

// app.get('/about',handlers.about)

// 测试文件上传
app.get('/fileupload-test',handlers.uploadtest)
app.post('/api/fileupload',handlers.upload)

//测试sections辅助函数 
app.get('/sections',handlers.sections)

//新增邮件订阅页，表单处理和感谢订阅页路由
app.get('/newsletter',handlers.newsletter)
app.get('/newsletter-signup',handlers.newsletterSignup)
app.post('/api/newsletter-signup',handlers.api.newsletterSignup)
app.post('/newsletter-signup/process',handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you',handlers.newsletterSignupThankYou)

//图片上传页面
app.get('/vacation-photo',handlers.vacationPhoto)

// 定制500页
app.use(handlers.serverError)

// 定制404页
app.use(handlers.notFound)

if(require.main === module){
    app.listen(port, () => console.log(
        `Express started on http://localhost:${port};` +
        `press Ctrl-C to terminate.`))
}else{
    module.exports = app
}
