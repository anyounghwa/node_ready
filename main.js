var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title,list, body) {
  return  `
  <!doctype html>
  <html>
  <head>
    <title>WEB - ${title}</title>
    <meta charset="utf-8">
    <style>
    * {
    margin: 0 auto;
    color: #333;
    }
    
    ol {
        padding: 0;
    }
    
    a {
        text-decoration: none;
        color: inherit;
    }
    
    header {
        width:1000px;
        height:100px;
        border-bottom: 1px solid #ccc;
    }
    
    header>h1 {
        line-height: 100px;
        margin-left: 10px;
    }
    
    .contents {
        width:1000px;
        min-height: 600px;
        padding-top: 20px;
    }
    
    nav {
        width: 200px;
        min-height: 600px;
        float: left;
        border-right: 1px solid #ccc;
        box-sizing: border-box;
        padding-left: 30px;
        line-height: 1.6em;
    }
    
    nav>ol>li>a {
        font-weight: bold;
        color:#666;
    }
    
    nav>ol>li>a:hover {
        color:brown;
        font-weight: bold;
    }
    
    nav>p {
      margin-top:100px;
      text-align:right;
      padding-right:20px;
      box-sizing:border-box;
    }
    nav>p>a {
      padding:5px;
      border-radius:5px;
      background-color:#125847;
      color:#fff;
    }
    section {
        width:800px;
        padding-left: 20px;
        padding-right: 20px;
        float: left;
        box-sizing: border-box;
        text-align: justify;
        line-height: 1.6em;
    }
    
    section>h2 {
        margin-bottom: 10px;
        color: #999;
    }

    section>p {
      color:#569871;
    }

    section>form>p>input {
      wid
    }
    .contents::after {
        content: "";
        display: block;
        clear: both;
    }
    
    footer {
      
        width:1000px;
        height: 50px;
        margin-top: 20px;
        border-top: 1px solid #ccc;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        /* background-color: #ccc; */
    }
    footer>h2 {
        font-size:1em;
        color: #999;
    }
    </style>
  </head>
  <body>
    <header>
      <h1><a href="/">WEB</a></h1>
    </header>
    <div class="contents">
      <nav>
        ${list}
        <p><a href="/create">글쓰기</a></p>
      </nav>
      <section>
        ${body}
      </section> 
      </div>
    <footer>
      <h2>capyright &copy; anyounghwa. All Rights Reserved.</h2>
    </footer>
  </body>
  </html>

  `
}
function templateList(filelist) {
    var list = '<ol>';
    var i = 0;
    while( i < filelist.length) {
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i++;
    }
    list = list + '</ol>';
    return list;
}


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname;

    
   if(pathname == '/') {
    if(queryData.id == undefined ) {
      fs.readdir('./data', function(error, filelist){
        var title = 'welcome';
        var description = '메인화면입니다^^ 반갑습니다^^';
        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`)
        response.writeHead(200);
        response.end(template);
     });       
    }
    else {
      fs.readdir('./data', function(error, filelist){
        fs.readFile(`data/${queryData.id}`,'utf-8',function(err, description){
          var title = queryData.id;
          var list = templateList(filelist)
          var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`)
          response.writeHead(200);
          response.end(template);
        });
      });
    }
    
   }
   else if(pathname == '/create') {
      fs.readdir('./data', function(error, filelist){
        var title = '좋아하는 노래를 추가해 보세요';
        var description = `
        <form action="http://localhost:3000/create_process" merhod="post">
          <p style="margin-top:10px; text-align:right;"><input type="submit" value="글쓰기"></p>
          <p style="margin-bottom:10px;">제목 : <input type="text" name="tite" size="80" placeholder="제목을 적으세요"></p>
          <p>내용 : <textarea name="description" rows="20" cols="82" placeholder="내용을 적으세요"></textarea></p>
          <p style="margin-top:10px; text-align:right;"><input type="submit" value="글쓰기"></p>
        </form>
        `;
        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`)
        response.writeHead(200);
        response.end(template);
      });   
   }
   else {
    response.writeHead(404);
    response.end('Not found');
   }
});
app.listen(3000);