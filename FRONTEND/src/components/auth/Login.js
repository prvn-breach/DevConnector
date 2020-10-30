import React, { Component } from 'react'
import { withRouter } from "react-router-dom"; // Define routing
import PropTypes from "prop-types"; // Define proptypes
import { connect } from "react-redux"; // connect component with redux store
import { loginUser } from "../../actions/authActions"; // Actions
import TextFieldGroup from "../common/TextFieldGroup"; // Input Fields hook

class Login extends Component {
    // initialize state
    constructor () {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    // Trigger On change when type input fields
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    // Redirect to Dashboard when user is already logged in
    componentDidMount () {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    // Recieve props for this component
    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }

        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    // Form login onSubmit
    onSubmit(e) {
        e.preventDefault();
        const credentials = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(credentials);
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup 
                                    type="email"
                                    error={errors.email}
                                    placeholder="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                <TextFieldGroup 
                                    type="password"
                                    error={errors.password}
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />

                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// PropTypes defines datatype and which props are required
Login.propTypes = {
    loginUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

// Define props from state
const mapStateToProp = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProp, { loginUser }) (withRouter(Login));
