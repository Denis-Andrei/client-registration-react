import React, {useState} from 'react'
import { BackLink, H1, Label, LabelText, HintText, ErrorText, Input, FormGroup } from 'govuk-react'
import { Button } from 'govuk-react'
import { useHistory } from 'react-router-dom';
import { UserProperties } from '../../utils/UserProperties';
import { getData, isNumberValid } from '../../utils/Utils';

export default function ContactNrInput() { 
    const history = useHistory();
    
    const [contactNumber, setContactNumber] = useState(getData(UserProperties.contactNumber));
    const [hasErrors, setHasErrors] = useState(false)

    const handleChange = (e) => {     
        setContactNumber(e.target.value)
    }

    const handleSubmit = () => {
        if(isNumberValid(contactNumber)){
            sessionStorage.setItem(UserProperties.contactNumber, contactNumber);
            history.push('/address')
        }else{
            setHasErrors(true)
        }
    }
    return (
        <div>
            <BackLink data-testid="goBack" onClick={ () => history.goBack()}>Back</BackLink>
            <H1 data-testid="heading">Enter Contact Number</H1>
            <FormGroup>
                <Label>
                    <LabelText data-testid="label">Contact Number</LabelText>
                    <HintText data-testid="hint">The phone number you prefer to be contacted on, for example - '01615555555'</HintText>
                    {
                        hasErrors 
                        ? 
                        <ErrorText>Please enter a valid contact number</ErrorText>
                        :
                        ""
                    }
                    <Input data-testid="input-number" value={contactNumber} onChange={handleChange} type="number" required/>
                </Label>
            </FormGroup>
            <Button data-testid="submit" onClick={handleSubmit}>Continue</Button>
        </div>
    )
}
