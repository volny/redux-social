import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
import styled from 'styled-components'

import { ActionButton } from 'styles/sharedStyles'

const PostButton = styled(ActionButton)`
  background: #59abe3;
  color: #ffffff;
  font-size: 20px;
  &:hover {
    background: #1877e6;
  }
`

const SubmitButton = styled(ActionButton)`
  background: #59abe3;
  color: #ffffff;
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

const ModalTextareaContainer = styled.div`
  display: flex;
  height: 110px;
  margin: 10px;
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

const Modal = ({ postText, isOpen, user, isSubmitDisabled, openModal, closeModal, updatePostText }) => {
  const submitPost = () => {
    console.log('Post', postText)
    console.log('User', user)
  }
  return (
    <div>
      <ReactModal style={modalStyles} isOpen={isOpen} onRequestClose={closeModal}>
        <ModalTop>
          <span>{'Compose new Post'}</span>
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
        <SubmitButton disabled={isSubmitDisabled} onClick={submitPost}>
          {'Post'}
        </SubmitButton>
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
}

export default Modal
