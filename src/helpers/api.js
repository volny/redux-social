import { ref } from 'config/constants'

const saveToPosts = post => {
  const postID = ref.child('posts').push().key
  const postPromise = ref.child(`posts/${postID}`).set({ ...post, postID })
  return { postID, postPromise }
}

const saveToUsersPosts = (post, postID) =>
  ref.child(`usersPosts/${post.uid}/${postID}`).set({ ...post, postID })

const saveLikeCount = postID => ref.child(`likeCount/${postID}`).set(0)

export const savePost = post => {
  const { postID, postPromise } = saveToPosts(post)
  return Promise.all([postPromise, saveToUsersPosts(post, postID), saveLikeCount(postID)]).then(() => ({
    ...post,
    postID,
  }))
}

export const listenToFeed = (cb, errorCB) => {
  ref.child('posts').on(
    'value',
    snapshot => {
      const feed = snapshot.val() || {}
      const sortedIDs = Object.keys(feed).sort((a, b) => feed[b].timestamp - feed[a].timestamp)
      cb({ feed, sortedIDs })
    },
    errorCB,
  )
}

export const fetchUsersLikes = async uid => {
  const snapshot = await ref.child(`usersLikes/${uid}`).once('value')
  return snapshot.val() || {}
}

export const saveToUsersLikes = (uid, postID) => ref.child(`usersLikes/${uid}/${postID}`).set(true)

export const deleteFromUsersLikes = (uid, postID) => ref.child(`usersLikes/${uid}/${postID}`).set(null)

export const incrementNumberOfLikes = postID =>
  ref.child(`likeCount/${postID}`).transaction((currentValue = 0) => currentValue + 1)

export const decrementNumberOfLikes = postID =>
  ref.child(`likeCount/${postID}`).transaction((currentValue = 0) => currentValue - 1)

export const fetchPost = async postID => {
  const snapshot = await ref.child(`posts/${postID}`).once('value')
  return snapshot.val()
}

export const fetchLikeCount = async postID => {
  const snapshot = await ref.child(`likeCount/${postID}`).once('value')
  return snapshot.val()
}

export const postReply = (postID, reply) => {
  const replyID = ref.child(`replies/${postID}`).push().key
  const replyWithID = { ...reply, replyID }
  const replyPromise = ref.child(`replies/${postID}/${replyID}`).set(replyWithID)
  return { replyWithID, replyPromise }
}
