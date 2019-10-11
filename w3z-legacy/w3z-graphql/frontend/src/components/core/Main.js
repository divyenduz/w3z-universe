import React, { Component } from "react";
import ValidURL from "valid-url";
import { gql, graphql, compose } from "react-apollo";

import Logo from "./Logo";
import Form from "./Form/Form";
import { BUTTON_STATE } from "./Form/Button";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            convertedUrl: null,
            error: "",
            buttonState: BUTTON_STATE.NORMAL
        };

        this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
        this.handleShortenButtonClick = this.handleShortenButtonClick.bind(
            this
        );
    }

    handleResetButtonClick() {
        this.setState({ convertedUrl: null });
    }

    async handleShortenButtonClick(link) {
        this.setState({
            buttonState: BUTTON_STATE.LOADING
        });
        if (link.trim() === "") {
            alert("Please enter a valid URL");
            return;
        }

        // If link is invalid, try to make it valid
        if (!ValidURL.isUri(link)) {
            link = "http://" + link;
        }

        // If we were able to make the link valid
        if (!ValidURL.isUri(link)) {
            alert("Please enter a valid URL");
            return;
        }

        const url = link;
        if (this.props.findLinkQuery.error) {
            this.setState({
                error: this.props.findLinkQuery.error
            });
        }

        const existingLink = await this.props.findLinkQuery.refetch({
            url: link
        });

        if (existingLink.data.Link) {
            this.setState({
                convertedUrl: existingLink.data.Link.convertedUrl
            });
            this.setState({
                buttonState: BUTTON_STATE.NORMAL
            });
            return;
        }

        const convertedUrl = Date.now().toString();
        try {
            const createLinkResponse = await this.props.createLinkMutation({
                variables: {
                    convertedUrl,
                    url
                }
            });
            this.setState({
                convertedUrl: createLinkResponse.data.createLink.convertedUrl
            });
        } catch (e) {
            this.setState({ error: e.toString() });
        } finally {
            this.setState({
                buttonState: BUTTON_STATE.NORMAL
            });
        }
    }

    render() {
        const buttonLabelMap = {};
        buttonLabelMap[BUTTON_STATE.NORMAL] = "Shorten URL";
        buttonLabelMap[BUTTON_STATE.LOADING] = "Loading...";
        return (
            <div style={styles.w3z_container}>
                <Logo handleResetClick={this.handleResetButtonClick} />
                <Form
                    link={this.state.convertedUrl}
                    inputPlaceholder={"Enter URL to shorten"}
                    buttonState={this.state.buttonState}
                    buttonLabelMap={buttonLabelMap}
                    handleButtonClick={this.handleShortenButtonClick}
                    handleResetClick={this.handleResetButtonClick}
                    error={this.state.error}
                />
            </div>
        );
    }
}

const styles = {
    w3z_container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column"
    }
};

const FIND_LINK_QUERY = gql`
    query FindLinkQuery($url: String!) {
        Link(url: $url) {
            id
            url
            convertedUrl
        }
    }
`;

const CREATE_LINK_MUTATION = gql`
    mutation CreateLinkMutation($convertedUrl: String!, $url: String!) {
        createLink(convertedUrl: $convertedUrl, url: $url) {
            id
            url
            convertedUrl
        }
    }
`;

export default compose(
    graphql(FIND_LINK_QUERY, {
        options: {
            variables: { url: "" }
        },
        name: "findLinkQuery"
    }),
    graphql(CREATE_LINK_MUTATION, {
        name: "createLinkMutation"
    })
)(Main);
