import {Link} from "gatsby";
import React from "react";

const ItemList = ({nodes}) => {
    return (
        <ul>
            {nodes.map(node => (
                <li key={node.identifier}>
                    <Link to={node.path}>
                        <h3>
                            {node.properties.title}
                        </h3>
                    </Link>
                    {node.childNodes && <ItemList nodes={node.childNodes}/>}
                </li>
            ))}
        </ul>
    )
};

export default ({nodes}) => {
    return (
        <nav className="menu">
            <ItemList nodes={nodes}/>
        </nav>
    )
}
