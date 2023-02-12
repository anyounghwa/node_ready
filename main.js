var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log(_url);
    var queryData = url.parse(_url, true).query;
    console.log(queryData.id);
    var title = queryData.id;
    if(_url == '/'){
      title='Welcome';
    }
    if(_url == '/favicon.ico'){
      	response.writeHead(404);
	      response.end();
	return;
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`,'utf-8',function(err, description){
      var template = `
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
            <ol>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="?id=CSS">CSS</a></li>
              <li><a href="?id=JavaScript">JavaScript</a></li>
            </ol>
          </nav>
          <section>
            <h2>${title}</h2>
            <p>${description}</p>
          </section> 
          </div>
        <footer>
          <h2>capyright &copy; anyounghwa. All Rights Reserved.</h2>
        </footer>
      </body>
      </html>

      `
      response.end(template);
    })
});
app.listen(3000);