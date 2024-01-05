import sleep from './sleep'
import ddgSuggest from './ddgSuggest'

const ddgComparisonsHelper = (q,o) => new Promise(async (resolve, reject) => {
  try{
    let comparisons = {}
    let items = ["and", "like","or","versus","vs"]
    for await(fix of items){
      // let prefixSuffix = [0,1] 
      let prefix = fix + " "+ q
      let suffix = q + " " + fix
  
      // 0 - pre + " " + keyword
      // 1 - keyword + " " + pre
      let prefixSuffixTemplate = {
        0:suffix,
        1:prefix
      }
  
      let search = prefixSuffixTemplate[o] // keyword a vs a keyword
      let data = await ddgSuggest(search,"us","en")
      let suggest = data.map((s) => s.phrase)
      comparisons[fix] = suggest
      await sleep(10)
    }
    resolve(comparisons)
  }catch(e){
    console.log("FAIL",e)
    reject("FAIL")
  }
})

export default ddgComparisonsHelper