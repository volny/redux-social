import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ContentContainer, PageTitle, PageSubTitle, ErrorMessage } from 'styles/sharedStyles'
import PostContainer from 'containers/PostContainer'

const NewPostContainer = styled.div`
  background: #4a90e2;
  color: #fff;
  text-align: center;
  padding: 5px;
  cursor: pointer;
`

const NewPostsAvailable = ({ handleClick }) => (
  <NewPostContainer onClick={handleClick}>{'New Posts Available'}</NewPostContainer>
)

NewPostsAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

const Feed = ({ isFetching, resetNewPostsAvailable, newPostsAvailable, postIDs, error }) => (
  <ContentContainer>
    <PageTitle>{'Feed'}</PageTitle>
    {isFetching === true ? (
      <PageSubTitle>{'Fetching'}</PageSubTitle>
    ) : (
      <div>
        {newPostsAvailable ? <NewPostsAvailable handleClick={resetNewPostsAvailable} /> : null}
        {postIDs.length === 0 ? <PageSubTitle>{'No posts yet 😞'}</PageSubTitle> : null}
        {postIDs.map(id => <PostContainer key={id} postID={id} />)}
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      </div>
    )}
  </ContentContainer>
)

Feed.propTypes = {
  postIDs: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  newPostsAvailable: PropTypes.bool.isRequired,
  resetNewPostsAvailable: PropTypes.func.isRequired,
}

export default Feed
