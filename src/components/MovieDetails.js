import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    link: {
      marginRight: '1rem',
    },
    typography: {
      marginBottom: '2rem'
    }
}));

function MovieDetails(props) {
    const classes = useStyles();
    const [result, setResult] = useState({})
    useEffect(() => {
        const searchWikipedia = async () => {
            const response = await axios.get(`w/api.php?action=query&list=search&srsearch=${props.term}&format=json`)
            console.table(response.data.query.search)
            setResult(response.data.query.search[0])
        }
        searchWikipedia()
    }, [props.term])
    return <>
        <Typography className={classes.typography} >
            <div dangerouslySetInnerHTML={{__html: result.snippet}} ></div>
        </Typography>
        <div>
            <Link className={classes.link} rel="noopener" target="_blank" href={`https://www.imdb.com/title/${props.imdb}`}>Imdb</Link>
            <Link className={classes.link} rel="noopener" target="_blank" href={`https://en.wikipedia.org/?curid=${result.pageid}`}>Wikipedia</Link>
        </div>
    </>
}

export default MovieDetails;