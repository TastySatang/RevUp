import React, { useState } from 'react';
import { Modal } from '.././context/Modal';
import LoginForm from './auth/LoginForm';
import './LoginForm.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='signIn' onClick={() => setShowModal(true)}>Sign In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
