import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Modal from 'components/Modal'
import * as modalActions from 'modules/modal'

const mapStateToProps = ({ modal, users }) => {
  const postTextLength = modal.postText.length
  return {
    user: users[users.authedID] ? users[users.authedID].info : {},
    postText: modal.postText,
    isOpen: modal.isOpen,
    isSubmitDisabled: postTextLength <= 0 || postTextLength > 140,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(modalActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Modal)