import React, { useState } from 'react';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { useLazyQuery } from '@apollo/client';
import MovieList from './components/MovieList';
import Spinner from './components/Spinner';

import { SEARCH_MOVIES } from './queries/search'

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1024px',
    margin: 'auto'
  },
  header: {
      marginTop: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  },
  list: {
      listStyleType: 'none',
      paddingLeft: 0,
  },
  input: {
      marginRight: '1rem',
  },
  loadMore: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '4rem',
  }
}));

function App() {
  const classes = useStyles();
  const [term, setTerm] = useState('');

  const [searchMovies, { loading, error, data, fetchMore, refetch }] = useLazyQuery(SEARCH_MOVIES);
  if (error) return <p>Error :( <br/> {JSON.stringify(error)}</p>;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      search()
    }
  }

  const search = () => {
    if (term.length > 0) {
      if (refetch) {
        refetch({term})
      } else {
        searchMovies({ variables: {term}})
      }
    }
  }

  const loadMore = () => {
    fetchMore({
      variables: {
        cursor: data.movies.search.pageInfo.endCursor
      }
    })
  }

  return <div>
    {loading && <Spinner />}
    <div className={classes.container}>
      <div className={classes.header}>
        <TextField className={classes.input} onChange={e => setTerm(e.target.value)} value={term} onKeyDown={handleKeyDown} label="Title" variant="outlined" />
        <Button variant="contained" color="primary" onClick={search} >Search</Button>
      </div>
      {
        data && <>
          <MovieList items={data.movies.search} loadMore={loadMore} />
        </>
      }
    </div>
  </div>
}

export default App;
