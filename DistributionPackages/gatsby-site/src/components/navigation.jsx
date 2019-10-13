import React from "react";
import {Link} from "gatsby";
import Styles from "./layout.module.scss";
import classNames from "classnames";

const ItemList = ({nodes, itemClassName = null}) => {
    return nodes.map(node => (
        <li key={node.identifier} className={itemClassName}>
            <Link to={node.path}
                  activeClassName={Styles.active}
                  activeStyle={{fontWeight: 'bold'}}
                  style={{color: '#444'}}>{node.properties.title}</Link>
        </li>
    ));
};

export default ({pageContext, nodes}) => {
    // Check if we are at the third menu level and show second level menu entries
    // TODO: Make this smarter
    let secondLevelChildren = pageContext.childNodes;
    if (!pageContext.parentPath) {
        secondLevelChildren = null;
    } else if (pageContext.parentPath !== '/') {
        const firstLevelPath = '/' + pageContext.parentPath.split('/')[1] + '/';
        secondLevelChildren = nodes.filter((node) => node.path === firstLevelPath)[0].childNodes;
    }

    return (
        <nav role="navigation"
             className={classNames(pageContext.childNodes ? Styles.navExtended : null)}
             style={{backgroundColor: 'white', color: '#444'}}>
            <div className={classNames(Styles.navWrapper, Styles.container)}>
                <Link to="/" id="logo-container" className={Styles.brandLogo} style={{color: '#444'}}>Logo</Link>

                <ul className={classNames(Styles.right, Styles.hideOnMedAndDown)}>
                    <ItemList nodes={nodes}/>
                </ul>

                <ul id="nav-mobile" className={Styles.sidenav} style={{transform: 'translateX(-105%)'}}>
                    <ItemList nodes={nodes}/>
                </ul>

                <a href="#" data-target="nav-mobile" className={Styles.sidenavTrigger}>
                    <i className="material-icons">menu</i>
                </a>
            </div>

            {secondLevelChildren && secondLevelChildren.length > 0 && (
                <div className={classNames(Styles.navContent, Styles.container)}>
                    <ul className={Styles.tabs}>
                        <ItemList nodes={secondLevelChildren} itemClassName={Styles.tab}/>
                    </ul>
                </div>
            )}
        </nav>
    )
}
