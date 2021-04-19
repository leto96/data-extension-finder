import Head from 'next/head';
import { useEffect, useState } from 'react';
import serverRoute from '../utils/serverRoute';
import axios from 'axios';
import DataExtensionTable from '../components/DataExtensionTable';
import Spinner from '../components/Spinner';
import SearchDataExtension from '../components/SearchDataExtension';

export default function Home(props){
  const [access_token, setAccess_token] = useState('');
  const [rest_instance_url, setRest_instance_url] = useState('');
  const [expires_in, setExpires_in] = useState('');
  const [refresh_token, setRefresh_token] = useState('');
  const [DEs, setDEs] = useState([]);
  const [folders, setFolders] = useState([]);
  const [foldersLoaded, setfoldersLoaded] = useState(false);
  const [tokenStarted, setTokenStarted] = useState(false);

  useEffect(() => {
    console.log('The component has started');
    setAccess_token(props.access_token);
    setRest_instance_url(props.rest_instance_url);
    setExpires_in(props.expires_in);
    setRefresh_token(props.refresh_token);

  }, []);

  useEffect(() => {
    if(!tokenStarted && access_token !== '') {
      retrieveAllFolders(access_token);
      setTokenStarted(true);
    }
  }, [access_token]);

  const findDEHandler = async (deName) => {

    if(!foldersLoaded){ return }

    const retrieveResponse = await axios.post('/api/retrieveDE', {
      deName, access_token, code: props.code
    },
      {
        "Content-Type": "application/json" 
      }
    );

    const newDEs = retrieveResponse.data.results.map(de => {
      return {
        Name: de.Name,
        CustomerKey: de.CustomerKey,
        CreatedDate: de.CreatedDate,
        Path: setFolderFullPath(de.CategoryID)
      }
    });

    setDEs(newDEs);
  }

  const setFolderFullPath = (ID) => {
    let folderIndex = folders.findIndex( (el) => {
      return el.ID === ID
    });
    const stringFullPath = [];
    stringFullPath.unshift(folders[folderIndex].Name);
    let parentID = folders[folderIndex].ParentFolder.ID;
    
    while(parentID !== '0'){
      folderIndex = folders.findIndex( (el) => {
        return el.ID === parentID
      });
  
      stringFullPath.unshift(folders[folderIndex].Name);
      parentID = folders[folderIndex].ParentFolder.ID;
    }
  
    return stringFullPath.join('\\');
  }

  const retrieveAllFolders = async (token) => {
    // return;
    const retrieveResponse = await axios.post('/api/retrieveAllFolders', {
      access_token: token, code: props.code
    },
      {
        "Content-Type": "application/json" 
      }
    );

    console.log('Folder retrieve response');
    console.log(retrieveResponse);
    
    setFolders(retrieveResponse.data.results);
    setfoldersLoaded(true);
  }

    return (
      <>
        <Head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/design-system/2.9.4/styles/salesforce-lightning-design-system.min.css" rel="stylesheet"/>
        </Head>
        {foldersLoaded ? 
          <div className="slds-brand-band slds-brand-band_large slds-p-around_xx-large">
          <div className="slds-page-header">
          <div>Data Extension Finder</div>
          <SearchDataExtension findDEHandler={(daName) => findDEHandler(daName)} />
          <DataExtensionTable dataExtensions={DEs} />
          </div>
          </div>
        : <Spinner /> 
        }
      </>
    )
}

export async function getServerSideProps(context) {
  console.log("Running server side index");
  context.res.setHeader('Cache-Control', 'No-Cache');

  if(!context.query.code){
    context.res.statusCode(307);
    context.res.setHeader("location", "/error");
    return {};
  }
  
  // Call 
  const SUBDOMAIN = 'mc7m29h53rz2cs6n2lc86vgt2vf4';
  const AUTHORIZATION_URL = 'https://' + SUBDOMAIN + '.auth.marketingcloudapis.com/v2/token';

  const payload = {
    "grant_type": "authorization_code",
    "code": context.query.code,
    "client_id": process.env.CLIENT_ID || '6ytfxnhw69p4xbikj8w5q8wg',
    "redirect_uri": serverRoute + "/"
  };

  let response;

  try {
    response = await axios.post(AUTHORIZATION_URL, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    // console.log(response.data.refresh_token);
    // console.log(response.data.access_token);
  } catch (error) {
    console.log('error  in getServerSideProps');
    return {
      props: { error: error }
    }
  }

  console.log(response.data);

  return {
    props: { code: context.query.code || null,
      ...response.data
    }
  }
}