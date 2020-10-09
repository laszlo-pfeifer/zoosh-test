import React, { useState } from 'react';
import './App.css';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { useLazyQuery, gql } from '@apollo/client';
import Movie from './components/Movie';
import Person from './components/Person';
import Tv from './components/Tv';
import Spinner from './components/spinner/Spinner';

const SEARCH_MOVIES = gql`
  query SearchMovies($term: String!, $cursor: String) {
    movies {
      search(term: $term, first: 10, after: $cursor) {
        totalCount,
        pageInfo {
          endCursor,
          hasNextPage,
          hasPreviousPage,
          startCursor
        },
        edges {
          node {
            title,
            externalIds {
              imdb
            }
          }
        }
      }
    }
  }
`;

function App() {
  const [term, setTerm] = useState('');

  const [searchMovies, { loading, error, data, fetchMore, refetch }] = useLazyQuery(SEARCH_MOVIES);
  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( <br/> {JSON.stringify(error)}</p>;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      search()
    }
  }

  const search = () => {
    if (term.length > 0) {
      console.log('search', term)
      console.log('refetch', refetch)
      refetch ? refetch({ variables: {term}}) : searchMovies({ variables: {term}})
    }
  }

  const getProperResult = (item) => {
    console.log(item)
    switch (item.__typename) {
      case '__Movie':
        return <Movie item={item}/>
      case 'PersonListResult':
        return <Person item={item} />
      case 'TVShowResult':
        return <Tv item={item} />
      default:
        return <></>
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
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid style={{marginTop: '2rem'}} item align="center"  xs={12}>
        <TextField onChange={e => setTerm(e.target.value)} onKeyDown={handleKeyDown}  id="outlined-basic" label="Outlined" variant="outlined" />
        <Button variant="contained" color="primary" onClick={search} >Search</Button>
      </Grid>
      <Grid item xs={12}>
        {
          data && <>
            <p>{data.movies.search.totalCount}</p>
            <ul style={{listStyleType: 'none'}}>
              {data.movies.search.edges.map(edge => {
                return <li>
                  {getProperResult(edge.node)}
                  {/* <Movie />{edge.node.__typename} - {edge.node.title ? edge.node.title : edge.node.name} */}
                  </li>
              })}
            </ul>
            {data.movies.search.pageInfo.hasNextPage && <Button onClick={loadMore}>load more...</Button>}
          </>
        }
      </Grid>
    </Grid>
  </div>
}

export default App;
