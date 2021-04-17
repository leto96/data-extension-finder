import { Component } from 'react';
  
export default class Login extends Component {
  SFMC_SUBDOMAIN = 'mc.subdomain.com/';
  CLIENT_ID = '';
  BACK_URL = '';
  REDIRECT_URL = 'https://' + SFMC_SUBDOMAIN + 'v2/authorize?response_type=code&client_id=' + CLIENT_ID + 
    '&redirect_uri=' + encodeURIComponent(BACK_URL);
    
  static async getInitialProps (ctx) {
    let REDIRECT_URL = '/'; // TMP DEV

    if (ctx && ctx.req) {
      console.log('server side');
      ctx.res.writeHead(302, {Location: REDIRECT_URL});
      ctx.res.end();
    }
  }

  render(){
    return (
      <> 
      </>
    )
  }
  
}