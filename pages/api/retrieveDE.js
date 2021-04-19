import serverRoute from '../../utils/serverRoute';
import FuelSoap from 'fuel-soap';

export default async (req, res) => {
  const {access_token, deName, code} = req.body;
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
      leftOperand: 'Name',
      operator: 'like',
      rightOperand:  deName
    }
  };
  
  SoapClient.retrieve(
    'DataExtension',
    ["Name", "CustomerKey", "CreatedDate", "CategoryID"],
    retrieveOptions,
    function( err, response ) {
      if ( err ) {
        // error here
        res.status(500).json({err});
        console.log( 'err in DE' );
        return;
      }
  
      console.log('response in de');
      console.log(response.body);

      res.status(200).json({results: response.body.Results, Status: response.body.OverallStatus});
    }
  );
}