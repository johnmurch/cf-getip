

import errorPage from '../templates/error'
import googleAlphabetical from '../helpers/googleAlphabetical'
import googleComparisons from '../helpers/googleComparisons'
import googlePrepositions from '../helpers/googlePrepositions'
import googleQuestions from '../helpers/googleQuestions'
import googleRelated from '../helpers/googleRelated'

const googleSearch = async (req) => {
  // q = query
  // o = order - either 0 or 1 e.g. prefix or suffix with item
	const { query } = req
  const q = (query.q) ? (query.q) : ""
  const o = (query.o) ? query.o : 0
  try{
    if(q){
      let payload = {}
      payload.alphabeticals = await googleAlphabetical(q,o)   
      payload.comparisons = await googleComparisons(q,o)
      console.log('payload.comparisons',payload.comparisons)
      payload.prepositions = await googlePrepositions(q, o)
      payload.questions = await googleQuestions(q,o)
      payload.related = await googleRelated(q,o)
      // payload.related = await googleSuggest(q, "us","en")
      let queries = []
      for await(letter of Object.keys(payload.alphabeticals)){
        queries.push(...payload.alphabeticals[letter])
      }
      for await(item of Object.keys(payload.comparisons)){
        queries.push(...payload.comparisons[item])
      }
      for await(item of Object.keys(payload.prepositions)){
        queries.push(...payload.prepositions[item])
      }
      for await(item of Object.keys(payload.questions)){
        queries.push(...payload.questions[item])
      }
      for await(item of Object.keys(payload.related)){
        queries.push(payload.related[item])
      }

      if(queries){
        queries = (queries.length>0) ? queries.sort() : queries
        queries =  [...new Set(queries)]
      }
      // FAIL
      payload.queries = queries
      payload.size = queries.length
      // payload = ["für",["für elise","für elise piano","für elise sheet music","fürth","fürstenberg","für elise meaning","fürjes balázs","fürstenfeldbruck"],["","","","","","","",""],[],{"google:clientdata":{"bpc":false,"tlw":false},"google:suggestrelevance":[1250,750,602,601,600,552,551,550],"google:suggestsubtypes":[[512,433,131],[512,433,131],[512],[512,433,131],[512],[512],[3],[512,433,131]],"google:suggesttype":["QUERY","QUERY","QUERY","QUERY","QUERY","QUERY","QUERY","QUERY"],"google:verbatimrelevance":950}]
      return new Response(JSON.stringify(JSON.parse( decodeURIComponent( JSON.stringify(payload) ))), {
        headers: {
          "content-type":  "application/json;charset=utf-8",
        }
      })
    }else{
      return new Response(JSON.stringify({error:true, message:"Missing Query Param (?q=)"}), {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      })  
    }
  }catch(e){
    console.log("ERROR",e)    
    return new Response(errorPage, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  }

}

export default googleSearch