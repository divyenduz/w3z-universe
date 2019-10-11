import React from "react";
import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface
} from "react-apollo";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: process.env.REACT_APP_GRAPHQL_URI
    })
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
registerServiceWorker();
