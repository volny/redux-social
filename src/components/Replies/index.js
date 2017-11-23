import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Avatar, clickable, ErrorMessage } from 'styles/sharedStyles'
import Fetching from 'components/Fetching'
import { formatTimestamp } from 'helpers/utils'

const ReplyContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  font-size: 18px;
  margin: 7px;
  padding: 15px;
`

const cushion = css`
  padding: 5px 0;
`

const Prompt = styled.p`
  text-align: center;
  font-size: 20px;
`

const Author = styled.div`
  font-weight: bold;
  ${clickable};
`

const TextContainer = styled.div`
  padding: 5px 0;
`

const Reply = ({ comment }) => (
  <ReplyContainer>
    <Avatar src={comment.avatar} alt={comment.name} />
    <div>
      <Author>{comment.name}</Author>
      <TextContainer>{formatTimestamp(comment.timestamp)}</TextContainer>
      <TextContainer>{comment.reply}</TextContainer>
    </div>
  </ReplyContainer>
)

const Replies = ({ isFetching, error, replies }) => {
  const replyIDs = replies ? Object.keys(replies) : []
  return (
    <div>
      {replyIDs.length <= 0 ? <Prompt>{'Be the first to comment'}</Prompt> : null}
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      {isFetching === true ? (
        <Fetching />
      ) : (
        <div>{replyIDs.map(replyID => <Reply key={replyID} comment={replies[replyID]} />)}</div>
      )}
    </div>
  )
}

Replies.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  replies: PropTypes.object,
}

export default Replies
