import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Main from "./components/core/Main";
import Link from "./components/core/Link";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Main} />
                    <Route
                        path="/:convertedUrl"
                        render={path =>
                            <Link link={path.match.params.convertedUrl} />}
                    />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
