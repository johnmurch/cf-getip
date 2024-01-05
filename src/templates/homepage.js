const homepage = (req) => {

	const { query } = req
  const q = (query.q) ? (query.q) : ""

  const html = `
  <!DOCTYPE html>
  <html lang="en" class="h-feed hfeed translated-ltr">
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Keyword Suggest</title>
      <meta name="description" content="Keyword Suggest">
      <style>
        body {
          max-width: 100%;
          margin: 0 auto;
          padding: 0;
          background-color:rgb(255, 252, 249);
          line-height: 1.5em;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, sans-serif;
        }
        img {
          max-width: 100%;
          max-height: 10em;
          border-radius: 0.5em;
          height: auto;
        }
        video {
          max-width: 40em;
          max-height: 32em;
          height: auto;
          max-height: 30em;
        }
        .embed-video {
          aspect-ratio: 16 / 9;
          width: 100%;
          max-width: 40em;
        }
        a:link {
          color: rgb(0, 102, 204);
        }
        a:hover {
          text-decoration: underline;
          color: rgb(0, 102, 204);
        }
        .header{
          padding-top: 0.5em;
        }
        .footer{
          margin-bottom: 2em;
          padding-left: 1em;
          padding-right: 1em;
          padding-top: 2em;
        }
        .container{
          display: flex;
          text-align: left;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .card-inner{
          padding: 0.5em;
        }
        .card img{
          margin: auto;
          display: block;      
        }
        .card{
          flex: 1 1 15.625em;
          margin: 0.2em;
          border-radius: 0.5em;
          background-color: #fff;
          box-shadow: 0 -0.5px 0.5px rgba(135, 116, 87,0.1),0 -0.5px 0.5px rgba(135, 116, 87,0.1),0 2px 1px rgba(135, 116, 87,0.1),0 10px 15px -5px rgba(135, 116, 87,0.1),0 2px 3px rgba(135, 116, 87,0.1);
          border: 0;
        }
        .article {
          border-radius: 0.5em;
          padding: 5px 1em;
        }
        .article footer{
          margin-top: 0;
        }
  
        .pre-line {
          white-space: pre-line;
        }
        .small{
          font-size: 0.9375em;
        }
        .xsmall{
          font-size: 0.875em;
        }
        .muted {
          color: #828282;
        }
        a.muted:link,a.muted:visited {
          color: #828282;
          text-decoration: none;
        }
  
        a.muted:hover{
          text-decoration: underline;
          color: rgb(0, 102, 204);
        }
        .secondary a:link,.secondary a:visited {
          color: #828282;
        }
        .secondary a:hover{
          color: rgb(0, 102, 204);
        }
        .italic{
          font-style: italic;
        }
        .contrast a:link,
        .contrast a:visited {
          color: initial;
        }
        .contrast a:hover {
          color: rgb(0, 102, 204);
        }
        a.contrast:link ,
        a.contrast:visited  {
          color: initial;
        }
        a.contrast:hover {
          color: rgb(0, 102, 204);
        }
        a.no-underline {
          text-decoration: none;
        }
        a.no-underline:hover {
          text-decoration: underline;
          color: rgb(0, 102, 204);
        }
        .no-underline > a{
          text-decoration: none;
        }
        .no-underline > a:hover{
          text-decoration: underline;
          color: rgb(0, 102, 204);
        }
        .details,
        .less,
        .more:target {
          display: none;
        }
        .more:target ~ .details {
          display: block;
        }
        .more:target ~ .less {
          display: inline;
        }
  
        .about-content,
        .less-about,
        .about:target {
          display: none;
        }
        .about:target ~ .about-content {
          display: block;
        }
        .about:target ~ .less-about {
          display: inline;
        }
        .bold {
          font-weight: 500;
        }
        .mb {
          margin-bottom: 4px;
        }
        .px {
          padding-left: 1em;
          padding-right: 1em;
        }
        .border-bottom {
          height: 1px;
          border-bottom: 1px dashed #d4d4d4;
  
        }
        .w-50 {
          width: 50%;
        }
        .break-word{
          word-break: break-word;
        }
        .fixed{
          position: fixed;
          bottom: 2em;
          right: 0.5em;  
          font-weight: bold;
          z-index:1;
        }
        .text-center{
          text-align: center;
        }
        .inline-block{
          display: block;
        }
        .nsfw{
          color: #d10023;
          font-size:small;
        }
        .mt0{
          margin-top: 0;
        }
        .px-xs{
          padding-left: 0.5em;
          padding-right: 0.5em;
        }
        @media print{    
          .fixed{
              display: none;
          }
          header{
              display: none;
          }
          .footer{
              display: none;
          }
  
        }
        input[type='text']{
          float:left:
          width:500px;
          border:1px solid #ccc;
          border-radius:5px;
          height:20px;
          outline: 0;
          padding: 0 10px;
        }      
        #download{
          width:100%;
          display:block;
          margin-top:10px;
          margin-bottom:10px;
        }   
        #btndownload{
          text-align:center
          width:200px;
        }
      </style>
    <body>
      <div id="top"></div>
      <header class="header px">
        <h1>Keyword Suggest</h1>
        <input type="search" onkeyup="DelayedSubmission()" id="q" name="q">
      </header>
      <div id="main" class="container px-xs">
      <article class="card article">
        <div class="card-inner">
          <div class="mb mt0 break-word">
            <h4 class=""><span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Hello!</font></span>
          </div>            
          <div class="p-summary"><font style="vertical-align: inherit;"> 
            Enter a keyword above and let us generate some keywords
          </font></div>
        </div>
      </article>
      <script>
      function renderGroup(group){
        let template = '<article class="card article"><div class="card-inner"><div class="mb mt0 break-word"><h4><span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'
        template+=group.name
        template+='</font></span></div><div class="p-summary"><font style="vertical-align: inherit;"><ul>'
        for(var i=0;i<group.list.length;i++){
          let item = group.list[i];
          template+='<li>'+item+'</li>'
        }
        template+='</ul></font></div></div></article>'
        return template
      }

      function DelayedSubmission() {
        var date = new Date();
        initial_time = date.getTime();
        if (typeof setInverval_Variable == 'undefined') {
                setInverval_Variable = setInterval(DelayedSubmission_Check, 50);
        } 
      }
      function DelayedSubmission_Check() {
        let q = document.getElementById('q').value
        let main = document.getElementById('main')
        var date = new Date();
          check_time = date.getTime();
          var limit_ms=check_time-initial_time;
          if (limit_ms > 800) { //Change value in milliseconds
            console.log('q', q)
              //clear boxes - make fetch and update
              main.innerHTML = "Loading..."
              fetch('/google/search?q='+q).then(function (response) {
                return response.json();
              }).then(async function (data) {
                //console.log("data", data)
                let newHtml = ""
                // newHtml += '<div id="download"><button id="btndownload">Download</button></div>'
                for await(key of Object.keys(data)){ 
                  if(!["size","queries", "related"].includes(key)){
                    for await(list of Object.keys(data[key])){
                      let d = {
                        name: key+" "+list,
                        list: data[key][list]
                      }
                      newHtml+=renderGroup(d)
                    }
                  }
                }
                let related = {
                  name: "Related",
                  list: data.related
                }
                newHtml+=renderGroup(related)
                let queries = {
                  name: "Queries ("+data.size+")",
                  list: data.queries
                }
                newHtml+=renderGroup(queries)
                main.innerHTML = newHtml              
                // let btnDownload = document.getElementById('btndownload')
                // btnDownload.addEventListener("click", function() {
                //   console.log("DOWNLOAD!")
                // })
              }).catch(function (err) {
                // There was an error
                console.warn('Something went wrong.', err);
              });

              clearInterval(setInverval_Variable);
              delete setInverval_Variable;
          }
      }
      </script>
      </div>
      </body>
      </html>
      `;

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=utf-8',
    },
  });
}

export default homepage