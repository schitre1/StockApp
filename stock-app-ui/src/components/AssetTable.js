import React from 'react';
import { useState, useEffect } from 'react';
import Asset from './Asset';
import { mock } from '../mock';

const AssetTable = () => {
    const [assetData, setAssetData] = useState([]);
    mock.subscribe({
        next(x) {
            if (assetData && assetData.length >= 0) {
                let currentAssetIfExists = assetData.findIndex((eachAsset) => {
                    return eachAsset.assetName === x.assetName;
                });
                if (currentAssetIfExists >= 0) {
                    setAssetData(assetData.map((item, index) => item.assetName === x.assetName ? x : item));
                } else {
                    setAssetData(assetData.push(x));
                }
            }
        },
        error(err) { console.error('Error occurred: ' + err); },
        complete() { console.log('Done'); }
    });


    const renderAssetTable = () => {
        let AssetEntryAll = assetData && assetData.length > 0 && assetData.map((assetEntry) => {
            return <Asset assetDetails={assetEntry} />
        })
        return AssetEntryAll;
    };

    useEffect(() => {
        if (assetData) {
            renderAssetTable(assetData);
        } else {
            return <p> Cannot display asset data</p>
        }
    }, [assetData]);

    if (!assetData || assetData.length <= 0) {
        return <p>Loading...</p>
    } else {
        return (
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Asset Name</th>
                        <th>Price</th>
                        <th>Last Updated</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {renderAssetTable()}
                </tbody>
            </table>
        )
    }
}
export default AssetTable;