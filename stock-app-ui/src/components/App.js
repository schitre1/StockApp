import React from 'react';
import AssetTable from './AssetTable';

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <h2 className="display-4">Stock App</h2>
          <AssetTable />
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
}
export default App;