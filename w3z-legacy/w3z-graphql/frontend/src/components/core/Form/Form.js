import React, { Component } from "react";

import Button from "./Button";
import Error from "./Error";
import Info from "./Info";

class Form extends Component {
    render() {
        if (this.props.link) {
            return (
                <div style={styles.w3z_form}>
                    <Error error={this.props.error} />
                    <Info
                        handleResetClick={this.props.handleResetClick}
                        link={this.props.link}
                    />
                </div>
            );
        }

        return (
            <div style={styles.w3z_form}>
                <Error error={this.props.error} />
                <input
                    style={styles.w3z_input}
                    placeholder={this.props.inputPlaceholder}
                    type="text"
                    onChange={event =>
                        this.setState({ value: event.target.value })}
                />
                <Button
                    style={{ marginTop: 20 }}
                    buttonState={this.props.buttonState}
                    buttonLabelMap={this.props.buttonLabelMap}
                    handleButtonClick={() => {
                        this.props.handleButtonClick(this.state.value);
                    }}
                />
            </div>
        );
    }
}

const styles = {
    w3z_form: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: 100,
        paddingRight: 100,
        paddingTop: 40,
        paddingBottom: 40,
        maxWidth: 300,
        borderRadius: 3,
        boxShadow: "#B1B1B1 1px 1px 4px"
    },
    w3z_input: {
        width: "90%",
        minWidth: 300,
        maxWidth: 700,
        height: 25
    }
};

export default Form;
