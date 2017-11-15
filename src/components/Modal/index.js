import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
import styled from 'styled-components'

const ActionButton = styled.button`
  color: #222222;
  font-size: 20px;
  text-decoration: none;
  &:hover {
    color: #a1b56c;
  }
`
const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
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

const NewPostInput = styled.input`
  flex: 1;
  border-radius: 3px;
  padding: 8px 10px;
  font-size: 18px;
  resize: none;
  border-width: 0;
`

const SubmitButton = styled.button``

const Modal = ({ postText, isOpen, user, isSubmitDisabled, openModal, closeModal, updatePostText }) => {
  const submitPost = () => {
    console.log('Post', postText)
    console.log('User', user)
  }
  return (
    <div>
      <ActionButton onClick={openModal}>{'New Post'}</ActionButton>
      <ReactModal style={modalStyles} isOpen={isOpen} onRequestClose={closeModal}>
        <ModalTop>
          <span>{'Compose new Post'}</span>
          <span onClick={closeModal} style={{ cursor: 'pointer' }}>
            {'x'}
          </span>
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
