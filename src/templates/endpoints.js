const endpoints = () => {
  const html = `<!DOCTYPE html>
  <body>
    <h1>ENDPOINTS</h1>
    <h3>Google</h3>
    <ul>
      <li>/google/alphabetical?q=mortgage</li>
      <li>/google/comparisons?q=mortgage</li>
      <li>/google/prepositions?q=mortgage</li>
      <li>/google/questions?q=mortgage</li>
    </ul>
    <h3>DDG</h3>
    <ul>
      <li>/ddg/alphabetical?q=mortgage</li>
      <li>/ddg/comparisons?q=mortgage</li>
      <li>/ddg/prepositions?q=mortgage</li>
      <li>/ddg/questions?q=mortgage</li>
    </ul>
    <h3>Brave</h3>
    <ul>
      <li>/brave/alphabetical?q=mortgage</li>
      <li>/brave/comparisons?q=mortgage</li>
      <li>/brave/prepositions?q=mortgage</li>
      <li>/brave/questions?q=mortgage</li>
    </ul>
    <!-- 
    <h1>Enter Keyword</h1>
    <input type="text" id="keyword">
    <button id="btnGenerate">Generate</button>-->
    </body>
  </html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=utf-8',
    },
  });
}

export default endpoints