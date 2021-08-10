import React, {useState} from 'react'
import { BackLink, H1, Label, LabelText, HintText, ErrorText, Input, FormGroup } from 'govuk-react'
import { Button } from 'govuk-react'
import { useHistory } from 'react-router-dom';
import { UserProperties } from '../../utils/UserProperties';
import { getData, isNameValid } from '../../utils/Utils';

export default function NameInput() {
    const history = useHistory();
    const [name, setName] = useState(getData(UserProperties.name));
    const [hasErrors, setHasErrors] = useState(false)

    const handleChange = (e) => {        
        setName(e.target.value)
    }

    const handleSubmit = () => {
        if(isNameValid(name)){
            sessionStorage.setItem(UserProperties.name, name);
            history.push('/business-name')    
        }else{
            setHasErrors(true);
        }
    }

    return (
        <div>
            <BackLink data-testid="goBack" onClick={ () => history.goBack()}>Back</BackLink>
            <H1 data-testid="heading">Enter Name</H1>
             
            <FormGroup>
                <Label>
                    <LabelText data-testid="label">Full name</LabelText>
                    <HintText data-testid="hint">Enter your full name, for example - 'John Smith'</HintText>
                    {
                        hasErrors
                        ?
                        <ErrorText>Please provide your First Name and Last Name</ErrorText>
                        :
                        ""
                    }
                    <Input data-testid="input-name" onChange={handleChange} value={name} required/>
                </Label>
                
            </FormGroup>
            <Button data-testid="submit" onClick={handleSubmit}>Continue</Button>
            
            
        </div>
    )
}
