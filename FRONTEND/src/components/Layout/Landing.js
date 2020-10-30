import React, { Component } from 'react' // Define routing
import { Link } from "react-router-dom"; // This is for Routing
import { connect } from "react-redux"; // connect component with redux store
import PropTypes from "prop-types"; // Define proptypes

class Landing extends Component {

    // Redirect to Dashboard when user is already logged in
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    render() {
        return (
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">Developer Connector</h1>
                            <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                            <hr />
                            <Link to="/register" className="btn btn-lg btn-info mr-2">
                                Sign Up
                            </Link>
                            <Link to="/login" className="btn btn-lg btn-light">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

// PropTypes defines datatype and which props are required
Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

// Define props from state
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps)(Landing);