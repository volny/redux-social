import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Replies from 'components/Replies'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as repliesActions from 'modules/replies'
import { isReplyStale } from 'helpers/utils'

class RepliesContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    replies: PropTypes.object,
    postID: PropTypes.string.isRequired,
    fetchAndHandleReplies: PropTypes.func.isRequired,
  }
  static defaultProps = {
    lastUpdated: 0,
    replies: {},
  }
  componentDidMount () {
    if (isReplyStale(this.props.lastUpdated)) {
      this.props.fetchAndHandleReplies(this.props.postID)
    }
  }
  render () {
    return <Replies {...this.props} />
  }
}

const mapStateToProps = (state, { postID }) => {
  const { lastUpdated, replies } = state.replies[postID] || {}
  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(repliesActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RepliesContainer))
