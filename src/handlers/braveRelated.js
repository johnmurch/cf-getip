import sleep from '../helpers/sleep'
// import suggest from '../helpers/suggest'
import braveSuggest from '../helpers/braveSuggest'
import errorPage from '../templates/error'

const braveRelated = async (req) => {
  
  // q = query
  // o = order - either 0 or 1 e.g. prefix or suffix with item

	const { query } = req
  const q = (query.q) ? (query.q) : ""
  const o = (query.o) ? query.o : 0
  try{
    if(q){
      let payload = {
        related:[],
        query:[]
      }
      let data = await braveSuggest(q)
      let p = {
        keyword: q,
        suggest: data[1]
      }
      payload.related.push(p)
      await sleep(20)
      console.log("SLEEP")
      for await(key of Object.keys(payload.related)){
        payload["query"].push(...payload["related"][key].suggest.sort())
        payload["query"] = [...new Set(payload["query"])]
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

export default braveRelated