import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import { ModalLayout } from '@/components/AppLayout';

interface IModal {
  children: JSX.Element;
  el: JSX.Element;
  isModalOpen: boolean;
  onCloseModal: () => void;
};

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component {

  constructor (props: IModal) {
    super(props);
  }

  el: HTMLElement = document.createElement('div');

  render() {
    const el = this.el;
    
    el.classList.add(styles.modal);
    this.props.isModalOpen ? el.classList.add(styles.open) : el.classList.remove(styles.open);
    modalRoot?.appendChild(el);

    return (
      ReactDOM.createPortal(
        <ModalLayout content={this.props.children} onCloseModal={this.props.onCloseModal}/>,
        el
      )
    );
  };
};
