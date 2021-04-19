export default function DataExtensionElement(props){
  function dateFormat(date){
    let d = new Date(date),
        day  = d.getDate().toString(),
        dayF = (day.length === 1) ? '0'+day : day,
        month  = (d.getMonth()+1).toString(),
        monthF = (month.length === 1) ? '0'+month : month,
        yearF = d.getFullYear(),
        hours = d.getHours().toString(),
        hoursF = (hours.length === 1) ? '0'+hours : hours,
        minutes = d.getHours().toString(),
        minutesF = (minutes.length === 1) ? '0'+minutes : minutes;
    return dayF+"/"+monthF+"/"+yearF+ ' ' + hoursF + ':' + minutesF;
}

  return (
  <tr className="slds-hint-parent">
    <th data-label="Name" scope="row">
      <div className="slds-truncate" title="Name">{props.Name}</div>
    </th>
    <td data-label="Customer Key">
      <div className="slds-truncate" title="Customer Key">{props.CustomerKey}</div>
    </td>
    <td data-label="Date Created">
      <div className="slds-truncate" title="{dateFormat(props.CreatedDate)}">{dateFormat(props.CreatedDate)}</div>
    </td>
    <td data-label="Path">
      <div className="slds-truncate" title="Path">{props.Path}</div>
    </td>
  </tr>
  )
}