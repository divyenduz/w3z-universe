import React, { Component } from "react";

class Error extends Component {
    render() {
        if (this.props.error === "") {
            return <div />;
        }
        return (
            <div style={styles.w3z_form_error}>
                {this.props.error}
            </div>
        );
    }
}

const styles = {
    w3z_form_error: {
        position: "absolute",
        fontSize: "13px",
        bottom: 3,
        paddingLeft: 20,
        paddingRight: 20,
        color: "indianred"
    }
};

export default Error;
