import { ref, firebaseAuth } from 'config/constants'

const auth = async () => {
  const provider = new firebaseAuth.GithubAuthProvider()
  return firebaseAuth().signInWithPopup(provider)
}

export const saveUser = user =>
  ref
    .child(`users/${user.uid}`)
    .set('user')
    .then(() => user)

export const logout = () => firebaseAuth.signout()

export default auth
