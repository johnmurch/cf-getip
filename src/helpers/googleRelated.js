import sleep from '../helpers/sleep'
import googleSuggest from '../helpers/googleSuggest'

const googleRelated = (q,o) => new Promise(async (resolve, reject) => {
  try{ 
    let data = await googleSuggest(q,"us","en")  
    let related = []
    for await(const [i, v] of data[4]["google:suggesttype"].entries()){
      let term = data[4]["google:suggesttype"][i]
      console.log(data[1])
      // only use query terms!
      if(term=="QUERY"){
        related.push(data[1][i])
      }
    }
    await sleep(20)
    if (typeof related != "undefined") {
      related = related.sort()
    }else{
      related = []
    }
    resolve(related)
  }catch(e){
    console.log("FAIL",e)
    reject("FAIL")
  }
})

export default googleRelated