const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')

const app = express()

// 配置Handlebars视图引擎
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

// Express会自动识别以下两个参数
// 所以这里需要禁用no-undef规则
/* eslint-disable no-undef */
app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000
/* eslint-disable no-undef */


// 设置路由
app.get('/', handlers.home)

app.get('/about',handlers.about)

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
