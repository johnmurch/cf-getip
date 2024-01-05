import sleep from '../helpers/sleep'
import googleSuggest from '../helpers/googleSuggest'

const googleQuestions = (q,o) => new Promise(async (resolve, reject) => {
  try{
    let questions = {}
    let items = ["what","when","where","which","why","will","are","can","how","who"]
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
        questions[fix] = letterTerms
      }
      await sleep(20)
      if (typeof questions[fix] != "undefined") {
        questions[fix] = questions[fix].sort()
      }else{
        questions[fix] = []
      }
      
      //  = (questions[fix]) ? questions[fix].sort() : questions[fix]
    }
    resolve(questions)
  }catch(e){
    console.log("FAIL",e)
    reject("FAIL")
  }
})

export default googleQuestions