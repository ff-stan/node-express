const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')

const app = express()

// 配置Handlebars视图引擎
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

// 设置路由
app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    res.render('about',{ fortune: fortune.getFortune() })
})

// 定制404页
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

// 定制500页
app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port};` +
    `press Ctrl-C to terminate.`))