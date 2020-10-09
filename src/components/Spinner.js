import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    spinner: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

function Spinner(props) {
    const classes = useStyles();
    return <div className={classes.spinner}>
        <CircularProgress />
    </div>
}

export default Spinner;