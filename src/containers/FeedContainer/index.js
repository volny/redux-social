import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as feedActions from 'modules/feed'
import { withRouter } from 'react-router'

import Feed from 'components/Feed'

class FeedContainer extends Component {
  static propTypes = {
    newPostsAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
    resetNewPostsAvailable: PropTypes.func.isRequired,
    postIDs: PropTypes.array.isRequired,
  }
  componentDidMount = () => {
    this.props.setAndHandleFeedListener()
  }

  render () {
    return (
      <Feed
        newPostsAvailable={this.props.newPostsAvailable}
        isFetching={this.props.isFetching}
        error={this.props.error}
        resetNewPostsAvailable={this.props.resetNewPostsAvailable}
        postIDs={this.props.postIDs}/>
    )
  }
}

const mapStateToProps = ({ feed: { newPostsAvailable, error, isFetching, postIDs } }) => ({
  newPostsAvailable,
  error,
  isFetching,
  postIDs,
})

const mapDispatchToProps = dispatch => bindActionCreators(feedActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedContainer))
