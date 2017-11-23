import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PostContainer from 'containers/PostContainer'
import { ContentContainer, ErrorMessage, ActionButton } from 'styles/sharedStyles'
import Fetching from 'components/Fetching'
import { formatReply } from 'helpers/utils'

const MainContainer = styled.div`
  padding: 20px;
  margin: 20px;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
const Content = styled.div`
  flex: 4;
`

const RepliesContainer = styled.div`
  flex: 3;
`

const ReplyTextAreaContainer = styled.div`
  display: flex;
  height: 110px;
  margin: 10px;
  width: 70%;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  height: 160px;
`

const ReplyTextArea = styled.textarea`
  flex: 1;
  border-radius: 3px;
  padding: 8px 10px;
  font-size: 18px;
  resize: none;
  border: 1px solid #ccc;
  margin: 10px 0;
`

const Reply = ({ submit }) => {
  const handleSubmit = event => {
    if (this.textInput.value.length === 0) return
    submit(this.textInput.value, event)
    this.textInput.value = ''
  }
  return (
    <ReplyTextAreaContainer>
      <ReplyTextArea
        innerRef={input => {
          this.textInput = input
        }}
        maxLength={140}
        placeholder="Your response"
        type="text"/>
      <ActionButton onClick={handleSubmit}>{'Submit'}</ActionButton>
    </ReplyTextAreaContainer>
  )
}

Reply.propTypes = {
  submit: PropTypes.func.isRequired,
}

const PostDetails = ({ authedUser, postID, isFetching, error, addAndHandleReply }) => (
  <ContentContainer>
    <MainContainer>
      {isFetching === true ? (
        <Fetching />
      ) : (
        <Container>
          <Content>
            <PostContainer postID={postID} hideLikeCount={false} hideReplyBtn={true} />
          </Content>
          <RepliesContainer>
            <Reply submit={replyText => addAndHandleReply(postID, formatReply(authedUser, replyText))} />
          </RepliesContainer>
        </Container>
      )}
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </MainContainer>
  </ContentContainer>
)

PostDetails.propTypes = {
  authedUser: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  addAndHandleReply: PropTypes.func.isRequired,
}

export default PostDetails
