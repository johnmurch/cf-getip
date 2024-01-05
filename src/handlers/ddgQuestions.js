import ddgQuestionsHelper from '../helpers/ddgQuestionsHelper'
import errorPage from '../templates/error'

const ddgQuestions = async (req) => {
  // q = query
  // o = order - either 0 or 1 e.g. prefix or suffix with item
	const { query } = req
  const q = (query.q) ? (query.q) : ""
  const o = (query.o) ? query.o : 0
  try{
    if(q){
      let payload = {}
      payload.questions = await ddgQuestionsHelper(q,o)
      payload.query = []
      for await(key of Object.keys(payload.questions)){
        // if(key!="results"){
          // console.log("*",key)
          payload["query"].push(...payload["questions"][key].sort())
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

export default ddgQuestions