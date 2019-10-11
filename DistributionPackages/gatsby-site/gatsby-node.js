const path = require(`path`);

// exports.onCreateNode = async ({node, getNode, actions}) => {
//     const {createNodeField} = actions;
//
//     if (node.internal.type === 'SitePage') {
//         // createNodeField({
//         //     node,
//         //     name: `slug`,
//         //     value: node.properties.uriPathSegment,
//         // });
//         console.log(node.context, 'new neos node');
//     }
// };

const getChildNodeData = async (graphql, createPage, parentNode, pagePath) => {
    const {data: {neos: {node: {childNodes}}}} = await graphql(`
        query {
            neos {
                node(identifier: "${parentNode.identifier}") {
                    label
                    properties
                    identifier
                    childNodes(nodeTypeFilter: "Neos.Neos:Document") {
                        label
                        identifier
                        properties
                    }
                }
            }
        }
    `);

    let childNodeData = [];
    const childNodeResult = await Promise.all(childNodes.map((childNode) =>
        return getChildNodeData(
            graphql, createPage, childNode, pagePath + '/' + childNode.properties.uriPathSegment
        );
    ));

    createPage({
        path: pagePath || parentNode.properties.uriPathSegment,
        component: path.resolve(`./src/templates/page.js`),
        context: {
            documentNodeIdentifier: parentNode.identifier,
            childNodes: childNodeData,
        },
    });

    console.log(childNodeResult);

    return childNodeData;
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

    // data.neos.node.childNodes.forEach((documentNode) => {
    //     pages.push(getChildNodeData(graphql, createPage, documentNode));
    // });

    return Promise.all(pages);
};
