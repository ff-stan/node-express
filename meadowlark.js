const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const handlers = require('./lib/handlers')
const weatherMiddlware = require('./lib/middleware/weather')

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

// 启用解析(以URL编码的)请求的body的中间件
app.use(bodyParser.urlencoded({ extended: true }))
// 启用解析json格式的中间件
app.use(bodyParser.json())

// Express会自动识别以下两个参数
// 所以这里需要禁用no-undef规则
/* eslint-disable no-undef */
app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000
/* eslint-disable no-undef */


// 设置路由
app.get('/', handlers.home)

// app.get('/about',handlers.about)

// 测试文件上传
app.get('/fileupload-test',handlers.uploadtest)
app.post('/fileupload',handlers.upload)

//测试sections辅助函数 
app.get('/sections',handlers.sections)

//新增邮件订阅页，表单处理和感谢订阅页路由
app.get('/newsletter',handlers.newsletter)
app.post('/api/newsletter-signup',handlers.api.newsletterSignup)
app.post('/newsletter-signup/process',handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you',handlers.newsletterSignupThankYou)

// 定制404页
app.use(handlers.notFound)

// 定制500页
app.use(handlers.serverError)

if(require.main === module){
    app.listen(port, () => console.log(
        `Express started on http://localhost:${port};` +
        `press Ctrl-C to terminate.`))
}else{
    module.exports = app
}
