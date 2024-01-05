import sleep from '../helpers/sleep'
import googleSuggest from '../helpers/googleSuggest'

const googleComparisons = (q,o) => new Promise(async (resolve, reject) => {
  try{
    let comparisons = {}
    let items = ["and","like","or","versus","vs"]
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
      let data = await googleSuggest(search,"us","en")
  
      let letterTerms = []
      for await(const [i, v] of data[4]["google:suggesttype"].entries()){
        let term = data[4]["google:suggesttype"][i]
        // only use query terms!
        if(term=="QUERY"){
          letterTerms.push(data[1][i])
        }
        comparisons[fix] = letterTerms
      }
      await sleep(20)
      if (typeof comparisons[fix] != "undefined") {
        comparisons[fix] = comparisons[fix].sort()
      }else{
        comparisons[fix] = []
      }
    }
    resolve(comparisons)
  }catch(e){
    console.log("FAIL",e)
    reject("FAIL")
  }
})

export default googleComparisons