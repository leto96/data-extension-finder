import axios from 'axios';
import serverRoute from '../utils/serverRoute';

export default async (req, res) => {
  console.log('Code received');
  if(!req.query.code){
    return res.status(401).json({status: 'Missing Code param'});
  }
  
  const SUBDOMAIN = 'mc7m29h53rz2cs6n2lc86vgt2vf4';
  const AUTHORIZATION_URL = 'https://' + SUBDOMAIN + '.auth.marketingcloudapis.com/v2/token';

  const payload = {
    "grant_type": "authorization_code",
    "code": req.query.code,
    "client_id": process.env.CLIENT_ID || '6ytfxnhw69p4xbikj8w5q8wg',
    "redirect_uri": serverRoute + "/"
  };

  axios.post(AUTHORIZATION_URL, payload, {
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => {
    console.log('response in receive code');
    console.log(response.data);
  }).catch(e => {
    console.log('erro in receive code');
    console.log(e.data);
  });
}