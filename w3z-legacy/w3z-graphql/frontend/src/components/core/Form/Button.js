import React, { Component } from "react";

const BUTTON_STATE = {
    NORMAL: 0,
    LOADING: 1
};

const BUTTON_STATE_COLOR = {};
BUTTON_STATE_COLOR[BUTTON_STATE.NORMAL] = "#5264ae";
BUTTON_STATE_COLOR[BUTTON_STATE.LOADING] = "gray";

class Button extends Component {
    render() {
        return (
            <button
                onClick={this.props.handleButtonClick}
                style={Object.assign(
                    Object.assign({}, this.props.style),
                    Object.assign(styles.w3z_button, {
                        backgroundColor:
                            BUTTON_STATE_COLOR[this.props.buttonState]
                    })
                )}
            >
                {this.props.buttonLabel
                    ? this.props.buttonLabel
                    : this.props.buttonLabelMap[this.props.buttonState]}
            </button>
        );
    }
}

Button.defaultProps = {
    buttonState: BUTTON_STATE.NORMAL
};

const styles = {
    w3z_button: {
        borderWidth: 0,
        outline: "none",
        borderRadius: 2,
        boxShadow: "0 1px 4px rgba(0, 0, 0, .6)",
        backgroundColor: "#5264ae",
        color: "#ecf0f1",
        padding: 7,
        minWidth: 60,
        maxWidth: 80,
        transition: "background-color .5s"
    }
};

export default Button;

export { BUTTON_STATE };
