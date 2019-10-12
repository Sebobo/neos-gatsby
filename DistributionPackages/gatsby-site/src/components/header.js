import React from "react"
import {useStaticQuery, graphql} from "gatsby"
import Menu from "../components/menu";

export default ({pageTitle}) => {
    let {allSitePage: {edges}} = useStaticQuery(graphql`
        query HeaderQuery {
            allSitePage {
                edges {
                    node {
                        id
                        path
                        context {
                            documentNodeIdentifier
                            properties {
                                title
                            }
                        }
                        parent {
                            id
                        }
                        children {
                            id
                        }
                    }
                }
            }
        }    
    `);

    // Find root page
    const rootPage = edges.filter(({node}) => node.path === '/')[0];

    // Recursive method to order all children
    const orderChildren = ({node}) => {
        node.identifier = node.context.documentNodeIdentifier;
        node.properties = node.context.properties;
        node.childNodes = node.children.map(({id}) => {
            let childNode = edges.filter(({node}) => node.id === id)[0];
            if (childNode) {
                edges = edges.filter(({node}) => node.id !== id);
                return orderChildren(childNode);
            }
        });
        return node;
    };

    // Build page tree
    const pageTree = orderChildren(rootPage);

    return (
        <header>
            <div style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `1.45rem 1.0875rem`,
                }}>
                <h1>{pageTitle}</h1>
                <Menu nodes={pageTree.childNodes}/>
            </div>
        </header>
    )
}
