import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner.component';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {
	useEffect(
		() => {
			getProfileById(match.params.id);
		},
		[ getProfileById ]
	);

	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/profiles' className='btn btn-light'>
						Back to profiles
					</Link>
					{auth.isAuthenticated &&
					auth.loading === false &&
					auth.user._id == profile.user._id && (
						<Link to='/edit-profile' className='btn btn-dark'>
							Edit profile
						</Link>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.array.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
