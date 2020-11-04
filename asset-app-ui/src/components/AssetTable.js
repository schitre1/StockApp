import React from 'react';
import { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import '../styles/AssetTable.css';
import Asset from './Asset';
import { mock } from '../mock';
let assetMaster = [];
let currAssetData = [];
let i = 0;
let initialData = [];
mock.subscribe(x => {
    if (x.id === 399) {
        if (i == 0) {
            initialData.push(x);
        }
        currAssetData.push(x);
        assetMaster.push(currAssetData);
        currAssetData = [];
        i++;

    } else {
        if (i == 0) {
            initialData.push(x);
        }
        currAssetData.push(x);
    }
});

const AssetTable = () => {
    const [sortByKey, setSortByKey] = useState('basic');
    const [filterByKey, setFilterByKey] = useState([]);
    const [i1, seti] = useState(0);

    const renderAssetTable = (assetData) => {
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
        const interval = setInterval(function () {
            renderAssetTable(assetMaster[i1]);
            seti(i1 + 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [i1, sortByKey, filterByKey]);

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
                {renderAssetTable(initialData)}
            </tbody>
        </table>
    )

}
export default AssetTable;