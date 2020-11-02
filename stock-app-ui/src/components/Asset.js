import React from 'react';

const Asset = ({ assetDetails }) => {
    let { id, assetName, price, lastUpdate, type } = assetDetails;
    console.log('In Asset asset details' + id, assetName)
    return (
        <tr>
            <td>{id}</td>
            <td>{assetName}</td>
            <td>{price}</td>
            <td>{lastUpdate}</td>
            <td>{type}</td>
        </tr>
    );
}
export default Asset;