const fortune = require('./fortune')
exports.api = {}

exports.home = (req, res) => res.render('home')

exports.about =  (req, res) => 
    res.render('about',{ fortune: fortune.getFortune() })

exports.newsletterSignup = (req,res) => {
    res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}
exports.newsletterSignupProcess = (req,res) => {
    console.log('CSRF token (from hidden form field):' + req.body._csrf)
    console.log('Name (form visible form field): ' + req.body.name)
    console.log('Email (form visible form field): ' + req.body.email)
    res.redirect(303, '/newsletter-signup/thank-you')
}
exports.newsletterSignupThankYou = (req,res) => {
    res.render('newsletter-signup-thank-you')
}
exports.newsletter = (req,res) => {
    res.render('newsletter', { csrf: 'CSRF token goes here' })
}
exports.api.newsletterSignup = (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.send({ result: 'success' })
  }

exports.sections = (req, res) => res.render('section-test')

exports.notFound = (req, res) => res.render('404')

// Express根据4个参数来认出它是一个错误处理函数
// 因此我们要禁用ESLint的no-unused-vars规则
/* eslint-disable no-unused-vars*/
exports.serverError = (err, req, res) => res.render('500')
/* eslint-disable no-unused-vars*/
