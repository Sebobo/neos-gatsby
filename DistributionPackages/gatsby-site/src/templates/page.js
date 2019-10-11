import React from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"
import ContentCollection from "./content-collection";
import Menu from "../components/menu";

export default (query) => {
    const {data: {neos: {node}}} = query;
    const {properties} = node;

    return (
        <Layout>
            <div>
                <h1>{properties.title}</h1>

                <h4>{node.childNodes.length} pages</h4>
                {query.pageContext.childNodes && <Menu nodes={query.pageContext.childNodes}/>}

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
                    label
                    identifier
                    nodeType {
                        name
                        isOfType(nodeType: "Neos.Neos:ContentCollection")
                    }
                    path
                    properties
                    childNodes(nodeTypeFilter: "Neos.Neos:ContentCollection,Neos.Neos:Content") {
                        label
                        identifier
                        nodeType {
                            name
                            isOfType(nodeType: "Neos.Neos:ContentCollection")
                        }
                        path
                        properties
                    }
                }
            }
        } 
    }
`;
