import sleep from '../helpers/sleep'
import googleSuggest from '../helpers/googleSuggest'
import errorPage from '../templates/error'

const getPrepositions = async (req) => {
	const { query } = req
  const q = (query.q) ? (query.q) : ""
  const o = (query.o) ? query.o : 0
  // validate token, site, startDate and endDate are there
  try{
    if(q){
      let payload = {
        results:[]
      }
      let items = ["for","is","near","to","with","without"]
      // let items = [
      //   "a",
      //   "abaft",
      //   "aboard",
      //   "about",
      //   "above",
      //   "absent",
      //   "across",
      //   "afore",
      //   "after",
      //   "against",
      //   "along",
      //   "alongside",
      //   "amid",
      //   "amidst",
      //   "among",
      //   "amongst",
      //   "an",
      //   "anenst",
      //   "apropos",
      //   "apud",
      //   "around",
      //   "as",
      //   "aside",
      //   "astride",
      //   "at",
      //   "athwart",
      //   "atop",
      //   "barring",
      //   "before",
      //   "behind",
      //   "below",
      //   "beneath",
      //   "beside",
      //   "besides",
      //   "between",
      //   "beyond",
      //   "but",
      //   "by",
      //   "circa",
      //   "concerning",
      //   "despite",
      //   "down",
      //   "during",
      //   "except",
      //   "excluding",
      //   "failing",
      //   "following",
      //   "for",
      //   "forenenst",
      //   "from",
      //   "given",
      //   "in",
      //   "including",
      //   "inside",
      //   "into",
      //   "lest",
      //   "like",
      //   "mid",
      //   "midst",
      //   "minus",
      //   "modulo",
      //   "near",
      //   "next",
      //   "notwithstanding",
      //   "of",
      //   "off",
      //   "on",
      //   "onto",
      //   "opposite",
      //   "out",
      //   "outside",
      //   "over",
      //   "pace",
      //   "past",
      //   "per",
      //   "plus",
      //   "pro",
      //   "qua",
      //   "regarding",
      //   "round",
      //   "sans",
      //   "save",
      //   "since",
      //   "than",
      //   "the",
      //   "through",
      //   "throughout",
      //   "till",
      //   "times",
      //   "to",
      //   "toward",
      //   "towards",
      //   "under",
      //   "underneath",
      //   "unlike",
      //   "until",
      //   "unto",
      //   "up",
      //   "upon",
      //   "versus",
      //   "via",
      //   "vice",
      //   "with",
      //   "within",
      //   "without",
      //   "worth"
      // ]
      for await(fix of items){
        let prefix = fix + " "+ q
        let suffix = q + " " + fix

        let prefixSuffixTemplate = {
          0:suffix,
          1:prefix
        }

        let search = prefixSuffixTemplate[o]
        let data = await googleSuggest(search,"us","en")

        // dump each suggest into 1 array that is sorted and uniq
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
        await sleep(20)
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
      return new Response(JSON.stringify({error:true, message:"Missing Keyword Param"}), {
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

export default getPrepositions