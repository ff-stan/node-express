const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

// 配置Handlebars视图引擎
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
]

// 设置路由
app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about',{ fortune: randomFortune })
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