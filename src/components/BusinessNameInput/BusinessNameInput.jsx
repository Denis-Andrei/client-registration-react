import React, {useState} from 'react'
import { BackLink, H1, Label, LabelText, HintText, ErrorText, Input, FormGroup } from 'govuk-react'
import { Button } from 'govuk-react'
import { useHistory } from 'react-router-dom';
import { getData, isNameValid } from '../../utils/Utils';
import { UserProperties } from '../../utils/UserProperties';



export default function BusinessNameInput() {
    const history = useHistory();

    const [businessName, setBusinessName] = useState(getData(UserProperties.businessName));
    const [hasErrors, setHasErrors] = useState(false)

    const handleChange = (e) => {        
        setBusinessName(e.target.value)
    }

    const handleSubmit = () => {
        if(isNameValid(businessName)){ 
            sessionStorage.setItem(UserProperties.businessName, businessName);
            history.push('/contact-number')
        }else{
            setHasErrors(true)
        }
    }
     
    return (
        <div>
            <BackLink data-testid="goBack" onClick={ () => history.goBack()}>Back</BackLink>
            <H1 data-testid="heading">Enter Business Name</H1>
            <FormGroup>
                <Label>
                    <LabelText data-testid="label">Business Name</LabelText>
                    <HintText data-testid="hint">Enter the name of your business, this cannot be changed once submitted at the end, for example - 'McDonalds'</HintText>
                    {
                        hasErrors 
                        ? 
                        <ErrorText>Please provide your businesses name</ErrorText>
                        : 
                        ""
                    }
                    <Input data-testid="input-business-name" value={businessName} onChange={handleChange} required/>
                </Label>
            </FormGroup>
            <Button data-testid="submit" onClick={handleSubmit}>Continue</Button>
        </div>
    )
}
