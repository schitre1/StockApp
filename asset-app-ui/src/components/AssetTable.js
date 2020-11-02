import React from 'react';
import { useState, useEffect } from 'react';
import Asset from './Asset';
import { mock } from '../mock';
import { sortBy } from 'lodash';
import '../styles/AssetTable.css';

const AssetTable = () => {
    const [assetData, setAssetData] = useState([]);
    const [sortByKey, setSortByKey] = useState('basic');
    const [filterByKey, setFilterByKey] = useState([]);

    mock.subscribe(x => {
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
    }, [assetData, sortByKey, filterByKey]);

    if (!assetData || assetData.length <= 0) {
        return <p>Loading...</p>
    } else {
        return (
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>ID <span className="sorting" onClick={() => setSortByKey('id')}>(Sort)</span></th>
                        <th>Asset Name <span className="sorting" onClick={() => setSortByKey('assetName')}>(Sort)</span></th>
                        <th>Price <span className="sorting" onClick={() => setSortByKey('price')}>(Sort)</span></th>
                        <th>Last Updated</th>
                        <th>Type <span className="sorting" onClick={() => setSortByKey('type')}>(Sort)</span> &nbsp; <span className="filtering" onClick={() => setFilterByKey(['type', 'Currency'])}>(Filter -Curr)</span> &nbsp; <span className="filtering" onClick={() => setFilterByKey([])}>(Clear Filter)</span></th>
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