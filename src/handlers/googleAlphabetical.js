import sleep from '../helpers/sleep'
import googleSuggest from '../helpers/googleSuggest'
import errorPage from '../templates/error'

const getAlphabetical = async (req) => {
  
  // q = query
  // o = order - either 0 or 1 e.g. prefix or suffix with item

	const { query } = req
  const q = (query.q) ? (query.q) : ""
  const o = (query.o) ? query.o : 0
  try{
    if(q){
      let payload = {
        results:[]
      }
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
  
          for await(const [i, v] of data[4]["google:suggesttype"].entries()){
            let term = data[4]["google:suggesttype"][i]
            term = term.toLowerCase() // lowercase value
            if(!payload[term]){
              payload[term] = []
            }
            payload[term].push(data[1][i])
          }
          let p = {
            keyword: data[0],
            suggest: data[1],
            suggestType: data[4]["google:suggesttype"]
          }
          payload.results.push(p)
          await sleep(100)
          console.log("SLEEP")
        }

        for await(key of Object.keys(payload)){
          if(key!="results"){
            payload[key] = payload[key].sort()
            payload[key] = [...new Set(payload[key])]
          }
        }

      return new Response(JSON.stringify(payload), {
        headers: {
          "content-type": "application/json;charset=utf-8",
        }
      })
    }else{
      return new Response(JSON.stringify({error:true, message:"Missing Query Param (?q=)"}), {
        headers: {
          "content-type": "application/json;charset=utf-8",
        },
      })  
    }
  }catch(e){
    console.log("ERROR",e)    
    return new Response(errorPage, {
      headers: {
        "content-type": "text/html;charset=utf-8",
      },
    });
  }

}

export default getAlphabetical