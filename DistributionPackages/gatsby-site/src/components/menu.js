import {Link} from "gatsby";
import React from "react";

const ItemList = ({nodes}) => {
    console.log(nodes, 'itemlist nodes');
    return (
        <div>
            {nodes.map((node) => (
                <div key={node.identifier}>
                    <Link to={node.properties.uriPathSegment}>
                        <h3>
                            {node.properties.title}
                        </h3>
                    </Link>
                    {node.childNodes && <ItemList nodes={node.childNodes}/>}
                </div>
            ))}
        </div>
    )
};

export default ({nodes}) => {
    return <ItemList nodes={nodes}/>
}
