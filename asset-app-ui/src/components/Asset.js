import React from 'react';

const Asset = ({ assetDetails }) => {
    let { id, assetName, price, lastUpdate, type } = assetDetails;
    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{assetName}</td>
            <td>{price}</td>
            <td>{lastUpdate}</td>
            <td>{type}</td>
        </tr>
    );
}
export default Asset;