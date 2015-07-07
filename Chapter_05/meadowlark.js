var express = require('express');
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main'});

// 注意 "./", 這個表示告訴我們不要尋找 "node_modules" 目錄之中的模組, 如果我們忽略這個符號則會發生錯誤
var text = require('./lib/text.js');

var app = express();

// app.engine('handlebars', handlebars.engine);
app.engine('handlebars', handlebars.engine);

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'handlebars');

// static 中介軟體的效果就是, 為每一個要傳送的靜態檔案建立路由, 這個靜態檔案可以轉譯檔案並將它回傳給用戶端。
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
  res.locals.showTests = app.get('env') !== 'producetion' && req.query.test === '1';
  next();
});

// set routes
app.get('/', function (req, res) {
  // res.type('text/plain');  // 內容類型的狀態碼
  // res.send('Home page');
  res.render('home');
});

app.get('/about', function (req, res) {
  // res.type('text/plain');
  // res.send('About me');
  var random_text = text.getText();
  res.render('about', {
    text: random_text,
    pageTestScript: 'qa/tests-about.js'
  });
});

app.use(function (req, res) {
  // res.type('text/plain');
  // res.send('404 - Not Found.');
  res.status('404');
  res.render('404');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  // res.type('text/plain');
  // res.send('500 - Server Error');
  res.status('500');
  res.render('500');
});

/*
 * 注意, 改成使用handlebar 的時候就不需要指定內容類型或狀態碼了,
 * 在預設的情況下, view 引擎會回傳 text/html 的內容類型以及"200"的狀態碼
 * (在全部抓取處理程式中, 會提供自訂的 "404 網頁"及 "500處理程式", 我們必須明確地設定狀態碼)
 */

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhotst:' + app.get('port') + '; press Ctrl-C to terminate.');
});