import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Post from 'components/Post'

class PostContainer extends Component {
  static propTypes = {
    postID: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    numberOfLikes: PropTypes.number,
    isLiked: PropTypes.bool.isRequired,
    hideLikeCount: PropTypes.bool.isRequired,
    hideReplyBtn: PropTypes.bool.isRequired,
    handleDeleteLike: PropTypes.func.isRequired,
    addAndHandleLike: PropTypes.func.isRequired,
    // withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }
  static defaultProps = {
    hideReplyBtn: false,
    hideLikeCoutn: true,
  }

  goToProfile = event => {
    event.stopPropagation()
    this.props.history.push(`/${this.props.post.uid}`)
  }

  handleClick = event => {
    event.stopPropagation()
    this.props.history.push(`/postDetail/${this.props.post.postID}`)
  }

  render () {
    return <Post />
  }
}

const mapStateToProps = (
  { posts, likeCount, usersLikes },
  { props: { postID, hideLikeCount, hideReplyBtn } },
) => ({
  post: posts[postID],
  hideLikeCount,
  hideReplyBtn,
  isLiked: usersLikes[postID] === true,
  numberOfLikes: likeCount[postID],
})

export default withRouter(connect(mapStateToProps)(PostContainer))
