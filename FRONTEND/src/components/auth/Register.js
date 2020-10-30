import React, { Component } from "react";
import { withRouter } from "react-router-dom"; // Define routing
import PropTypes from "prop-types"; // Define proptypes
import { connect } from "react-redux"; // connect component with redux store
import { registerUser } from "../../actions/authActions"; // Actions
import TextFieldGroup from "../common/TextFieldGroup"; // Input Fields hook

class Register extends Component {

    // Initilaize State
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Redirect to Dashboard when user is already logged in
    componentDidMount () {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    // Recieve props for this component
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    // Trigger On change when type input fields
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    
    // Form submit
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        
        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Create your DevConnector account
                            </p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup 
                                    type="text"
                                    error={errors.name}
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                                <TextFieldGroup 
                                    type="email"
                                    error={errors.email}
                                    placeholder="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                />
                                <TextFieldGroup 
                                    type="password"
                                    error={errors.password}
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                <TextFieldGroup 
                                    type="password"
                                    error={errors.password2}
                                    placeholder="Confirm Password"
                                    name="password2"
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// PropTypes defines datatype and which props are required
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

// Define props from state
const mapStateToProp = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect( mapStateToProp, {registerUser}) (withRouter(Register) );
