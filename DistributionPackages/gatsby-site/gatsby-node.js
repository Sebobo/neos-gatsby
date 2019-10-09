const path = require(`path`);

// exports.onCreateNode = ({node, getNode, actions}) => {
//     const {createNodeField} = actions;
//     console.log(node.internal.type);
//     if (node.internal.type === `NeosCMS`) {
//         console.log(node, 'new neos node');
//         createNodeField({
//             node,
//             name: `slug`,
//             value: node.uriPathSegment,
//         })
//     }
// };

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;
    const result = await graphql(`
        query {
            neos {
                node(path: "/sites/neosdemo") {
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

    result.data.neos.node.childNodes.forEach((node) => {
        createPage({
            path: node.properties.uriPathSegment,
            component: path.resolve(`./src/templates/page.js`),
            context: {
                nodeIdentifier: node.identifier,
            },
        })
    })
};
