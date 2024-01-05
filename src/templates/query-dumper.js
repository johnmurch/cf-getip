const queryDumper = (req) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Query Dumper</title>
      <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
      rel="stylesheet"/>
      <style>
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
    
    .blink {
        animation: blink 1s linear infinite;
    }</style>
    </head>
    <body>
    <div class="container py-4">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal">
  Instructions
</button>

    <!-- First Row -->
    <div class="row mb-3">
      <div class="col">
        <label for="keyword" id="keywordLabel" class="form-label">Enter Seed Term:</label>
        <div class="input-group">
          <input type="text" class="form-control" id="keyword" />
          <button id="btnstart" class="btn btn-primary start-button">
            Start
          </button>
          <button id="pauseButton" class="btn btn-dark start-button">Pause</button>
        </div>
      </div>
      <div id="status">Status: Idle</div>
      </div>

    <!-- Second Row -->
    <div class="row mb-3">
      <!-- Total Requests Card -->
      <div class="col-md-3 mb-3">
          <div class="card text-center">
              <div class="card-body">
                  <h5 class="card-title">Total Requests</h5>
                  <p class="card-text"><span id="totalRequests">0</span></p>
              </div>
          </div>
      </div>
  
      <!-- Total Keywords Card -->
      <div class="col-md-3 mb-3">
          <div class="card text-center">
              <div class="card-body">
                  <h5 class="card-title">Total Keywords</h5>
                  <p class="card-text"><span id="totalKeywords">0</span></p>
              </div>
          </div>
      </div>
  
      <!-- In Queue Card -->
      <div class="col-md-3 mb-3">
          <div class="card text-center">
              <div class="card-body">
                  <h5 class="card-title">In Queue</h5>
                  <p class="card-text"><span id="inQueue">0</span></p>
              </div>
          </div>
      </div>
  
      <!-- Elapsed Time Card -->
      <div class="col-md-3 mb-3">
          <div class="card text-center">
              <div class="card-body">
                  <h5 class="card-title">Elapsed Time</h5>
                  <p class="card-text"><span id="elapsedTime">00:00:00</span></p>
              </div>
          </div>
      </div>
  </div>

    <!-- Third Row -->
    <div class="row">
      <div class="col-3 mb-3">
          <div class="row">
              <div class="col-12">
                  <label for="fetchingInput" class="form-label">Fetching:</label>
                  <input type="text" class="form-control" id="fetching">
              </div>
          </div>
          <div class="row mt-3">
              <div class="col-12">
                <ul class="nav nav-tabs" id="queueTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="current-queue-tab" data-bs-toggle="tab" data-bs-target="#currentQueue" type="button" role="tab" aria-controls="currentQueue" aria-selected="true">Queue</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="fetched-history-tab" data-bs-toggle="tab" data-bs-target="#fetchedHistory" type="button" role="tab" aria-controls="fetchedHistory" aria-selected="false">History</button>
                  </li>
                </ul>
                <div class="tab-content" id="queueTabContent">
                  <div class="tab-pane fade show active" id="currentQueue" role="tabpanel" aria-labelledby="current-queue-tab">
                    <!-- Current Queue Content -->
                    <div class="row mt-3">
                      <div class="col-12">
                        <!-- <label for="queueTextarea">Upcoming:</label> -->
                        <!-- <button id="sortQueue" class="btn btn-secondary btn-sm mb-2 float-end">Sort</button> -->
                        <textarea class="form-control" id="queueTextarea" rows="22"></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="fetchedHistory" role="tabpanel" aria-labelledby="fetched-history-tab">
                    <!-- Fetched History Content -->
                    <div class="row mt-3">
                      <div class="col-12">
                        <!-- <label for="historyTextarea">Past:</label> -->
                        <textarea class="form-control" id="historyTextarea" rows="22" readonly></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
      <div class="col-6 mb-3">
        <label for="allKeywordsTextarea">All Keywords:</label>
        <button id="sortAllKeywords" class="btn btn-secondary btn-sm mb-2 float-end">Sort</button>
        <textarea
          class="form-control"
          id="allKeywordsTextarea"
          rows="27"
        ></textarea>
      </div>
      <div class="col-3 mb-3">
          <div class="row">
          <div class="col-6">
              <label for="positiveTextarea">Positive:</label>
              <textarea
                  class="form-control mb-3"
                  id="positive"
                  rows="2"
              ></textarea>
          </div>
          <div class="col-6">
        <label for="negativeTextarea">Negative:</label>
        <textarea
          class="form-control mb-3"
          id="negative"
          rows="2"
        ></textarea>
      </div>
      <div class="col-12">
        <label for="filterKeywords">Filtered Keywords: (<span id="filterCount">0</span>)</label>
        <textarea
          class="form-control"
          id="filterKeywords"
          rows="23"
        ></textarea>
      </div>
    </div>
  </div>
  <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h5 class="modal-title" id="productModalLabel">Keyword Generation Tool Overview</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <div class="row">

          <!-- Image Display Section -->
          <div class="col-md-6">
            <!-- Replace 'path-to-your-image.png' with your image file path -->
            <img src="path-to-your-image.png" alt="Keyword Generation Tool Interface" class="img-fluid">
          </div>

          <!-- Description Section -->
          <div class="col-md-6">
            <h3>Interactive SEO Assistant</h3>
            <p>
              <strong>Seed Term Entry:</strong> Begin by entering a term related to your content goals.
            </p>
            <p>
              <strong>Real-Time Analytics:</strong> Monitor the total requests, total keywords generated, and items in the queue.
            </p>
            <p>
              <strong>Keyword Sorting and Filtering:</strong> Organize keywords according to relevance and filter them based on custom positive or negative markers.
            </p>
            <p>
              <strong>Historical Data:</strong> Access a log of previous searches to track progress and patterns over time.
            </p>
            <p>
              <strong>Efficient Workflow:</strong> With a user-friendly interface, streamline your keyword research process for SEO optimization.
            </p>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
  <!-- <script src="your-script.js"></script> -->
  <script>
//   const sleep = ms => new Promise(r => setTimeout(r, ms));

//   function formatTime(ms) {
//     let seconds = Math.floor(ms / 1000);
//     let minutes = Math.floor(seconds / 60);
//     let hours = Math.floor(minutes / 60);

//     seconds = seconds % 60;
//     minutes = minutes % 60;

//     // Pad with zeros for consistent display
//     hours = hours.toString().padStart(2, '0');
//     minutes = minutes.toString().padStart(2, '0');
//     seconds = seconds.toString().padStart(2, '0');

//     return hours+':'+minutes+':'+seconds;
// }

// function updateDisplay() {
//     const elapsedTime = Date.now() - startTime;
//     elapsedTimeSpan.textContent = formatTime(elapsedTime);
// }

// function triggerErrorBlink() {
//   var keywordLabel = document.getElementById('keywordLabel');
//   if (keywordLabel) {
//       keywordLabel.classList.add('blink');
//   }
// }

// function stopErrorBlink() {
//   var keywordLabel = document.getElementById('keywordLabel');
//   if (keywordLabel) {
//       keywordLabel.classList.remove('blink');
//   }
// }

// function appendToTextarea(id, newText) {
//   var textarea = document.getElementById(id);
//   if (textarea) {
//       textarea.value += newText + "\\n"; // Append the new text
//   }
// }

// function isEmptyArray(arr) {
//   // Check if every element in the array is an empty string
//   return arr.every(item => item === '');
// }

// // HTML Element References
// const startButton = document.getElementById("btnstart");
// const pauseButton = document.getElementById("pauseButton");
// const statusDiv = document.getElementById("status");
// const totalRequestsSpan = document.getElementById("totalRequests");
// const totalKeywordsSpan = document.getElementById("totalKeywords");
// const inQueueSpan = document.getElementById("inQueue");
// const elapsedTimeSpan = document.getElementById("elapsedTime");
// const fetchingSpan = document.getElementById("fetching");

// const queueTextarea = document.getElementById("queueTextarea");
// const historyTextarea = document.getElementById("historyTextarea");
// const allKeywordsTextarea = document.getElementById("allKeywordsTextarea");
// let startTime = null;
// let interval = null;
// let elapsedTimeDuringPause = 0;

// // Global Variables
// let isPaused = false;
// let currentKeywordIndex = 0;
// let queue = [];
// let uniqueKeywords = [];
// // let allKeywords = [];
// let totalRequests = 0;
// let currKeyword = ''

// // Functions
// const updateUI = () => {
//   totalRequests+=1;
//   totalRequestsSpan.textContent = totalRequests;
//   totalKeywordsSpan.textContent = allKeywordsTextarea.value.split("\\n").filter(item => item !== '').length
// };

// const fetchKeywords = async (keyword) => {
//   currKeyword = keyword
//   console.log("Fetching keywords for:", currKeyword);
//   const url ="/google/search?q=" + encodeURIComponent(currKeyword);
//   // const url ="/google/prepositions?q=" + encodeURIComponent(currKeyword);
//   statusDiv.textContent = "Status: Fetching";
//   appendToTextarea('allKeywordsTextarea',  currKeyword);
//   try {
//     const response = await fetch(url);
//     if (!response.ok) { // Checks if the response status is not 2xx
//       throw new Error('HTTP error! Status: '+ response.status);
//     }
//     const json = await response.json();
//     if (json) {
//       if(queue.length==0){
//         queue = json.queries // json.query; // or json.queries, based on your API response structure
//         queueTextarea.value = queue.join('\\n');
//         inQueueSpan.textContent = queue.length;      
//         totalKeywordsSpan.textContent = 1
//       }
//       uniqueKeywords = [...new Set(uniqueKeywords)]; // Remove duplicates if any
//       json.queries.forEach(keyword => {
//       //.query.forEach(keyword => {
//         if (!uniqueKeywords.includes(keyword)) {
//           uniqueKeywords.push(keyword); // Add only unique keywords
//           appendToTextarea('allKeywordsTextarea', keyword); // Append to textarea
//         }
//       });      
//       updateUI();

//     }
//     statusDiv.textContent = "Status: Waiting";
//     await sleep(5000)
//   } catch (error) {
//     console.error("Failed to fetch keywords:", error);
//     statusDiv.textContent = "Status: Error fetching data";
//   }
// };


// const iterateKeywords = async () => {
//   while (!isPaused && currentKeywordIndex < queue.length) {
//     const keyword = queue[currentKeywordIndex];
//     fetchingSpan.value = keyword
//     appendToTextarea('historyTextarea', keyword);

//     let curQue = document.getElementById("queueTextarea").value.split('\\n')
//     if(isEmptyArray(curQue)){
//       clearInterval(interval);
//       queue = []
//       statusDiv.textContent = "Status: Idle";
//       fetchingSpan.value = ""
//       queueTextarea.value = ""
//     }else{
//       curQue.shift()
//       queueTextarea.value = curQue.join('\\n');
//       inQueueSpan.textContent = curQue.length;      
//       await fetchKeywords(keyword);
//       currentKeywordIndex++;  
//     }
//   }
// };



// startButton.addEventListener("click", async () => {
//   let keyword = document.getElementById("keyword").value.trim()
//   // reset to zero!
//   totalRequestsSpan.textContent = 0
//   totalKeywordsSpan.textContent = 0
//   inQueueSpan.textContent = 0
//   queueTextarea.value = ""
//   fetchingSpan.value = ""
//   allKeywordsTextarea.value = ""
//   document.getElementById('filterKeywords').value = ""
//   document.getElementById('positive').value = ""
//   document.getElementById('negative').value =""

//   if ( keyword !== '') {
//     if (interval) {
//       isPaused = true;
//       clearInterval(interval); // Stop the current timer
//       interval = null;
//       elapsedTimeSpan.textContent = '00:00:00'; // Reset display
//       statusDiv.textContent = "Status: Idle";
//     } else {
//       isPaused = false;
//       statusDiv.textContent = "Status: Running";
//       startTime = Date.now();
//       interval = setInterval(updateDisplay, 1000); // Update every second
//       fetchingSpan.value = keyword
//       appendToTextarea('historyTextarea', keyword);
//       await fetchKeywords(keyword);
//       await iterateKeywords();
//     }
//   } else {
//     console.log("Please enter a seed term");
//     triggerErrorBlink();
//     setTimeout(stopErrorBlink, 3000);
//   }
// });

// document.getElementById("keyword").addEventListener("keydown", function(event) {
//   // Check if the key pressed is 'Enter'
//   if (event.key === "Enter") {
//       event.preventDefault();
//       startButton.click();
//   }
// });


// function debounce(func, delay = 300) {
//   let timeout;
//   return function(...args) {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => {
//           func.apply(this, args);
//       }, delay);
//   };
// }

// function handleInput() {
//   const positiveInput = document.getElementById('positive').value.trim().split('\\n').filter(Boolean);
//   const negativeInput = document.getElementById('negative').value.trim().split('\\n').filter(Boolean);

//   let filteredKeywords = document.getElementById("allKeywordsTextarea").value.split("\\n");
//   document.getElementById('totalKeywords').textContent = filteredKeywords.length;
//   console.log('filteredKeywords', filteredKeywords)

//   if (positiveInput.length > 0) {
//     filteredKeywords = filteredKeywords.filter(kw => 
//         positiveInput.some(positive => kw.includes(positive))
//     );
//   }

//   if (negativeInput.length > 0) {
//       filteredKeywords = filteredKeywords.filter(kw => 
//           !negativeInput.some(negative => kw.includes(negative))
//       );
//   }
//   document.getElementById('filterCount').textContent = filteredKeywords.length;
//   document.getElementById('filterKeywords').value = filteredKeywords.join('\\n');
  
// }

// const debouncedHandleInput = debounce(handleInput);

// document.getElementById('positive').addEventListener('input', debouncedHandleInput);
// document.getElementById('negative').addEventListener('input', debouncedHandleInput);

//   document.getElementById('sortAllKeywords').addEventListener('click', function() {
//     // JavaScript code to sort the contents of the All Keywords textarea
//     console.log("sortKeywords")
//     const textarea = document.getElementById('allKeywordsTextarea');
//     if (!textarea) return; // Exit if textarea not found
  
//     const lines = textarea.value.split('\\n');
//     const cleanedAndSortedLines = lines
//       .filter(line => line.trim() !== '') // Remove empty lines
//       .sort((a, b) => a.localeCompare(b)); // Sort alphabetically
  
//     textarea.value = cleanedAndSortedLines.join('\\n');
//   });

//   pauseButton.addEventListener("click", async () => {
//     if(pauseButton.textContent=="Pause"){
//       isPaused = true
//       statusDiv.textContent = "Status: Paused";
//       pauseButton.textContent = "Resume"  
//       elapsedTimeDuringPause = Date.now() - startTime;
//       clearInterval(interval);
//     }else{
//       startTime = Date.now() - elapsedTimeDuringPause;
//       interval = setInterval(updateDisplay, 1000); // Update every second  
//       isPaused = false
//       statusDiv.textContent = "Status: Running";
//       pauseButton.textContent = "Pause"  
//       await iterateKeywords();
//     }
//   });

// (function() {
  // Utility functions
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const formatTime = ms => {
      let seconds = Math.floor(ms / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);

      seconds %= 60;
      minutes %= 60;
      hours %= 24;

      return [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0')).join(':');
  };
  const debounce = (func, delay = 300) => {
      let timeout;
      return function(...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), delay);
      };
  };

  // Cached DOM Elements
  const elements = {
      startButton: document.getElementById("btnstart"),
      pauseButton: document.getElementById("pauseButton"),
      statusDiv: document.getElementById("status"),
      totalRequestsSpan: document.getElementById("totalRequests"),
      totalKeywordsSpan: document.getElementById("totalKeywords"),
      inQueueSpan: document.getElementById("inQueue"),
      elapsedTimeSpan: document.getElementById("elapsedTime"),
      fetchingSpan: document.getElementById("fetching"),
      queueTextarea: document.getElementById("queueTextarea"),
      historyTextarea: document.getElementById("historyTextarea"),
      allKeywordsTextarea: document.getElementById("allKeywordsTextarea"),
      positiveInput: document.getElementById('positive'),
      negativeInput: document.getElementById('negative'),
      filterKeywords: document.getElementById('filterKeywords'),
      filterCount: document.getElementById('filterCount'),
      sortAllKeywords: document.getElementById('sortAllKeywords'),
      keywordInput: document.getElementById("keyword")
  };

  // Application state
  let state = {
      startTime: null,
      interval: null,
      elapsedTimeDuringPause: 0,
      isPaused: false,
      currentKeywordIndex: 0,
      queue: [],
      uniqueKeywords: [],
      totalRequests: 0,
      currKeyword: ''
  };

  // Core functions
  const updateUI = () => {
      state.totalRequests++;
      elements.totalRequestsSpan.textContent = state.totalRequests;
      elements.totalKeywordsSpan.textContent = elements.allKeywordsTextarea.value.split("\\n").filter(item => item !== '').length;
  };

  const fetchKeywords = async (keyword) => {
    state.currKeyword = keyword;
    console.log("Fetching keywords for:", state.currKeyword);
    const url = "/google/search?q=" + encodeURIComponent(state.currKeyword);
    elements.statusDiv.textContent = "Status: Fetching";
    appendToTextarea('allKeywordsTextarea', state.currKeyword);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('HTTP error! Status: ' + response.status);
        }
        const json = await response.json();
        if (json) {
            // Update the queue only if it's the first request
            if (state.totalRequests === 0) {
                state.queue = json.queries; // or json.query;
                elements.queueTextarea.value = state.queue.join('\\n');
                elements.inQueueSpan.textContent = state.queue.length;
            }

            json.queries.forEach(keyword => {
                if (!state.uniqueKeywords.includes(keyword)) {
                    state.uniqueKeywords.push(keyword); // Add unique keywords
                    appendToTextarea('allKeywordsTextarea', keyword);
                }
            });

            updateUI();
        }
        elements.statusDiv.textContent = "Status: Waiting";
        elements.fetchingSpan.value = "";
        await sleep(5000);
    } catch (error) {
        console.error("Failed to fetch keywords:", error);
        elements.statusDiv.textContent = "Status: Error fetching data";
    }
};
  const iterateKeywords = async () => {
    while (!state.isPaused && state.currentKeywordIndex < state.queue.length) {
        const keyword = state.queue[state.currentKeywordIndex];
        elements.fetchingSpan.value = keyword;
        appendToTextarea('historyTextarea', keyword);

        let curQue = elements.queueTextarea.value.split('\\n').filter(line => line.trim() !== '');
        if (curQue.length === 0) {
            clearInterval(state.interval);
            state.queue = [];
            elements.statusDiv.textContent = "Status: Idle";
            elements.fetchingSpan.value = "";
            elements.queueTextarea.value = "";
            state.elapsedTimeDuringPause = Date.now() - state.startTime;
            clearInterval(state.interval);   
            break; // Exit the loop
        } else {
            curQue.shift();
            elements.queueTextarea.value = curQue.join('\\n');
            elements.inQueueSpan.textContent = curQue.length;
            await fetchKeywords(keyword);
            state.currentKeywordIndex++;
        }
    }
};


  // Helper functions
  const appendToTextarea = (id, newText) => {
      var textarea = document.getElementById(id);
      if (textarea) {
          textarea.value += newText + "\\n";
      }
  };

  // Event Handlers
  elements.startButton.addEventListener("click", async () => {
    let keyword = elements.keywordInput.value.trim();
    if (keyword !== '') {
        if (state.isPaused) {
            // If paused, reset the pause button and state
            state.isPaused = false;
            elements.pauseButton.textContent = "Pause";
        }
        resetState();
        elements.statusDiv.textContent = "Status: Running";
        state.startTime = Date.now();
        state.interval = setInterval(updateDisplay, 1000);
        elements.fetchingSpan.value = keyword;
        appendToTextarea('historyTextarea', keyword);
        await fetchKeywords(keyword);
        await iterateKeywords();
    } else {
        console.log("Please enter a seed term");
        triggerErrorBlink();
        setTimeout(stopErrorBlink, 3000);
    }
});


  elements.pauseButton.addEventListener("click", () => {
    if (state.isPaused) {
        // Resume functionality
        state.isPaused = false;
        elements.pauseButton.textContent = "Pause";
        elements.statusDiv.textContent = "Status: Running";
        
        // Resume the elapsed time calculation
        state.startTime = Date.now() - state.elapsedTimeDuringPause;
        state.interval = setInterval(updateDisplay, 1000);
        
        // Continue iterating through the keywords
        iterateKeywords();
    } else {
        // Pause functionality
        state.isPaused = true;
        elements.pauseButton.textContent = "Resume";
        elements.statusDiv.textContent = "Status: Paused";
        
        // Pause the elapsed time calculation
        state.elapsedTimeDuringPause = Date.now() - state.startTime;
        clearInterval(state.interval);
    }
});


  elements.sortAllKeywords.addEventListener('click', function() {
      const lines = elements.allKeywordsTextarea.value.split('\\n');
      const sortedLines = lines.filter(line => line.trim() !== '').sort((a, b) => a.localeCompare(b));
      elements.allKeywordsTextarea.value = sortedLines.join('\\n');
  });

  elements.keywordInput.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
          event.preventDefault();
          elements.startButton.click();
      }
  });

  const handleInput = () => {
      let filteredKeywords = elements.allKeywordsTextarea.value.split("\\n");
      let positiveInput = elements.positiveInput.value.trim().split('\\n').filter(Boolean);
      let negativeInput = elements.negativeInput.value.trim().split('\\n').filter(Boolean);

      if (positiveInput.length > 0) {
          filteredKeywords = filteredKeywords.filter(kw => positiveInput.some(positive => kw.includes(positive)));
      }

      if (negativeInput.length > 0) {
          filteredKeywords = filteredKeywords.filter(kw => !negativeInput.some(negative => kw.includes(negative)));
      }

      elements.filterKeywords.value = filteredKeywords.join('\\n');
      elements.filterCount.textContent = filteredKeywords.length;
  };

  const debouncedHandleInput = debounce(handleInput);
  elements.positiveInput.addEventListener('input', debouncedHandleInput);
  elements.negativeInput.addEventListener('input', debouncedHandleInput);

  // Reset function
  const resetState = () => {
    if (state.interval) {
        clearInterval(state.interval);
    }
    state = { ...state, startTime: null, interval: null, elapsedTimeDuringPause: 0, currentKeywordIndex: 0, queue: [], uniqueKeywords: [], totalRequests: 0 };
    elements.totalRequestsSpan.textContent = 0;
    elements.totalKeywordsSpan.textContent = 0;
    elements.inQueueSpan.textContent = 0;
    elements.queueTextarea.value = "";
    elements.fetchingSpan.value = "";
    elements.allKeywordsTextarea.value = "";
    elements.filterKeywords.value = "";
    elements.positiveInput.value = "";
    elements.negativeInput.value = "";
    elements.elapsedTimeSpan.textContent = '00:00:00';
    elements.statusDiv.textContent = "Status: Idle";
    elements.historyTextarea.value = "";
};

  // Error handling
  const triggerErrorBlink = () => {
      var keywordLabel = document.getElementById('keywordLabel');
      if (keywordLabel) {
          keywordLabel.classList.add('blink');
      }
  };

  const stopErrorBlink = () => {
      var keywordLabel = document.getElementById('keywordLabel');
      if (keywordLabel) {
          keywordLabel.classList.remove('blink');
      }
  };

  const updateDisplay = () => {
    const elapsedTime = Date.now() - state.startTime;
    elements.elapsedTimeSpan.textContent = formatTime(elapsedTime);
  };

  // Initialize
  function init() {
      resetState();
  }

  init();
// })();
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

export default queryDumper;
