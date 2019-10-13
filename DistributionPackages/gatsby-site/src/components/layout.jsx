import React from "react"
// import {useStaticQuery, graphql} from "gatsby"

import Header from "./header"
import Footer from "./footer"
import Styles from "./layout.module.scss"

const Layout = ({pageContext, children}) => {
    // const data = useStaticQuery(graphql`
    //     query SiteTitleQuery {
    //         site {
    //             siteMetadata {
    //               title
    //             }
    //         }
    //     }
    // `);

    return (
        <>
            <Header pageContext={pageContext}/>
            <main className={Styles.container}>{children}</main>
            <Footer/>
        </>
    )
};

export default Layout
