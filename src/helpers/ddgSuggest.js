// en - english
// us - united states
const ddgSuggest = (keyword) => new Promise(async (resolve, reject) => {
  try{
    let fetchUrl = `https://duckduckgo.com/ac/?kl=wt-wt&q=${encodeURIComponent(keyword)}`
    console.log("fetchUrl", fetchUrl)
    const getQuery = await fetch(fetchUrl,{
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        'Content-Type': 'text/plain;charset=ISO-8859-1',
      },
    })
    const data = await getQuery.json()
    resolve(data)     
  }catch(e){
    console.log("FAIL",e)
    reject("FAIL")
  }
})

export default ddgSuggest