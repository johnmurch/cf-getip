import sleep from '../helpers/sleep'
// import suggest from '../helpers/suggest'
import ddgSuggest from '../helpers/ddgSuggest'
import errorPage from '../templates/error'

const ddgRelated = async (req) => {
  
  // q = query
  // o = order - either 0 or 1 e.g. prefix or suffix with item

	const { query } = req
  const q = (query.q) ? (query.q) : ""
  const o = (query.o) ? query.o : 0
  try{
    if(q){
      let payload = {
        results:[],
        query:[]
      }
      let data = await ddgSuggest(q)
      let suggest = data.map((s) => s.phrase)
      let p = {
        keyword: q,
        suggest: suggest
      }
      payload.results.push(p)
      await sleep(20)
      console.log("SLEEP")

      for await(key of Object.keys(payload.results)){
        // if(key!="results"){
          // console.log("*",key)
          payload["query"].push(...payload["results"][key].suggest.sort())
          payload["query"] = [...new Set(payload["query"])]
        // }
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

export default ddgRelated