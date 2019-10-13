import React from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"
import ContentCollection from "./content-collection";

import "materialize-css/dist/js/materialize.min";

export default (query) => {
    const {data: {neos: {node}}, pageContext} = query;
    const {properties} = node;

    return (
        <Layout pageContext={pageContext}>
            <div>
                <h1>{properties.title}</h1>

                {node.childNodes.map(contentNode => contentNode.nodeType.isOfType ? (
                    <ContentCollection key={contentNode.identifier} node={contentNode}/>
                ) : (
                    <div key={contentNode.identifier} className="content">Content: {contentNode.label}</div>
                ))}

                <div dangerouslySetInnerHTML={{__html: properties.title}}/>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query($documentNodeIdentifier: NeosCMS_UUID!) {
        neos {
            node(identifier: $documentNodeIdentifier) {
                label
                identifier
                properties
                childNodes(nodeTypeFilter: "Neos.Neos:ContentCollection,Neos.Neos:Content") {
                    ...NodeFragment
                    childNodes(nodeTypeFilter: "Neos.Neos:ContentCollection,Neos.Neos:Content") {
                        ...NodeFragment
                    }
                }
            }
        } 
    }
`;
