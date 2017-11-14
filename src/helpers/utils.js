export const formatUserInfo = ({ displayName, photoURL, uid }) => ({
  name: displayName,
  avatar: photoURL,
  uid,
})
