import React, { Component } from "react";
import { Link } from "react-router-dom";

class Logo extends Component {
    render() {
        return (
            <Link
                style={styles.w3z_logo}
                to={"/"}
                onClick={this.props.handleResetClick}
            >
                {process.env.REACT_APP_SITE_NAME}
            </Link>
        );
    }
}

const styles = {
    w3z_logo: {
        fontWeight: "bold",
        fontSize: "100px",
        color: "#495a9c",
        textDecoration: "none",
        textAlign: "center"
    }
};

export default Logo;
