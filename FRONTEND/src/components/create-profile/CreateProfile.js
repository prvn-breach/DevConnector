import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit (e) {
        e.preventDefault();
        const profileData = this.state;
        console.log(profileData);
        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    render() {
        const { errors, displaySocialInputs } = this.state;

        let socialInputs;
        // Display social inputs
        if(displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup 
                        type="text"
                        icon="fab fa-twitter"
                        error={errors.twitter}
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                    />

                    <InputGroup 
                        type="text"
                        icon="fab fa-facebook"
                        error={errors.facebook}
                        placeholder="Facebook Page URL"
                        name="facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                    />

                    <InputGroup 
                        type="text"
                        icon="fab fa-linkedin"
                        error={errors.linkedin}
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                    />

                    <InputGroup 
                        type="text"
                        icon="fab fa-youtube"
                        error={errors.youtube}
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                    />

                    <InputGroup 
                        type="text"
                        icon="fab fa-instagram"
                        error={errors.instagram}
                        placeholder="Instagram Page URL"
                        name="instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                    />
                </div>
            );
        }

        // Select options for status
        const selectOptions = [
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor', value: 'Instructor' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup 
                                    type="text"
                                    error={errors.handle}
                                    placeholder="* Profile handle"
                                    name="handle"
                                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                />
                                
                                <SelectListGroup 
                                    placeholder="Status"
                                    error={errors.status}
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    options={selectOptions}
                                    info="Give us an idea of where you are at in your career"
                                />

                                <TextFieldGroup 
                                    type="text"
                                    error={errors.company}
                                    placeholder="Company"
                                    name="company"
                                    info="Could be your own company or one you work for"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                />

                                <TextFieldGroup 
                                    type="text"
                                    error={errors.website}
                                    placeholder="Website"
                                    name="website"
                                    info="Could be your own or a company website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                />

                                <TextFieldGroup 
                                    type="text"
                                    error={errors.location}
                                    placeholder="Location"
                                    name="location"
                                    info="City & state suggested (eg. Boston, MA)e"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                />

                                <TextFieldGroup 
                                    type="text"
                                    error={errors.skills}
                                    placeholder="Skills"
                                    name="skills"
                                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                />

                                <TextFieldGroup 
                                    type="text"
                                    error={errors.githubusername}
                                    placeholder="Github Username"
                                    name="githubusername"
                                    info="If you want your latest repos and a Github link, include your username"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                />

                                <TextAreaFieldGroup 
                                    error={errors.bio}
                                    placeholder="bio"
                                    name="bio"
                                    info="A short bio of yourself"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                />

                                {/* Button */}
                                <div className="mb-3">
                                    <button onClick={() => {
                                        this.setState(prevState => ({
                                            displaySocialInputs: !prevState.displaySocialInputs
                                        }))
                                    }} type="button" className="btn btn-light">Add Social Network Links</button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));
