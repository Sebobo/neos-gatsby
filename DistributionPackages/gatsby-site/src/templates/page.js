import React from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"

export default ({data}) => {
    const {node} = data.neos;
    console.log(node);
    const {properties} = node;
    return (
        <Layout>
            <div>
                <h1>{properties.title}</h1>
                <div dangerouslySetInnerHTML={{__html: properties.title}}/>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query($nodeIdentifier: NeosCMS_UUID!) {
        neos {
            node(identifier: $nodeIdentifier) {
                identifier
                label
                properties
            }
        }
    }
`;
