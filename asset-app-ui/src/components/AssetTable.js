import React from 'react';
import { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import '../styles/AssetTable.css';
import Asset from './Asset';
import { mock } from '../mock';

const AssetTable = () => {

    const [assetData, setAssetData] = useState([]);
    const [sortByKey, setSortByKey] = useState('basic');
    const [filterByKey, setFilterByKey] = useState([]);
    let i = 0;
    let currAssetData = [];
    mock.subscribe(x => {
        if (x.id === 399) {
            console.log(JSON.stringify(x));
            currAssetData[399] = x;
            console.log('Setting state assetdata provider, i is: ', ++i);
            setAssetData(currAssetData);
        } else {
            currAssetData[x.id] = x;
        }
    });

    const renderAssetTable = () => {
        let assetDataModified = assetData;
        if (assetData && assetData.length > 0 && sortByKey !== 'basic') {
            if (filterByKey.length === 2) {
                assetDataModified = assetDataModified.filter(x => x[filterByKey[0]] === filterByKey[1]);
            }
            assetDataModified = sortBy(assetDataModified, o => o[sortByKey]);
        }
        let AssetEntryAll = assetDataModified && assetDataModified.length > 0 && assetDataModified.map((assetEntry) => {
            return <Asset key={assetEntry.id} assetDetails={assetEntry} />
        })
        return AssetEntryAll;

    };

    useEffect(() => {
        renderAssetTable(assetData);
    }, [assetData, sortByKey, filterByKey]);

    if (!assetData || assetData.length <= 0) {
        return <p>Loading...</p>
    }
    else {
        return (
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>ID <span className="sorting" onClick={() => setSortByKey('id')}>(Sort)</span></th>
                        <th>Asset Name <span className="sorting" onClick={() => setSortByKey('assetName')}>(Sort)</span></th>
                        <th>Price <span className="sorting" onClick={() => setSortByKey('price')}>(Sort)</span></th>
                        <th>Last Updated</th>
                        <th>Type <span className="sorting" onClick={() => setSortByKey('type')}>(Sort)</span> &nbsp; <span className="filtering" onClick={() => setFilterByKey(['type', 'Currency'])}>(Filter -Currency)</span> &nbsp; <span className="filtering" onClick={() => setFilterByKey([])}>(Clear Filter)</span></th>
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