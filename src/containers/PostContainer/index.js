import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Post from 'components/Post'
import * as usersLikesActions from 'modules/usersLikes'

class PostContainer extends Component {
  static defaultProps = {
    hideReplyBtn: false,
    hideLikeCount: true,
  }

  static propTypes = {
    postID: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    numberOfLikes: PropTypes.number,
    isLiked: PropTypes.bool.isRequired,
    hideLikeCount: PropTypes.bool.isRequired,
    hideReplyBtn: PropTypes.bool.isRequired,
    handleDeleteLike: PropTypes.func.isRequired,
    addAndHandleLike: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }
  goToProfile = event => {
    event.stopPropagation()
    this.props.history.push(`/${this.props.post.uid}`)
  }

  handleClick = event => {
    event.stopPropagation()
    this.props.history.push(`/post/${this.props.post.postID}`)
  }

  render () {
    return (
      <Post
        goToProfile={this.goToProfile}
        onClick={this.props.location.pathname === '/feed' ? this.handleClick : null}
        {...this.props}/>
    )
  }
}

const mapStateToProps = ({ posts, likeCount, usersLikes }, { postID, hideLikeCount, hideReplyBtn }) => ({
  post: posts[postID],
  hideLikeCount: hideLikeCount,
  hideReplyBtn: hideReplyBtn,
  isLiked: usersLikes[postID] === true,
  numberOfLikes: likeCount[postID],
})

const mapDispatchToProps = dispatch => bindActionCreators(usersLikesActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostContainer))
