import React from 'react';
import dayjs from 'dayjs'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';

import MovieDetails from './MovieDetails'

const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: '1rem'
    },
    header: {
        cursor: 'pointer'
    }
}));

function Movie(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    return <div>
        <Card className={classes.card}>
            <CardHeader
                className={classes.header}
                title={`${props.item.title} (${props.item.rating}/10)`}
                subheader={`${dayjs(props.item.releaseDate).format('YYYY MM DD')} - ${props.item.keywords.slice(1, 4).map(k => k.name).join(', ')}`}
                onClick={() => {setExpanded(!expanded)}}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <MovieDetails term={`${props.item.title}`} imdb={props.item.externalIds.imdb} />
                </CardContent>
            </Collapse>
        </Card>
    </div>
}

export default Movie;