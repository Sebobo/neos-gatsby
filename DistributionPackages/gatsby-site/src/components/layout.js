import React from "react"
import {useStaticQuery, graphql} from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({documentNode, children}) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                  title
                }
            }
        }
    `);

    return (
        <>
            <Header pageTitle={documentNode.properties.title}/>
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `0px 1.0875rem 1.45rem`,
                    paddingTop: 0,
                }}
            >
                <main>{children}</main>
                <footer>
                    © {new Date().getFullYear()}, Built with
                    {` `}
                    <a href="https://www.gatsbyjs.org">Gatsby</a>
                </footer>
            </div>
        </>
    )
};

export default Layout
