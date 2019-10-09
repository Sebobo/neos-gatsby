import React from "react"
import {Link} from "gatsby"
import {graphql} from 'gatsby'

import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

export default ({data}) => {
    const {node} = data.neos;
    console.log(node);
    return (
        <Layout>
            <div>
                <h1>
                    Amazing Pandas Eating Things
                </h1>
                <h4>{node.childNodes.length} pages</h4>
                {node.childNodes.map((childNode) => (
                    <div key={childNode.identifier}>
                        <Link to={childNode.properties.uriPathSegment}>
                            <h3>
                                {childNode.properties.title}
                            </h3>
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    )
};

export const query = graphql`
  query {
    neos {
      node(path: "/sites/neosdemo") {
        childNodes(nodeTypeFilter: "Neos.Neos:Document") {
            identifier
            label
            properties
        }
      }
    }
  }
`;
