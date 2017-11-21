import React from 'react'
import PropTypes from 'prop-types'

const Post = props => {
  console.log(props)
  return <p>{JSON.stringify(props.post)}</p>
}

Post.propTypes = {}

export default Post
