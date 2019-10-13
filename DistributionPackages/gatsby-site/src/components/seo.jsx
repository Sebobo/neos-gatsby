import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import {useStaticQuery, graphql} from "gatsby"

export default ({description, lang, meta, title}) => {
    const defaultProps = {
        lang: `en`,
        meta: [],
        description: ``,
    };

    const propTypes = {
        description: PropTypes.string,
        lang: PropTypes.string,
        meta: PropTypes.arrayOf(PropTypes.object),
        title: PropTypes.string.isRequired,
    };

    const site = useStaticQuery(
        graphql`
            query {
                neos {
                    node(path: "/sites/neosdemo") {
                        properties
                    }
                }     
            }
        `
    );

    const metaDescription = description || site.neos.node.properties.description;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
            ].concat(meta)}
        />
    )
}
