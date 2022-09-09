const getIP = async (req) => {
	
  const clientUA = req.headers.get('User-Agent');
  const clientIP = req.headers.get('CF-Connecting-IP');
  const clientASN = req.cf.asn;
  const clientISP = req.cf.asOrganization;
  const clientCO = req.cf.country;
  const clientCI = req.cf.city;
  const clientRE = req.cf.region;
  const clientLAT = req.cf.latitude;
  const clientLON = req.cf.longitude;
  const clientPC = req.cf.postalCode;
  const clientTZ = req.cf.timezone;

  return new Response("Public IP: " + clientIP + "\n" + 
  "ASN: " + clientASN + "\n" + 
  "ISP: " + clientISP + "\n" + 
  "Country: " + clientCO + "\n" + 
  "City: " + clientCI + "\n" + 
  "Region: " + clientRE + "\n" + 
  "Latitude, Longitude: " + clientLAT + "," + clientLON + "\n" + 
  "Postal Code: " + clientPC + "\n" + 
  "Timezone: " + clientTZ + "\n" + 
  "User Agent: " + clientUA + "\n"
  );

}

export default getIP