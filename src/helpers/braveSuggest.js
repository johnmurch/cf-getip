// en - english
// us - united states
const braveSuggest = (keyword) => new Promise(async (resolve, reject) => {
  try{
    let fetchUrl = `https://search.brave.com/api/suggest?q=${encodeURIComponent(keyword)}`
    console.log("fetchUrl", fetchUrl)
    const getQuery = await fetch(fetchUrl,{
      "method":"GET"
    })
    const data = await getQuery.json()
    resolve(data)     
  }catch(e){
    console.log("FAIL",e)
    reject("FAIL")
  }
})

export default braveSuggest