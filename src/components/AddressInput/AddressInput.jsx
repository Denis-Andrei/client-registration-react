import React, {useState} from 'react'
import { BackLink, H1, Label, LabelText, HintText, ErrorText, Input, FormGroup } from 'govuk-react'
import { Button } from 'govuk-react'
import { useHistory } from 'react-router-dom';
import { UserProperties } from '../../utils/UserProperties';
import { getData, isPostcodeValid } from '../../utils/Utils';

export default function AddressInput() {
    const history = useHistory();
    const [property, setProperty] = useState(getData(UserProperties.propertyNumber));
    const [postcode, setPostcode] = useState(getData(UserProperties.postcode));
    const [hasErrors, setHasErrors] = useState(false)

    const handleChangeProperty = (e) => {        
        setProperty(e.target.value)
    }

    const handleChangePostcode = (e) => {        
        setPostcode(e.target.value)
    }

    const handleSubmit = () => {
        if(isPostcodeValid(postcode)){
            sessionStorage.setItem(UserProperties.propertyNumber, property);
            sessionStorage.setItem(UserProperties.postcode, postcode);
            history.push('/business-type')
        }else{
            setHasErrors(true)
        }
        
    }
    return (
        <div>
            <BackLink data-testid="goBack" onClick={ () => history.goBack()}>Back</BackLink>
            <H1 data-testid="heading">Enter Property number and address</H1>
            <FormGroup>
                <Label>
                    <LabelText data-testid="label-property">Property Number</LabelText>
                    <HintText data-testid="hint-property">The house number you live at, for example - '103b'</HintText>
                    <Input data-testid="input-property" value={property} onChange={handleChangeProperty}/>
                </Label>
                <Label>
                    <LabelText data-testid="label-postcode">Postcode</LabelText>
                    <HintText data-testid="hint-postcode">The postcode where you live, for example - 'HA8 3NY'</HintText>
                    {
                        hasErrors ? 
                        <ErrorText>Please provide a valid postcode</ErrorText>
                        : ''
                    }
                    <Input data-testid="input-postcode" value={postcode} onChange={handleChangePostcode}/>
                </Label>
            </FormGroup>
            <Button data-testid="submit" onClick={handleSubmit}>Continue</Button>
        </div>
    )
}
