import sleep from './sleep'
import braveSuggest from './braveSuggest'

const braveAlphabeticalHelper = (q,o) => new Promise(async (resolve, reject) => {
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
      let data = await braveSuggest(search,"us","en")

      await sleep(10)
      alphabeticals[fix] = data[1]
    }
    resolve(alphabeticals)
  }catch(e){
    console.log("FAIL",e)
    reject("FAIL")
  }
})

export default braveAlphabeticalHelper