import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'

import PostDetails from 'components/PostDetails'
import * as postsActions from 'modules/posts'
import * as likeCountActions from 'modules/likeCount'

class PostDetailsContainer extends Component {
  static propTypes = {
    authedUser: PropTypes.object.isRequired,
    postID: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    removeFetching: PropTypes.func.isRequired,
    fetchAndHandlePost: PropTypes.func.isRequired,
    postAlreadyFetched: PropTypes.bool.isRequired,
    initLikeFetch: PropTypes.func.isRequired,
    // withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }
  componentDidMount () {
    this.props.initLikeFetch(this.props.postID)
    if (this.props.postAlreadyFetched === false) {
      this.props.fetchAndHandlePost(this.props.postID)
    } else {
      this.props.removeFetching()
    }
  }
  render () {
    return (
      <PostDetails
        addAndHandleReply={(postID, reply) => console.log('id: ' + postID, 'reply: ', reply)}
        authedUser={this.props.authedUser}
        postID={this.props.postID}
        isFetching={this.props.isFetching}
        error={this.props.error}/>
    )
  }
}

PostDetailsContainer.PropTypes = {}
const mapStateToProps = ({ posts, likeCount, users }, { match }) => ({
  isFetching: posts.isFetching || likeCount.isFetching,
  error: posts.error,
  authedUser: users[users.authedID],
  postID: match.params.postID,
  postAlreadyFetched: !!posts[match.params.postID],
})

const mapDispatchToProps = dispatch => bindActionCreators({ ...postsActions, ...likeCountActions }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetailsContainer))
