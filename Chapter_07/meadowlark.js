var express = require('express'),
    app = express(),
    hb = require('express3-handlebars'),
    handlebars = hb.create({
      defaultLayout: 'main',
      helpers: {
        section: function(name, options){
          if(!this._sections) this._sections = {};
          this._sections[name] = options.fn(this);
          return null;
        }
      }
    }),
  getDate = function () {
    return {
      data: [
        { name: 'Terry1' },
        { name: 'Terry2' },
        { name: 'Terry3' },
        { name: 'Terry4' }
      ]
    }
  };


app.set('port', process.env.PORT || 3000);

// 設定 handlebar view 引擎
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine);

/* 
 * "static" 中介軟體的效果就是, 為每一個要傳送的靜態檔案建立路由, 這個靜態檔案可以轉譯檔案並將它回傳給用戶端。
 *
 * "__dirname" => 這個會被解析為正在值型的指令所在的目錄, 
 * 舉例: 假設你的指令碼位於 "/home/site/index.js", "__dirname" 就會被解析為 "/home/site"
 * 如果你在不同目錄執行的話, 將會造成難以尋找的錯誤
 */
app.use(express.static(__dirname + '/public'));

/* 
 * 如果test=1 出現在往頁的查詢字串(query string)中, 而且我們不是在 "producetion" 上面運行, 
 * "res.locals.showTests" 特性會被設定為true, 而res.locals 物件是要傳遞給view 的 context 的一部分
 */

app.use(function (req, res, next) {
  if (!res.locals.partials) {
    res.locals.partials = {};
  }
  res.locals.partials.db = getDate();
  next();
});

// set routes
app.get('/', function (req, res) {
  res.render('home'); // "home.handlebars" template
});

app.get('/members.api', function (req, res) {
  res.json({
    "name": "Terry",
    "age": "27",
    "gender": "male"
  });
});

app.get('/member', function (req, res) {
  res.render('member');
});

app.use(function (req, res) {
  res.status('404');
  res.render('404');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
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