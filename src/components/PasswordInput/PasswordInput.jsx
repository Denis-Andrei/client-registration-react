import React, {useState} from 'react'
import { BackLink, H1, Label, LabelText, HintText, ErrorText, Input, FormGroup } from 'govuk-react'
import { Button } from 'govuk-react'
import { useHistory } from 'react-router-dom';
import { UserProperties } from '../../utils/UserProperties';
import { isPasswordMatching, isPasswordValid } from '../../utils/Utils';

export default function PasswordInput() {
    const history = useHistory();
     
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [hasPasswordErrors, setHasPasswordErrors] = useState(false)
    const [hasPasswordCheckErrors, setHasPasswordCheckErrors] = useState(false)


    const handleChangePass = (e) => {        
        setPassword(e.target.value)
    }
    
    const handleChangeRepeatPass = (e) => {        
        setRepeatPassword(e.target.value)
    }

    const handleSubmit = () =>{
        if(isPasswordValid(password) && isPasswordMatching(password, repeatPassword)){
            sessionStorage.setItem(UserProperties.password, password);
            sessionStorage.setItem(UserProperties.passwordCheck, repeatPassword);
            history.push('/summary')
        }else if(isPasswordMatching(password, repeatPassword)){
            setHasPasswordErrors(true);
        }else{
            setHasPasswordErrors(false);
            setHasPasswordCheckErrors(true)
        }
    } 

    return (
        <div>
            <BackLink data-testid="goBack" onClick={ () => history.goBack()}>Back</BackLink>
            <H1 data-testid="heading">Enter Password</H1>
            <FormGroup>
                <Label>
                    <LabelText data-testid="label-pass">Password</LabelText>
                    <HintText data-testid="hint-pass">Your password must be 10 or more characters. You can use a mix of letters, numbers or symbols.</HintText>
                    {
                        hasPasswordErrors 
                        ?
                        <ErrorText>Please provide a valid password</ErrorText>
                        :
                        ""
                    }
                    <Input data-testid="input-password" value={password} onChange={handleChangePass} type="password" />
                </Label>
                <Label>
                    <LabelText data-testid="label-re-enter-pass">Re-enter your password</LabelText>
                    <HintText data-testid="hint-re-enter-pass">Enter the same password as the one you entered above</HintText>
                    {
                        hasPasswordCheckErrors 
                        ?
                        <ErrorText>Your password should match</ErrorText>
                        :
                        ""
                    }
                    <Input data-testid="input-password-check" value={repeatPassword} onChange={handleChangeRepeatPass} type="password"/>
                </Label>
            </FormGroup>
            <Button data-testid="submit" onClick={handleSubmit}>Continue</Button>
        </div>
    )
}
