import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

class ConfirmButton extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onOpen: PropTypes.func,
        onCancel: PropTypes.func,
        isFlat: PropTypes.bool,
        icon: PropTypes.element,
        label: PropTypes.string,
        cancelIcon: PropTypes.element,
        cancelMessage: PropTypes.string,
        confirmIcon: PropTypes.element,
        confirmMessage: PropTypes.string,
    }

    constructor(props) {
        super(props);
        const {
            onSubmit,
            onOpen,
            onCancel,
            isOpen,
            isFlat,
            icon,
            label,
            cancelIcon,
            cancelMessage,
            confirmIcon,
            confirmMessage,
            ...other
        } = props;
        this.onSubmit = onSubmit;
        this.onCancel = onCancel;
        this.onOpen = onOpen;
        this.isOpen = isOpen;
        this.isFlat = isFlat;
        this.other = other;
        this.icon = icon;
        this.label = label;
        this.cancelIcon = cancelIcon;
        this.confirmIcon = confirmIcon;
        this.confirmMessage = !confirmIcon && !confirmMessage ? 'Confirm' : confirmMessage;
        this.cancelMessage = !cancelIcon && !cancelMessage ? 'Cancel' : cancelMessage;
        this.state = {isOpen};
    }

    componentWillReceiveProps(props) {
        this.setState({isOpen: props.isOpen});
    }

    handleOpen() {
        if (this.onOpen) {
            this.onOpen();
        } else {
            this.setState({isOpen: true});
        }
    }

    handleCancel() {
        if (this.onCancel) {
            this.onCancel();
        } else {
            this.setState({isOpen: false});
        }
    }

    handleSubmit() {
        this.onSubmit();
        this.setState({isOpen: false});
    }

    render() {
        return (
            <span>
                {!this.state.isOpen && <span>
                    {!this.isFlat && <RaisedButton
                        icon={this.icon}
                        label={this.label}
                        onTouchTap={() => this.handleOpen()}
                        {...this.other} />
                    }
                    {this.isFlat && <FlatButton
                        icon={this.icon}
                        label={this.label}
                        onTouchTap={() => this.handleOpen()}
                        {...this.other} />
                    }
                </span>}
                {this.state.isOpen && <span>
                    {!this.isFlat && <span>
                        <RaisedButton
                            label={this.cancelMessage}
                            {...this.other}
                            onTouchTap={() => this.handleCancel()} />
                        <RaisedButton
                            secondary
                            label={this.confirmMessage}
                            {...this.other}
                            onTouchTap={() => this.onSubmit()} />
                    </span>}
                    {this.isFlat && <span>
                        <FlatButton
                            label={this.cancelMessage}
                            {...this.other}
                            onTouchTap={() => this.handleCancel()} />
                        <FlatButton
                            secondary
                            label={this.confirmMessage}
                            {...this.other}
                            onTouchTap={() => this.onSubmit()} />
                    </span>}
                </span>}
            </span>
        );
    }
}

export default ConfirmButton;

