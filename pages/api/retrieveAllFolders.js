import serverRoute from '../../utils/serverRoute';
import FuelSoap from 'fuel-soap';

export default async (req, res) => {
  const {access_token, code} = req.body;
  const options = {
    auth: { 
        clientId: '6ytfxnhw69p4xbikj8w5q8wg',
        authUrl: 'https://mc7m29h53rz2cs6n2lc86vgt2vf4.auth.marketingcloudapis.com',
        accessToken: access_token,
        authOptions:{ authVersion: 2, applicationType: 'public', 
          redirectURI: serverRoute + '/',
          authorizationCode: code
        }
    }
    , soapEndpoint: 'https://mc7m29h53rz2cs6n2lc86vgt2vf4.soap.marketingcloudapis.com/Service.asmx' // default --> https://webservice.exacttarget.com/Service.asmx
  };
  
  const SoapClient = new FuelSoap(options);

  var retrieveOptions = {
    filter: {
        leftOperand: 'ContentType',
        operator: 'equals',
        rightOperand: 'DataExtension'
    }
  };
  
  SoapClient.retrieve(
    'DataFolder',
    ["ID",	"ParentFolder.ID", "Name"],
    retrieveOptions,
    function( err, response ) {
      if ( err ) {
        // error here
        console.log(err);
        res.status(500).json({err});
        console.log( 'err in folder' );
        return;
      }
  
      console.log('response in folder');
      res.status(200).json({results: response.body.Results, Status: response.body.OverallStatus});
    }
  );

}