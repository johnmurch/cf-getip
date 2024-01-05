/**
 * cf-keywords - Cloudflare worker for fetching keyword data
 */
import { Redis } from "@upstash/redis/cloudflare";
import { MultiRegionRatelimit } from "@upstash/ratelimit";

const cache = new Map();

const ratelimit = new MultiRegionRatelimit({
  redis: [
    new Redis({
      url: UPSTASH_REDIS_REST_URL,
      token: UPSTASH_REDIS_REST_TOKEN
    })
  ],
  limiter: MultiRegionRatelimit.fixedWindow(10, "60 s"),
  ephemeralCache: cache
});

import { Router } from "itty-router";
import homepage from "./templates/homepage";
import queryDumper from "./templates/query-dumper";
import crap from "./templates/crap";
import endpoints from "./templates/endpoints";

import allAlphabetical from "./handlers/allAlphabetical";

import googleSearch from "./handlers/googleSearch";
import googleAlphabetical from "./handlers/googleAlphabetical";
import googleComparisons from "./handlers/googleComparisons";
import googlePrepositions from "./handlers/googlePrepositions";
import googleQuestions from "./handlers/googleQuestions";
import googleRelated from "./handlers/googleRelated";

import ddgAlphabetical from "./handlers/ddgAlphabetical";
import ddgComparisons from "./handlers/ddgComparisons";
import ddgPrepositions from "./handlers/ddgPrepositions";
import ddgQuestions from "./handlers/ddgQuestions";
import ddgRelated from "./handlers/ddgRelated";

import braveAlphabetical from "./handlers/braveAlphabetical";
import braveComparisons from "./handlers/braveComparisons";
import bravePrepositions from "./handlers/bravePrepositions";
import braveQuestions from "./handlers/braveQuestions";
import braveRelated from "./handlers/braveRelated";

const router = Router();

const rateLimitor = async (request) => {
  const userIP = request.headers.get("CF-Connecting-IP") || "none";
  const data = await ratelimit.limit(userIP);
  if (!data.success) {
    return new Response(
      JSON.stringify(
        {
          message: "You are rate limited, slow down and try again later.",
          ip: userIP
        },
        null,
        2
      ),
      { status: 200 }
    );
  }
};

router.get("/", homepage);
router.get("/query-dumper", queryDumper);
router.get("/crap", crap);
router.get("/docs", endpoints);
router.get("/image/:imageName", async ({ params }) => {
  // try {
  // Retrieve the image from the R2 bucket
  //   const object = await env.MY_BUCKET.get(params.imageName);
  //   // If the object does not exist, return a 404 response
  //   if (!object) {
  //     return new Response("Image not found", { status: 404 });
  //   }
  //   // Return the image as a response with the appropriate content type
  //   return new Response(object.body, {
  //     headers: {
  //       "Content-Type": "image/png"
  //     }
  //   });
  // } catch (error) {
  //   // Handle any errors
  //   return new Response("Error fetching image", { status: 500 });
  // }
});

router.get("/favicon.ico", (request) => {
  return new Response("Not Found.", { status: 404 });
});

router.get("/all/alphabetical", rateLimitor, allAlphabetical);

router.get("/ddg/alphabetical", rateLimitor, ddgAlphabetical);
router.get("/ddg/comparisons", rateLimitor, ddgComparisons);
router.get("/ddg/prepositions", rateLimitor, ddgPrepositions);
router.get("/ddg/questions", rateLimitor, ddgQuestions);
router.get("/ddg/related", rateLimitor, ddgRelated);

router.get("/brave/alphabetical", rateLimitor, braveAlphabetical);
router.get("/brave/comparisons", rateLimitor, braveComparisons);
router.get("/brave/prepositions", rateLimitor, bravePrepositions);
router.get("/brave/questions", rateLimitor, braveQuestions);
router.get("/brave/related", rateLimitor, braveRelated);

router.get("/google/alphabetical", rateLimitor, googleAlphabetical);
router.get("/google/comparisons", rateLimitor, googleComparisons);
router.get("/google/prepositions", rateLimitor, googlePrepositions);
router.get("/google/questions", rateLimitor, googleQuestions);
router.get("/google/related", rateLimitor, googleRelated);

router.get("/google/search", rateLimitor, googleSearch);

// 404 for everything else
router.all("*", () => new Response("Not Found.", { status: 404 }));

// attach the router "handle" to the event handler
addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request))
);
