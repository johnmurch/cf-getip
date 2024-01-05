import sleep from '../helpers/sleep'
// import suggest from '../helpers/suggest'
import errorPage from '../templates/error'
import braveSuggest from '../helpers/braveSuggest'
import googleSuggest from '../helpers/googleSuggest'
import ddgSuggest from '../helpers/ddgSuggest'

const uniqSort = (arr = []) => {
  const map = {};
  const res = [];
  for (let i = 0; i < arr.length; i++) {
     if (!map[arr[i]]) {
        map[arr[i]] = true;
        res.push(arr[i]);
     };
  };
  return res.sort((a, b) =>  a - b);
};

const allAlphabetical = async (req) => {
  
  // q = query
  // o = order - either 0 or 1 e.g. prefix or suffix with item

	const { query } = req
  const q = (query.q) ? (query.q) : ""
  const o = (query.o) ? query.o : 0
  const p = (query.p) ? query.p : 0
  try{
    if(q){
      let payload = {
        alphabetical:{},
        query:[]
      }
      let chunks = [
        ["a", "b", "c", "d", "e","f","g","h"],
        ["i","j","k","l","m","n","o","p","q"],
        ["r","s","t","u","v","w","x","y","z"]
      ]

      let items = chunks[p] // ["a", "b", "c", "d", "e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
      for await(fix of items){
        let prefix = fix + " "+ q
        let suffix = q + " " + fix

        let prefixSuffixTemplate = {
          0:suffix,
          1:prefix
        }
    
        let search = prefixSuffixTemplate[o] // keyword a vs a keyword
        let braveData = await braveSuggest(search)
        let ddgData = await ddgSuggest(search)        
        let googleData = await googleSuggest(search)
        let braveDataSuggest = braveData[1]
        let ddgDataSuggest = ddgData.map((s) => s.phrase)
        let googleDataSuggest = googleData[1]
        payload.alphabetical[fix] = uniqSort(braveDataSuggest.concat(ddgDataSuggest,googleDataSuggest))
        console.log("SLEEP")
      }

      // BUMP QUERY OVER
      for await(key of Object.keys(payload.alphabetical)){
        if(payload["alphabetical"][key].length>0){
          payload["query"].push(...payload["alphabetical"][key].sort())
          payload["query"] = [...new Set(payload["query"])]
        }
      }

      payload.size = payload.query.length
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

export default allAlphabetical