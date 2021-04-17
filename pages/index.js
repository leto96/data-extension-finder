import Head from 'next/head';
import { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  SUBDOMAIN = '';
  AUTHORIZATION_URL = 'https://' + this.SUBDOMAIN + '.auth.marketingcloudapis.com';
  TOKEN_ENDPOINT = '/v2/token';

  render(){
    return (
      <>
        <Head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/design-system/2.9.4/styles/salesforce-lightning-design-system.min.css" rel="stylesheet"/>
        </Head>
        <div>Home</div>
      </>
    )
  }
  
}

export async function getServerSideProps (ctx) {
  if(!ctx.query.code){
    return {
      redirect: { 
        destination: '/error',
        permanent: true
      }
    }
  }

  const payload = {
    "grant_type": "authorization_code",
    "code": ctx.query.code,
    "client_id": process.env.CLIENT_ID || 'client_id',
    "redirect_uri": "https://127.0.0.1:80/"
  };

  const res = await axios.post(AUTHORIZATION_URL, payload, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const { access_token, refresh_token, expires_in, rest_instance_url, soap_instance_url} = res.json();

  return {
    props: {}
  }
}