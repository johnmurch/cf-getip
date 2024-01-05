import sleep from '../helpers/sleep'
import ddgSuggest from '../helpers/ddgSuggest'

const ddgAlphabeticalHelper = (q,o) => new Promise(async (resolve, reject) => {
  try{
    let alphabeticals = {}
    let items = ["a", "b", "c", "d", "e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
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
      alphabeticals[fix] = suggest
      await sleep(10)
    }
    resolve(alphabeticals)
  }catch(e){
    console.log("FAIL",e)
    reject("FAIL")
  }
})

export default ddgAlphabeticalHelper