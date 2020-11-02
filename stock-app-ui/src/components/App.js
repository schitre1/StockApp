import React from 'react';
import AssetTable from './AssetTable';

const App = () => {
  return (
    <>
      <h2 className="display-4">Stock App</h2>
      <div className="container-fluid">
        <div>
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <AssetTable />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </>
  );
}
export default App;