import React, {useState} from 'react'
import { BackLink, H1, Label, ErrorText, FormGroup, Radio } from 'govuk-react'
import { Button } from 'govuk-react'
import { useHistory } from 'react-router-dom';
import { UserProperties } from '../../utils/UserProperties';
import { getData } from '../../utils/Utils';

export default function BusinessTypeInput() {
    const history = useHistory(); 
    const [businessType, setBusinessType] = useState(getData(UserProperties.businessType))
    const [hasErrors, setHasErrors] = useState(false)

    const handleChange = (e) => {
        console.log(e.target.value)
        setBusinessType(e.target.value)
    }

    const handleSubmit = () => {
        if(businessType){
            sessionStorage.setItem(UserProperties.businessType, businessType)
            history.push('/password')
        }else{
            setHasErrors(true)    
        }
    }

    return (
        <div>
            <BackLink data-testid="goBack" onClick={ () => history.goBack()}>Back</BackLink>
            <H1 data-testid="heading">Please select your business type</H1>
            <FormGroup data-testid="input-business-type" value={businessType} onChange={handleChange}>
                <Label>
                    {
                        hasErrors 
                        ? 
                        <ErrorText>Please select your business type</ErrorText>
                        :
                        ""
                    }
                    <Radio name="group1" value='Sole trader' defaultChecked={businessType === 'Sole trader'}>Sole trader.</Radio>
                    <Radio name="group1" value='Partnership' defaultChecked={businessType === 'Partnership'}>Partnership.</Radio>
                    <Radio name="group1" value='Private Limited' defaultChecked={businessType === 'Private Limited'}>Private Limited.</Radio>
                    <Radio name="group1" value='Public Limited' defaultChecked={businessType === 'Public Limited'}>Public Limited.</Radio>
                </Label>
            </FormGroup>
            <Button data-testid="submit" onClick={handleSubmit}>Continue</Button>
        </div>
    )
}
