const Busboy = require('busboy')
const fs = require('fs')
exports.api = {}

exports.home = (req, res) => res.render('home')

// exports.about =  (req, res) => 
//     res.render('about',{ fortune: fortune.getFortune() })
/*文件上传 */
/* eslint-disable no-unused-vars*/
exports.uploadtest = (req,res) => res.render('upload-test')
exports.upload = (req,res) => {
    //通过请求头信息创建busboy对象
    let busboy = Busboy({ headers: req.headers })
    //将流链接到busboy对象
    req.pipe(busboy)
    //监听file事件获取文件(字段名，文件，文件名，传输编码，mime类型)
    busboy.on('file', (filedname,file,filename,encoding,mimetype) => {
        //创建一个可写流
        let writeStream = fs.createWriteStream('./public/upload/' + filename.filename)
        //监听data事件，文件数据接受完毕，关闭这个可写域
        file.on('data', (data) => writeStream.write(data))
        // 监听end事件，文件数据接收完毕，关闭这个可写流
        file.on('end',(data) => writeStream.end())
        // 监听finish完成事件，完成后定向到首页
        busboy.on('finish', () => {
            res.writeHead(303, { Connection: 'close', Location: '/'})
            res.end()
        })
    })
}
/* eslint-disable no-unused-vars*/
//新增邮件订阅页，表单处理和感谢订阅页路由函数
exports.newsletterSignup = (req,res) => {
    res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}
exports.newsletterSignupProcess = (req,res) => {
    console.log('CSRF token (from hidden form field):' + req.body._csrf)
    console.log('Name (form visible form field): ' + req.body.name)
    console.log('Email (form visible form field): ' + req.body.email)
    res.redirect(303, '/newsletter-signup/thank-you')
}
exports.newsletterSignupThankYou = (req,res) => res.render('newsletter-signup-thank-you')
exports.newsletter = (req,res) => res.render('newsletter', { csrf: 'CSRF token goes here' })
exports.api.newsletterSignup = (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.send({ result: 'success' })
  }

// 图片上传页面与api接口路由函数
exports.vacationPhoto = (req,res) => res.render('contest/vacation-photo')

exports.sections = (req, res) => res.render('section-test')

exports.notFound = (req, res) => res.render('404')

// Express根据4个参数来认出它是一个错误处理函数
// 因此我们要禁用ESLint的no-unused-vars规则
/* eslint-disable no-unused-vars*/
exports.serverError = (err, req, res) => res.render('500')
/* eslint-disable no-unused-vars*/
