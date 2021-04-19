import DataExtensionElement from './DataExtensionElement';

export default function DataExtensionTable(props){
    return (
  <table className="slds-table slds-table_cell-buffer slds-table_bordered">
  <thead>
    <tr className="slds-line-height_reset">
      <th className="" scope="col">
        <div className="slds-truncate" title="Name">
          Name
        </div>
      </th>
      <th className="" scope="col">
        <div className="slds-truncate" title="Customer Key">Customer Key</div>
      </th>
      <th className="" scope="col">
        <div className="slds-truncate" title="Date Created">Date Created</div>
      </th>
    </tr>
  </thead>
  <tbody>
    {props.dataExtensions.length > 0 ? 
      props.dataExtensions.map(de => (<DataExtensionElement key={de.CustomerKey} {...de} />) ): 'Not found'}
  </tbody>
</table>
    )
}