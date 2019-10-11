import React, { Component } from "react";
import { Link } from "react-router-dom";

import Button from "./Button";
import Clipboard from "./Clipboard";

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = { buttonLabel: "copy" };
    }
    render() {
        const link = `${process.env.REACT_APP_SITE_URL}/${this.props.link}`;
        return (
            <div style={styles.w3z_info_wrapper}>
                <div style={styles.w3z_info}>
                    <Link
                        style={styles.w3z_info_link}
                        to={`/${this.props.link}`}
                    >
                        {link}
                    </Link>
                    <Clipboard text={link}>
                        <Button
                            style={{ marginLeft: 10 }}
                            buttonLabel={this.state.buttonLabel}
                            handleButtonClick={() => {
                                this.setState({ buttonLabel: "copied!" });
                            }}
                        />
                    </Clipboard>
                </div>
                <Button
                    style={{ marginTop: 20 }}
                    buttonLabel={"Shorten Again"}
                    handleButtonClick={this.props.handleResetClick}
                />
            </div>
        );
    }
}

const styles = {
    w3z_info_wrapper: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    },
    w3z_info: { display: "flex" },
    w3z_info_link: {
        color: "darkblue",
        textDecoration: "none",
        fontWeight: "bold"
    }
};

export default Info;
