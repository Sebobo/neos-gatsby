const path = require(`path`);
const pageTemplate = path.resolve(`./src/templates/page.js`);

const getChildNodeData = async (graphql, createPage, parentNode, pagePath) => {
    const {data: {neos: {node: {childNodes}}}} = await graphql(`
        query {
            neos {
                node(identifier: "${parentNode.identifier}") {
                    childNodes(nodeTypeFilter: "Neos.Neos:Document") {
                        label
                        identifier
                        properties
                    }
                }
            }
        }
    `);

    const childNodeResult = await Promise.all(childNodes.map((childNode) => {
        return getChildNodeData(
            graphql, createPage, childNode, pagePath + childNode.properties.uriPathSegment + '/'
        );
    })).then((childNodesResult) => {
        createPage({
            path: pagePath,
            component: pageTemplate,
            context: {
                documentNodeIdentifier: parentNode.identifier,
                childNodes: childNodesResult,
            },
        });
        return childNodesResult;
    });

    return {
        ...parentNode,
        path: pagePath,
        childNodes: childNodeResult
    };
};

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;
    const {data: {neos: {node}}} = await graphql(`
        query {
            neos {
                node(path: "/sites/neosdemo") {
                    label
                    properties
                    identifier 
                }
            }
        }
    `);

    let pages = [];

    pages.push(getChildNodeData(graphql, createPage, node, '/'));

    return Promise.all(pages);
};
