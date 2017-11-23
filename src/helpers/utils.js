import { userPostsExpirationLength, userExpirationLength, repliesExpirationLength } from 'config/constants'

export const formatUserInfo = ({ displayName, photoURL, uid }) => ({
  name: displayName,
  avatar: photoURL,
  uid,
})

export const formatPost = (text, { name, avatar, uid }) => ({
  text,
  name,
  avatar,
  uid,
  timestamp: Date.now(),
})

export const formatReply = ({ info: { name, avatar, uid } }, reply) => ({
  timestamp: Date.now(),
  name,
  uid,
  avatar,
  reply,
})

export const formatTimestamp = timestamp => {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

const getMilliseconds = timestamp => new Date().getTime() - new Date(timestamp).getTime()
const stalePosts = timestamp => getMilliseconds(timestamp) > userPostsExpirationLength
const staleUser = timestamp => getMilliseconds(timestamp) > userExpirationLength
export const isReplyStale = timestamp => getMilliseconds(timestamp) > repliesExpirationLength
