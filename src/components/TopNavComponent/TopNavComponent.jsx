import React from 'react'
import { PhaseBanner, TopNav } from 'govuk-react';
import Main  from '@govuk-react/main';
import CrownIcon from '@govuk-react/icon-crown';
import styled from 'styled-components';

const HeaderMain = styled(Main)({
    paddingTop: 0
});

export default function TopNavComponent() {
 
    const Company = (
    <TopNav.Anchor href="#" target="new">
        <TopNav.IconTitle icon={<CrownIcon width="36" height="32" />}>GOV.UK</TopNav.IconTitle>
    </TopNav.Anchor>
    );

    const ServiceTitle = (
    <TopNav.NavLink data-testid="service-title" href={"#"} target="new">
        Client Service
    </TopNav.NavLink> 
    );

    return (
        <div>
            <TopNav company={Company} serviceTitle={ServiceTitle} />
            <HeaderMain>
                <PhaseBanner data-testid="banner" level="alpha"> 
                    This is an initial implementation of GOVUK-React
                </PhaseBanner>
            </HeaderMain>
        </div>
    )
}
