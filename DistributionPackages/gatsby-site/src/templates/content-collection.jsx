import React from "react"
import {graphql} from "gatsby"

export default ({node}) => {

    // const getData = async () => {
    //     return graphql(`
    //         query {
    //             neos {
    //                 node(identifier: ${node.identifier}) {
    //                     label
    //                     identifier
    //                     childNodes(nodeTypeFilter: "Neos.Neos:ContentCollection,Neos.Neos:Content") {
    //                         label
    //                         identifier
    //                         nodeType {
    //                             name
    //                         }
    //                         path
    //                         properties
    //                     }
    //                 }
    //             }
    //         }
    //     `);
    // };
    //
    // const data = await getData();
    //
    // console.log(node);

    return (
        <div className="content-collection">
            Collection: {node.label}
            {node.childNodes.map(contentNode => contentNode.nodeType.isOfType ? (
                <div key={contentNode.identifier} className="content-collection">Collection: {contentNode.nodeType.name}</div>
            ) : (
                <div key={contentNode.identifier} className="content">Content: {contentNode.label}</div>
            ))}
        </div>
    )
}

