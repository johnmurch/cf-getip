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

  let payload = {
    ip:clientIP,
    asn: clientASN,
    isp: clientISP,
    country: clientCO,
    city: clientCI,
    region: clientRE,
    latitude: clientLAT,
    longitude: clientLON,
    zipcode: clientPC,
    timezone: clientTZ,
    userAgent: clientUA
  }

  return new Response(JSON.stringify(payload), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

export default getIP