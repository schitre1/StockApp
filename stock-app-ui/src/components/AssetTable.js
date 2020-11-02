import React from 'react';
import { useState, useEffect } from 'react';
import { timer } from 'rxjs';
import Asset from './Asset';
import { mock } from '../mock';

const AssetTable = () => {
    const [assetData, setAssetData] = useState([]);
    mock.subscribe({
        next(x) {
            if (assetData && assetData.length >= 0) {
                console.log('AssetData is: ' + JSON.stringify(assetData));
                let currentAssetIfExists = assetData.findIndex((eachAsset) => {
                    return eachAsset.assetName === x.assetName;
                });
                if (currentAssetIfExists >= 0) {
                    setAssetData(assetData.map((item, index) => item.assetName === x.assetName ? x : item));
                } else {
                    setAssetData([...assetData, x]);
                }
            }
        },
        error(err) { console.error('something wrong occurred: ' + err); },
        complete() { console.log('done'); }
    });


    const renderAssetTable = () => {
        console.log('asset data in render' + JSON.stringify(assetData));
        let AssetEntryAll = assetData && assetData.length > 0 && assetData.map((assetEntry) => {
            return <Asset assetDetails={assetEntry} />
        })
        return AssetEntryAll;
    };

    useEffect(() => {
        console.log('useEffect called just now');
        console.log('in useEffect Asset data is:' + JSON.stringify(assetData));
        if (assetData) {
            console.log('useEffect tryin to render table' + JSON.stringify(assetData));
            renderAssetTable(assetData);
        } else {
            console.log('cant display asset data in useEffect');
            return <p> Cannot display asset data</p>
        }
    }, [assetData]);
    console.log('just after subscribe');

    if (!assetData || assetData.length <= 0) {
        return <p>Loading...</p>
    } else {
        console.log('In main render assetData is: ', JSON.stringify(assetData));
        return (
            <div>
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
            </div>
        )
    }
}
export default AssetTable;