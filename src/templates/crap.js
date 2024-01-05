const crap = (req) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Crapper</title>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
  
        #app {
          text-align: center;
          padding-top: 20px;
        }
  
        #results {
          list-style-type: none;
          padding: 0;
        }
        input{
          font-family: Arial, sans-serif; /* Use a nice font */
          font-size: 14px; /* Set font size */
      
          border: 1px solid #ccc; /* Add a border */
          border-radius: 4px; /* Round the corners */
      
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Inner shadow for a subtle depth */
          background-color: #fff; /* Set a background color */
      
          resize: vertical; /* Allow the user to resize vertically */
          outline: none;    /* Remove the focus outline */
        }
        textarea {
          width: 100%;     /* Full width */
          height: 50px;   /* Set a fixed height */
          padding: 10px;   /* Add some padding inside the textarea */
      
          font-family: Arial, sans-serif; /* Use a nice font */
          font-size: 14px; /* Set font size */
      
          border: 1px solid #ccc; /* Add a border */
          border-radius: 4px; /* Round the corners */
      
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Inner shadow for a subtle depth */
          background-color: #fff; /* Set a background color */
      
          resize: vertical; /* Allow the user to resize vertically */
          outline: none;    /* Remove the focus outline */
      }
      
      textarea:focus {
          border-color: #4d90fe; /* Change border color when focused */
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15), 0 0 8px rgba(77, 144, 254, 0.6); /* Enhanced shadow on focus */
      }
      </style>
    </head>
    <body>
      <div id="app" style="margin:auto;text-align:center;">
        <label>Seed Term</label>
        <input type="text" id="keyword" />    
        <button id="startButton">Start</button>
        <button id="pauseButton">Pause</button>
        <div id="status">Status: Idle</div>
        <p><label>Fetching: </label><input type="text" style="min-width:500px;" id="currKeyword"></p>
        <div style="width:500px;margin:auto;text-align:center;">
        <p>Total Requests:<span id="totalrequests">0</span></p>
        <p>Total keywords:<span id="totalkeywords">0</span></p>
        <p><label>Positive</label><br><textarea id="positive" rows=10></textarea></p>
        <p><label>Negative</label><br><textarea id="negative" rows=10></textarea></p>
        </div>
        <br>        
        <div style="width:800px;margin:auto;text-align:center;clear:both">
          <div style="float:left"><label>QUE Keywords (<span id="quelength">0</span>)</label><br><textarea id="quedump" style="min-width:350px;min-height:400px;" rows="100"></textarea></div>
          <div style="float:right"><label>Keywords (Total: <span id="keywordlength">0</span>) (Filter: <span id="filterlength">0</span>)</label><br><textarea id="allKeywords" style="min-width:350px;min-height:400px;" wrap="hard" rows="100"></textarea></div>
        </div>
        <ul id="results"></ul>
      </div>
  
      <script>
        const startButton = document.getElementById("startButton");
        const pauseButton = document.getElementById("pauseButton");
        const statusDiv = document.getElementById("status");
        const resultsList = document.getElementById("results");
  
        let isPaused = false;
        let currentResultIndex = 0;
        let currentKeywordIndex = 0;
        let que = [];
        let uniqKeywords = [];
        let allKeywords = [];
  
        const getUniqueKeywords = (uniqKeywords, que) => [...new Set([...uniqKeywords, ...que])].sort();
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

        const fetchKeywords = async (keyword) => {
          try {
            const url ="/google/alphabetical?q=" +
              encodeURIComponent(keyword);
            console.log("keyword", keyword, "url", url);
  
            const response = await fetch(url); // proxyUrl + targetUrl);
            const json = await response.json();
            if(json){
              que = json.query;
              console.log("json", json.query);
              document.getElementById("quelength").textContent = json.query.length
              document.getElementById("quedump").innerHTML =json.query.join("\\n")
              uniqKeywords = getUniqueKeywords(uniqKeywords, json.query);
              allKeywords = uniqKeywords
              document.getElementById("keywordlength").textContent = allKeywords.length
              handleInput()
              // document.getElementById("allKeywords").value = uniqKeywords.join("\\n")
              document.getElementById("currKeyword").value = json.query[0].trim()
              document.getElementById("totalkeywords").textContent = uniqKeywords.length
              document.getElementById("totalrequests").textContent = 1
              iterateKeywords();  
            }
          } catch (error) {
            console.error("Error fetching keywords:", error);
          }
        };
  
        const fetchKeywordData = async (keyword, retryCount = 0) => {
          try {
            console.log("FETCH", keyword)
            document.getElementById("currKeyword").value = keyword.trim()
            const url = "google/alphabetical?q=" +
              encodeURIComponent(keyword)  
            const response = await fetch(url); // proxyUrl + targetUrl);
            const data = await response.json();
            uniqKeywords = getUniqueKeywords(uniqKeywords, data.query);
            allKeywords = uniqKeywords
            // check filters!
            handleInput()
            // document.getElementById("allKeywords").value = uniqKeywords.join("\\n")

            document.getElementById("totalkeywords").textContent = uniqKeywords.length
            document.getElementById("totalrequests").textContent = 1 + parseInt(document.getElementById("totalrequests").textContent)
            // data.query.forEach((q) => displayKeyword(q));
            // resultsList.append(document.createElement('hr'))
            if(que.length<=0){
              document.getElementById("quelength").textContent = que.length
              document.getElementById("quedump").innerHTML = que.join("\\n")
              document.getElementById("keywordlength").textContent = allKeywords.length
            }else{
              que.shift()
              document.getElementById("quelength").textContent = que.length              
              document.getElementById("quedump").innerHTML = que.join("\\n")
              document.getElementById("keywordlength").textContent = allKeywords.length
              await delay(2000); // Pause for 2000 ms  
            }
          } catch (error) {
            console.error("Error fetching data for keyword " + keyword + " " + error);
            await delay(10000)
            if (retryCount < 3) { // Set a maximum number of retries
              const nextRetryCount = retryCount + 1;
              const backoffTime = nextRetryCount * 5000; // Increment delay by 5000 ms
              console.log("Retrying in " + backoffTime + "ms...");
              await delay(backoffTime);
              return fetchKeywordData(keyword, nextRetryCount);
            } else {
              console.error("Failed to fetch data for keyword " + keyword + " after " + retryCount + " retries.");
            }
          }
        };
  
        const iterateKeywords = async () => {
          for (; currentResultIndex < que.length; currentResultIndex++) {
            for (
              ;
              currentKeywordIndex < que[currentResultIndex].length;
              currentKeywordIndex++
            ) {
              if (isPaused) return;
              await fetchKeywordData(que[currentResultIndex]);
            }
            currentKeywordIndex = 0; // Reset keyword index for next result
          }
        };
  
        const displayKeyword = (keyword) => {
          const listItem = document.createElement("li");
          listItem.textContent = keyword;
          resultsList.appendChild(listItem);
        };
  
        startButton.addEventListener("click", () => {
          isPaused = false;
          statusDiv.textContent = "Status: Running";
          if (currentResultIndex === 0 && currentKeywordIndex === 0)
            fetchKeywords(document.getElementById("keyword").value);
          else iterateKeywords();
        });
  
        pauseButton.addEventListener("click", () => {
          console.log("PAUSE CLICK", pauseButton.textContent)
          console.log('isPaused', isPaused)

          if(pauseButton.textContent=="Pause"){
            isPaused = true
            statusDiv.textContent = "Status: Paused";
            pauseButton.textContent = "Resume"  
          }else{
            isPaused = false
            statusDiv.textContent = "Status: Running";
            pauseButton.textContent = "Pause"  
            if(que.length>0){
              if (currentResultIndex === 0 && currentKeywordIndex === 0)
              fetchKeywords(document.getElementById("keyword").value);
              else iterateKeywords();  
            }
          }
        });

       

        //uniqueKeywords = ['mortgage rates', 'mortgage calculator', 'mortgage new york', 'mortgage new jersey', 'mortgage pa']; // Your initial keyword list
        //document.getElementById('allKeywords').value = uniqueKeywords.join('\\n');
        
       

        function debounce(func, delay = 300) {
          let timeout;
          return function(...args) {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                  func.apply(this, args);
              }, delay);
          };
        }
      
      function handleInput() {
          const positiveInput = document.getElementById('positive').value.trim().split('\\n').filter(Boolean);
          const negativeInput = document.getElementById('negative').value.trim().split('\\n').filter(Boolean);
      
          // Now you have arrays of positive and negative keywords
          // You can add logic here to process these keywords
          console.log('Positive Keywords:', positiveInput);
          console.log('Negative Keywords:', negativeInput);

          let filteredKeywords = allKeywords;

          if (positiveInput.length > 0) {
            filteredKeywords = filteredKeywords.filter(kw => 
                positiveInput.some(positive => kw.includes(positive))
            );
        }
      
          if (negativeInput.length > 0) {
              filteredKeywords = filteredKeywords.filter(kw => 
                  !negativeInput.some(negative => kw.includes(negative))
              );
          }
          
          if(positiveInput.length > 0 || negativeInput.length > 0){
            document.getElementById("filterlength").textContent = filteredKeywords.length
          } else{
            document.getElementById("filterlength").textContent = 0
          }
          
          document.getElementById('allKeywords').value = filteredKeywords.join('\\n');
          
      }
      
      const debouncedHandleInput = debounce(handleInput);
      
      document.getElementById('positive').addEventListener('input', debouncedHandleInput);
      document.getElementById('negative').addEventListener('input', debouncedHandleInput);

      </script>
    </body>
  </html>
  
      `;

  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=utf-8"
    }
  });
};

export default crap;
