import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Movie from './Movie';

const useStyles = makeStyles((theme) => ({
    list: {
        listStyleType: 'none',
        paddingLeft: 0,
    },
    loadMore: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '4rem',
    }
}));

function MovieList(props) {
    const classes = useStyles();
    return <div>
            <ul className={classes.list}>
            {props.items.edges.map(edge => {
              return <li>
                  <Movie item={edge.node}/>
                </li>
            })}
          </ul>
          {props.items.pageInfo.hasNextPage && 
            <div className={classes.loadMore} >
              <Button onClick={props.loadMore}>load more...</Button>
            </div>}
    </div>
}

export default MovieList;