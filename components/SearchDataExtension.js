import { useState } from 'react';

export default function SearchDataExtension({ findDEHandler }){
  const [deName, setdeName] = useState('');
  const [hasError, setHasError] = useState(false);

  const onChangeHandler = (textValue) => {
    setdeName(textValue.trim());
    if(deName.length >= 4){
      setHasError(false);
    }
  }

  const onClickHandler = () => {
    console.log('clicked: ' + deName );
    if(deName.length < 4){
      console.log('deName must have at least 4 chars');
      setHasError(true);
      return;
    }

    findDEHandler(deName);
  }

  return(
    <div className="slds-form">
  <div className="slds-form__row">
    <div className="slds-form__item">
      <label className="slds-form-element__label" htmlFor="form-element-03">
        Data Extension Name
        </label>
      <div className={"slds-form-element__control" + (hasError ? " slds-has-error" : "")}>
        <input type="text" aria-invalid="true" aria-describedby="form-error-01" value={deName} className="slds-input" onChange={(e) => onChangeHandler(e.target.value)} />
      { hasError ? <div className="slds-form-element__help" id="form-error-01">Must have at least 4 chars</div>: null}
      </div>
      <div className="slds-form__item">
        <button className="slds-button slds-button_brand" onClick={onClickHandler} >Find</button>
      </div>
    </div>
  </div>
</div>

  )
}