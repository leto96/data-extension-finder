import { Component } from 'react';
  
export default class Login extends Component {
  render(){
  console.log('Hello from login class');
    return (
      <> 
      </>
    )
  }  
}

export async function getServerSideProps (ctx) {
  console.log('Hello');
  const SFMC_SUBDOMAIN = 'mc7m29h53rz2cs6n2lc86vgt2vf4';
  const CLIENT_ID = process.env.CLIENT_ID || '6ytfxnhw69p4xbikj8w5q8wg';
  const BACK_URL = 'https://36841fbc5916.ngrok.io:3000/api/receiveCode';
  const REDIRECT_URL = 'https://' + SFMC_SUBDOMAIN + '.auth.marketingcloudapis.com/v2/authorize?response_type=code&client_id=' + CLIENT_ID + 
    '&redirect_uri=' + encodeURIComponent(BACK_URL);
    
  if(!ctx.query.code){
    return {
      redirect: { 
        destination: REDIRECT_URL,
        permanent: true
      }
    }
  }
  
  return {
    props: {}
  }
}