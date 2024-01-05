import sleep from './sleep'
import braveSuggest from './braveSuggest'

const bravePrepositionsHelper = (q,o) => new Promise(async (resolve, reject) => {
  try{
    let prepositions = {}
    let items = ["can","for","is","near","to","with","without"]
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
      let data = await braveSuggest(search,"us","en")

      await sleep(10)
      prepositions[fix] = data[1]
    }
    resolve(prepositions)
  }catch(e){
    console.log("FAIL",e)
    reject("FAIL")
  }
})

export default bravePrepositionsHelper