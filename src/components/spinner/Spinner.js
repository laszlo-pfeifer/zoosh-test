import React from 'react';
import './Spinner.css';

import CircularProgress from '@material-ui/core/CircularProgress';

function Spinner(props) {
    return <div className="spinner-container">
        <CircularProgress />
    </div>
}

export default Spinner;