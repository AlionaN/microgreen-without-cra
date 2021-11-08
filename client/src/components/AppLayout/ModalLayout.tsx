import React from 'react';
import styles from './ModalLayout.module.scss';
import { CgClose } from 'react-icons/cg';

interface IModalLayout {
  content: JSX.Element;
  onCloseModal: () => void
}

export const ModalLayout: React.FC<IModalLayout> = ({ content, onCloseModal }: IModalLayout) => {
  return (
    <div className={`${styles.window} modalWindow`}>
      <div className={styles.windowHeader}>
        <div className={styles.windowHeaderClose} onClick={onCloseModal}><CgClose /></div>
      </div>
      <div className={styles.windowBody}>{content}</div>
    </div>
  )
};
