import serverRoute from '../../utils/serverRoute';

export default (req, res) => {
  console.log('Login');
  const SFMC_SUBDOMAIN = 'mc7m29h53rz2cs6n2lc86vgt2vf4';
  const CLIENT_ID = process.env.CLIENT_ID || '6ytfxnhw69p4xbikj8w5q8wg';
  const BACK_URL = serverRoute + '/';
  const REDIRECT_URL = 'https://' + SFMC_SUBDOMAIN + '.auth.marketingcloudapis.com/v2/authorize?response_type=code&client_id=' + CLIENT_ID + 
    '&redirect_uri=' + encodeURIComponent(BACK_URL);
      
  res.redirect(REDIRECT_URL);
}