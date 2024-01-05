import sleep from '../helpers/sleep'
import googleSuggest from '../helpers/googleSuggest'

const googleAlphabetical = (q,o) => new Promise(async (resolve, reject) => {
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
      let data = await googleSuggest(search,"us","en")
  
      let letterTerms = []
      for await(const [i, v] of data[4]["google:suggesttype"].entries()){
        let term = data[4]["google:suggesttype"][i]
        // only use query terms!
        if(term=="QUERY"){
          letterTerms.push(data[1][i])
        }
        alphabeticals[fix] = letterTerms
      }
      await sleep(10)
      if (typeof alphabeticals[fix] != "undefined") {
        alphabeticals[fix] = alphabeticals[fix].sort()
      }else{
        alphabeticals[fix] = []
      }
    }
    resolve(alphabeticals)
  }catch(e){
    console.log("FAIL",e)
    reject("FAIL")
  }
})

export default googleAlphabetical