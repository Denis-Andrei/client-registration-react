import React from 'react'
import { Table, BackLink, Button } from 'govuk-react'
import { useHistory } from 'react-router-dom';
import { UserProperties } from '../../utils/UserProperties';
import { getData } from '../../utils/Utils';


export default function Summary() {
    const history = useHistory();
    
    const objToBeSend = {
        "name": getData(UserProperties.name),
        "businessName": getData(UserProperties.businessName),
        "contactNumber": getData(UserProperties.contactNumber),
        "propertyNumber": getData(UserProperties.propertyNumber),
        "postcode": getData(UserProperties.postcode),
        "businessType": getData(UserProperties.businessType),
        "password": getData(UserProperties.password),
    }
    const requestOptions = {  
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objToBeSend),
    }
    
    const registerUser = () => {
        fetch("/clients/register", requestOptions) 
        .then((res) => {
            if(res.status === 200){
                return res.json();
            }
        })
        .then(data =>{
            sessionStorage.setItem(UserProperties.crn, data.crn)
            history.push('/success')
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser()
    }
    return (
        <div>
            <BackLink data-testid="goBack" onClick={ () => history.goBack()}>Back</BackLink>
            <Table caption="Summary">
                <Table.Row>
                    <Table.Cell data-testid="table-cell-name">Name</Table.Cell>
                    <Table.Cell>{getData(UserProperties.name)}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell data-testid="table-cell-business">Business Name</Table.Cell>
                    <Table.Cell>{getData(UserProperties.businessName)}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell data-testid="table-cell-number">Contact Number</Table.Cell>
                    <Table.Cell>{getData(UserProperties.contactNumber)}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell data-testid="table-cell-address">Address</Table.Cell>
                    <Table.Cell>{getData(UserProperties.propertyNumber)}, {getData(UserProperties.postcode)}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell data-testid="table-cell-business-type">Business Type</Table.Cell>
                    <Table.Cell>{getData(UserProperties.businessType)}</Table.Cell>
                </Table.Row>
            </Table>

            <Button data-testid="submit" onClick={handleSubmit}>Submit</Button>
        </div>
    )
}
