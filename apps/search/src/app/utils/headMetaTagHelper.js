import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from 'prop-types'
import config from '../config'

const titleLimit = 65
const descriptionLimit = 300

const pageTitleLimit = ( title ) => {
    return title ? title.substring(0, titleLimit) : ''
}

const pageDescriptionLimit = ( desc ) => {
    return desc ? desc.substring(0, descriptionLimit) : ''
}

const MetaTags = ( props ) => {
    return (
        <Helmet
            htmlAttributes={{
          lang: 'en'
        }}
        title={ pageTitleLimit(props.title) }
        meta={getMetaTags({...props})}
        >
        </Helmet>
    )
}
    
const getMetaTags = ( props ) => {
    const pageTitle = pageTitleLimit(props.title)
    const pageDescription = pageDescriptionLimit(props.desc)
    const {
        twitter,
        author,
        imageUrl,
        contentType,
    } = props
    const url = props.path ? `${config.baseURL}${props.path}` : config.baseURL
    const Tags = [
        { name: 'description', content: pageDescription },
        // Service Worker { name: 'theme-color', content: '#000' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
        { itemprop: 'name', content: pageTitle },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:site_name', content: 'coachlist' },
        { property: 'twitter:site', content: twitter || '@coachlist'},
        { property: 'twitter:title', content: pageTitle },
        { property: 'twitter:description', content: pageDescription },
        { property: 'og:url', content: url },
        { property: 'og:title', content: pageTitle },
        { property: 'og:type', content: contentType || 'website'},
        { property: 'og:description', content: pageDescription },
        { proptery: 'og:site_name', content: 'coachlist' },
        // Facebook ID { property: 'fb:app_id', content: '' }
    ]
    if ( author ) {
        Tags.push({ property: 'twitter:creator', content: author })
    }
    if ( props.imageUrl ) {
        Tags.push({ property: 'og:image', content: imageUrl || '' })
        Tags.push({ property: 'twitter:image:src', content: imageUrl || '' })
    }
    if ( props.images ) {
        props.images.map( r => { 
            if ( r )
                return Tags.push({ property: 'og:image', content: r })
        })
    }
    
    if (props && props.published) Tags.push({ property: 'article:published_time', content: props.published })
    if (props && props.updated) Tags.push({ property: 'article:modified_time', content: props.updated })
    if (props && props.category) Tags.push({ property: 'article:section', content: props.category })
    if (props && props.tags) Tags.push({ property: 'article:tag', content: props.tags })
    
    return Tags
}

MetaTags.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    twitter: PropTypes.string,
    author: PropTypes.string,
    imageUrl: PropTypes.string,
    contentType: PropTypes.string,
    url: PropTypes.string,
    published: PropTypes.string,
    updated: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.string,
    siteName: PropTypes.string,
    canonical: PropTypes.string
}

export default MetaTags