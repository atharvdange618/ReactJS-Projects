import React from 'react'
import './Link.css'

const Link = ({ url, title }) => {
    return (
        <a
            className='App-link'
            href={url}
            target='_blank'
            rel='noopener noreferrer'
        >
            {title}
        </a>
    )
}

export default Link