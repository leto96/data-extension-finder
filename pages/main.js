import Head from 'next/head';
import { Component } from 'react';


export default class Home extends Component {

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