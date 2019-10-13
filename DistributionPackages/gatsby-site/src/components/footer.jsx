import React from "react"
import Styles from "./layout.module.scss";
import classNames from "classnames";

export default () => {

    return (
        <footer className={Styles.pageFooter} style={{backgroundColor: '#009688'}}>
            <div className={Styles.footerCopyright}>
                <div className={Styles.container}>
                    © {new Date().getFullYear()}, Built with
                    {` `}
                    <a href="https://www.gatsbyjs.org">Gatsby</a> and <a href="https://www.neos.io">Neos CMS</a>
                </div>
            </div>
        </footer>
    )
}
