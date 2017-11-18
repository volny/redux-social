import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
import styled from 'styled-components'

import { ActionButton } from 'styles/sharedStyles'
import { formatPost } from 'helpers/utils'

const PostButton = styled(ActionButton)`
  background: #59abe3;
  color: #ffffff;
  font-size: 20px;
  &:hover {
    background: #1877e6;
  }
`

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 228,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
  overlay: {
    position: 'fixed',
    top: '100px',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
}

const ModalTop = styled.div`
  background: #fff;
  padding: 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1877e6;
`

const ModalHeading = styled.span`
  font-size: 18px;
`

const ModalTextareaContainer = styled.div`
  display: flex;
  height: 110px;
  margin: 10px 10px 4px 10px;
`

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
`

const SubmitButton = styled(ActionButton)`
  background: #59abe3;
  color: #ffffff;
  &:hover {
    background: #1877e6;
  }
  &:disabled {
    background: #e4f1fe;
  }
`

const NewPostInput = styled.textarea`
  flex: 1;
  border-radius: 3px;
  padding: 8px 10px;
  font-size: 18px;
  resize: none;
  border-width: 0;
`

const ModalCloseButton = styled.span`
  font-weight: 600;
  font-size: 20px;
`

const Modal = ({
  postText,
  isOpen,
  user,
  isSubmitDisabled,
  openModal,
  closeModal,
  updatePostText,
  postFanout,
}) => {
  const submitPost = () => {
    postFanout(formatPost(postText, user))
  }
  return (
    <div>
      <ReactModal style={modalStyles} isOpen={isOpen} onRequestClose={closeModal}>
        <ModalTop>
          <ModalHeading>{'Compose new Post'}</ModalHeading>
          <ModalCloseButton onClick={closeModal} style={{ cursor: 'pointer' }}>
            {'×'}
          </ModalCloseButton>
        </ModalTop>
        <ModalTextareaContainer>
          <NewPostInput
            onChange={e => updatePostText(e.target.value)}
            value={postText}
            maxLength={140}
            type="text"
            placeholder="What's happening"/>
        </ModalTextareaContainer>
        <ModalButtonContainer>
          <SubmitButton disabled={isSubmitDisabled} onClick={submitPost}>
            {'Post'}
          </SubmitButton>
        </ModalButtonContainer>
      </ReactModal>
      <PostButton onClick={openModal}>{'New Post'}</PostButton>
    </div>
  )
}

Modal.propTypes = {
  postText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  updatePostText: PropTypes.func.isRequired,
  postFanout: PropTypes.func.isRequired,
}

export default Modal
