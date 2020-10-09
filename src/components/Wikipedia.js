import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Wikipedia(props) {
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
        <div dangerouslySetInnerHTML={{__html: result.snippet}} ></div>
        <a target="_blank" href={`https://en.wikipedia.org/?curid=${result.pageid}`}>Wikipedia</a>
    </>
}

export default Wikipedia;