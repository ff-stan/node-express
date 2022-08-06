const fortune = require('./fortune')

exports.home = (req, res) => res.render('home')

exports.about =  (req, res) => 
    res.render('about',{ fortune: fortune.getFortune() })

exports.sections = (req, res) => res.render('section-test')

exports.notFound = (req, res) => res.render('404')

// Express根据4个参数来认出它是一个错误处理函数
// 因此我们要禁用ESLint的no-unused-vars规则
/* eslint-disable no-unused-vars*/
exports.serverError = (err, req, res) => res.render('500')
/* eslint-disable no-unused-vars*/
