import {graphql} from "gatsby";

export const nodeFragment = graphql`
    fragment NodeFragment on NeosCMS_Node {
        label
        identifier
        nodeType {
            name
            isContentCollection: isOfType(nodeType: "Neos.Neos:ContentCollection")
            isDocument: isOfType(nodeType: "Neos.Neos:Document")
            isShortcut: isOfType(nodeType: "Neos.Neos:Shortcut")
        }
        path
        properties
    }
`;
