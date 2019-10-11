import React, { Component } from "react";

class Clipboard extends Component {
    constructor(props) {
        super(props);
        this._click = this._click.bind(this);
    }
    _click() {
        var aux = document.createElement("input");
        aux.setAttribute("value", this.props.text);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
    }
    render() {
        return (
            <div onClick={this._click}>
                {this.props.children}
            </div>
        );
    }
}

export default Clipboard;
