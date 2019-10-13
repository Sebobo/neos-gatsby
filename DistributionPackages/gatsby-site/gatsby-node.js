const path = require(`path`);
const pageTemplate = path.resolve(`./src/templates/page.jsx`);

exports.onCreateNode = async ({node, getNode, actions}) => {
    const {createParentChildLink} = actions;

    if (node.internal.type === 'SitePage') {
        if (node.context && node.context.childNodes && node.context.childNodes.length) {
            node.context.childNodes.forEach((childNode) => {
                const childNodeInstance = getNode(node.internal.type + ' ' + childNode.path);

                if (childNodeInstance) {
                    childNodeInstance.parent = node.id;
                    createParentChildLink({
                        child: childNodeInstance,
                        parent: node,
                    });
                } else {
                    console.error(childNodeInstance.path, 'Child relation should be set, but could not find child node');
                }
            });
        }
    }
};

const createNeosPage = async (graphql, createPage, pageNode, parentPath, pagePath) => {
    const {data: {neos: {node: {childNodes}}}} = await graphql(`
        query {
            neos {
                node(identifier: "${pageNode.identifier}") {
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
        return createNeosPage(
            graphql,
            createPage,
            childNode,
            pagePath,
            pagePath + childNode.properties.uriPathSegment + '/',
        );
    })).then((childNodesResult) => {
        createPage({
            path: pagePath,
            component: pageTemplate,
            context: {
                documentNodeIdentifier: pageNode.identifier,
                childNodes: childNodesResult,
                properties: pageNode.properties,
                parentPath,
            }
        });
        return childNodesResult;
    });

    return {
        ...pageNode,
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

    return createNeosPage(graphql, createPage, node, '', '/');
};
