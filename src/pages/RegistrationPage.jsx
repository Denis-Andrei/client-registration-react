import { Main, GridRow, GridCol} from 'govuk-react';
import React from 'react';

export default function RegistrationPage ({children}) {

    return(
        <Main>
            <GridRow>
                <GridCol data-testid="content" setWidth="two-thirds" >
                    {children}
                </GridCol>
            </GridRow>
        </Main>
    )
}
