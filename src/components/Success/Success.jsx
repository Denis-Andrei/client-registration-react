import React from 'react'
import { Button, H3, Panel, Paragraph } from 'govuk-react'
import { UserProperties } from '../../utils/UserProperties'

export default function Success() {
    return (
        <div>
            <Panel title="Application complete">
                Your reference number<br />
                <strong>{sessionStorage.getItem(UserProperties.crn)}</strong>
            </Panel>
            <Paragraph>
                Please remember this reference number as it will be used for authentication.
            </Paragraph>
            
            <H3>What happens next</H3>

            <Paragraph>
                We’ve sent your application to Hackney Electoral Register Office.
            </Paragraph>
            <Paragraph>
                They will contact you either to confirm your registration, or to ask for more information.
            </Paragraph>
            <Paragraph>
                What did you think of this service? (takes 30 seconds)
            </Paragraph>
            
            <Button>Continue to dashboard</Button>
        </div>
    )
}
