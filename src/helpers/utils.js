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
