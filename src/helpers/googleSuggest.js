// en - english
// us - united states
const suggest = (keyword, loc="us", lang="en") => new Promise(async (resolve, reject) => {
  try{
    let fetchUrl = `http://suggestqueries.google.com/complete/search?client=chrome&hl=${lang}&gl=${loc}&q=${encodeURIComponent(keyword)}`
    //let fetchUrl = `https://suggestqueries.google.com/complete/search?output=chrome&hl=en&q=f%C3%BCr`
    console.log("fetchUrl", fetchUrl)
    const getQuery = await fetch(fetchUrl,{
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        'Content-Type': 'text/plain;charset=ISO-8859-1',
      },
    })
    let data = await getQuery.json()
    resolve(data)
  }catch(e){
    console.log("FAIL",e)
    reject("FAIL")
  }
})

export default suggest