import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import Reply from 'react-icons/lib/fa/mail-reply'
import Star from 'react-icons/lib/fa/star'

import { formatTimestamp } from 'helpers/utils'
import { Avatar, clickable } from 'styles/sharedStyles'

const PostContainer = styled.div`
  background: #fcfcfc;
  padding: 1rem;
  border-radius: 2px;
  color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 80%;
  max-width: 500px;
  margin: 1rem;
  color: #555555;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
`

const PostHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 18px;
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: bold;
`

const Author = styled.div`
  ${clickable};
`

const Text = styled.div`
  padding: 8px 0;
  font-size: 20px;
  line-height: 25px;
`

const LikeReplyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 15px;
  font-size: 18px;
`

const ReplyIcon = styled(Reply)`
  height: 25px;
  width: 25px;
  margin-right: 5px;
  ${clickable};
`

const StarIcon = styled(Star)`
  height: 25px;
  width: 25px;
  margin-right: 5px;
  ${clickable};
`

const Date = styled.div``

const Post = ({
  location,
  onClick,
  post,
  goToProfile,
  isLiked,
  handleDeleteLike,
  addAndHandleLike,
  hideLikeCount,
  numberOfLikes,
}) => (
  <PostContainer style={{ cursor: location.pathname === '/feed' ? 'pointer' : 'default' }} onClick={onClick}>
    <Avatar src={post.avatar} alt={`Avatar for ${post.name}`} />
    <InfoContainer>
      <PostHeader>
        <Author onClick={goToProfile}>{post.name}</Author>
        <Date>{formatTimestamp(post.timestamp)}</Date>
      </PostHeader>
      <Text>{post.text}</Text>
      <LikeReplyContainer>
        {location.pathname === '/feed' ? <ReplyIcon /> : null}

        <ActionContainer>
          <StarIcon
            style={{ color: isLiked === true ? '#4a90e2' : '#555555' }}
            onClick={event =>
              isLiked === true ? handleDeleteLike(post.postID, event) : addAndHandleLike(post.postID, event)}/>
          {hideLikeCount === true ? null : <div>{numberOfLikes}</div>}
        </ActionContainer>
      </LikeReplyContainer>
    </InfoContainer>
  </PostContainer>
)

Post.propTypes = {
  post: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    postID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
  isLiked: PropTypes.bool.isRequired,
  addAndHandleLike: PropTypes.func.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  numberOfLikes: PropTypes.number,
  hideReplyBtn: PropTypes.bool.isRequired,
  hideLikeCount: PropTypes.bool.isRequired,
  goToProfile: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(Post)
