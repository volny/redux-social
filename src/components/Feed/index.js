import React from 'react'

import { ContentContainer, PageTitle, PageSubTitle } from 'styles/sharedStyles'

const Feed = props => {
  console.log(props)
  return (
    <ContentContainer>
      <PageTitle>{'Feed'}</PageTitle>
      <PageSubTitle>{"Yes it's the feed"}</PageSubTitle>
    </ContentContainer>
  )
}

export default Feed
