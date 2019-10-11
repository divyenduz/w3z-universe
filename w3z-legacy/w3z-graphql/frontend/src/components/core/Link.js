import React, { Component } from "react";
import { gql, graphql, compose } from "react-apollo";

class Link extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null,
            redirectUrl: null
        };
    }
    render() {
        const { link } = this.props;

        if (this.state.status === 404) {
            return (
                <div style={styles.w3z_link_wrapper}>
                    404 -
                    <span>
                        &nbsp;{`${process.env.REACT_APP_SITE_URL}/${link}`}
                    </span>
                </div>
            );
        }

        const existingLink = this.props.findLinkQuery.refetch({
            convertedUrl: link
        });

        existingLink
            .then(existingLink => {
                if (existingLink.data.Link) {
                    window.location.href = existingLink.data.Link.url;
                    this.setState({
                        redirectUrl: existingLink.data.Link.url
                    });
                } else {
                    this.setState({ status: 404 });
                }
            })
            .catch(err => {
                console.log(err);
            });

        if (this.state.redirectUrl) {
            return (
                <div style={styles.w3z_link_wrapper}>
                    Redirecting to
                    <span style={styles.w3z_info_link}>
                        &nbsp;{`${this.state.redirectUrl}`}
                    </span>
                </div>
            );
        }

        return (
            <div style={styles.w3z_link_wrapper}>
                Finding redirect URL for
                <span style={styles.w3z_info_link}>&nbsp;{`${link}`}</span>
            </div>
        );
    }
}

const styles = {
    w3z_link_wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    },
    w3z_info_link: {
        color: "darkblue",
        textDecoration: "none",
        fontWeight: "bold"
    }
};

const FIND_LINK_QUERY = gql`
    query FindLinkQuery($convertedUrl: String!) {
        Link(convertedUrl: $convertedUrl) {
            id
            url
            convertedUrl
        }
    }
`;

export default compose(
    graphql(FIND_LINK_QUERY, {
        options: {
            variables: { convertedUrl: "" }
        },
        name: "findLinkQuery"
    })
)(Link);
