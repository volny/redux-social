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
