import React, { Component }     from 'react';
import PropTypes                from 'prop-types';
import { default as BaseModal } from 'react-modal';
import { Icon }                 from 'pearson-compounds';

import '../scss/Modal.scss';


class Modal extends Component {

  static defaultProps = {
    shouldCloseOnOverlayClick: true
  };

  constructor(props) {
    super(props);

    this.onClose            = _onClose.bind(this);
    this.renderFooter       = _renderFooter.bind(this);
    this.afterOpen          = _afterOpen.bind(this);
    this.applyWrapper       = _applyWrapper.bind(this);
    this.removeWrapper      = _removeWrapper.bind(this);
    this.successBtnHandler  = _successBtnHandler.bind(this);
    this.cancelBtnHandler   = _cancelBtnHandler.bind(this);
    this.removeOverlayStyle = _removeOverlayStyle.bind(this);

  };

  componentWillReceiveProps(nextProps){
    if (nextProps && !nextProps.isShown && this.props.isShown){
      this.removeOverlayStyle();
      this.removeWrapper();
    }
  }

  render() {

    const { isShown, footerVisible, text, children, disableSuccessBtn, shouldCloseOnOverlayClick, hideCloseButton, srHeaderText, customClassNames, customStyles, footerClassNames } = this.props;
    return (
          <BaseModal
            className        = {`${!!customClassNames ? customClassNames.base: `pe-template__static-medium `} modalContent`}
            overlayClassName = "modalOverlay"
            isOpen           = {isShown}
            onAfterOpen      = {this.afterOpen}
            onRequestClose   = {this.onClose}
            ariaHideApp      = {false}
            role             = "dialog"
            contentLabel     = "Modal"
            shouldCloseOnOverlayClick = {shouldCloseOnOverlayClick}
            aria             = {{
              labelledby  : "modalHeaderText",
              modal       : true
            }}
            style={customStyles}
    	    >

            <div role="document">

              <div id="modalHeader" className="modalHeader">
                {!footerVisible && !hideCloseButton && <button className="modalClose pe-icon--btn" onClick={this.cancelBtnHandler}>
                  <Icon name="remove-sm-24">{text.closeButtonSRText}</Icon>
                </button>}
                {text.headerTitle  && <h2 id="modalHeaderText" className="modalHeaderText pe-title">{text.headerTitle}</h2>}
                {!text.headerTitle && <span id="modalHeaderText" className="pe-sr-only">{srHeaderText}</span>}
              </div>

              <div className="modalBody" tabIndex={0}>
                {children}
              </div>

              {this.renderFooter(footerVisible, text, disableSuccessBtn, footerClassNames)}

            </div>
          </BaseModal>
    )

  };

};


export default Modal;


Modal.propTypes = {
  text                      : PropTypes.object.isRequired,
  srHeaderText              : PropTypes.string.isRequired,
  successBtnHandler         : PropTypes.func,
  cancelBtnHandler          : PropTypes.func,
  footerVisible             : PropTypes.bool,
  shouldCloseOnOverlayClick : PropTypes.bool,
  hideCloseButton           : PropTypes.bool,
  isShown                   : PropTypes.bool,
  disableSuccessBtn         : PropTypes.bool,
  customClassNames          : PropTypes.object,
  customStyles              : PropTypes.object,
  footerClassNames          : PropTypes.string 

};

export function _onClose() {
  this.cancelBtnHandler();
}

export function _successBtnHandler() {
  this.removeOverlayStyle();
  this.removeWrapper();
  this.props.successBtnHandler.call(this);
}

export function _cancelBtnHandler() {
  this.removeOverlayStyle();
  this.removeWrapper();
  this.props.cancelBtnHandler.call(this);
}

export function _removeOverlayStyle(){
  const modalBody    = document.getElementsByClassName('modalBody')[0];
  const modalOverlay = document.getElementsByClassName('modalOverlay')[0];

  modalBody.style.maxHeight        = '';
  modalOverlay.style.paddingTop    = '';
  modalOverlay.style.paddingBottom = '';
}

export function _afterOpen() {

  const headerCloseButton = document.getElementsByClassName('modalClose')[0];
  const footerCloseButton = document.getElementsByClassName('modalCancel')[0];
  const modalBody         = document.getElementsByClassName('modalBody')[0];
  const modalContent      = document.getElementsByClassName('modalContent')[0];
  const modalOverlay      = document.getElementsByClassName('modalOverlay')[0];
  const header            = document.getElementsByClassName('modalHeader')[0];
  const footer            = document.getElementsByClassName('modalFooter')[0];

  // apply accessibility wrapper...
  this.applyWrapper();

  // apply Focus to close button on open...
  modalContent.focus();

  // apply padding based on clientHeight...
  const windowHeight  = window.innerHeight;
  const contentHeight = modalContent.offsetHeight;
  const paddingHeight = (windowHeight - contentHeight) / 2;
  const padding       = paddingHeight > 60 ? paddingHeight : 60;
  const headerHeight  = header.getBoundingClientRect().height;
  const footerHeight  = footer ? footer.getBoundingClientRect().height : 0;

  // modalBody.style.maxHeight        = !headerCloseButton ? `${windowHeight - (headerHeight + footerHeight + 120)}px` : '';
  // modalOverlay.style.overflow      = !headerCloseButton ? '' :'scroll';
  modalBody.style.maxHeight        = `${windowHeight - (headerHeight + footerHeight + 120)}px`;
  modalOverlay.style.paddingTop    = `${padding}px`;
  modalOverlay.style.paddingBottom = `${padding}px`;

  // conditional borders on modalbody if scrollbar is present...
  modalBody.className = (modalBody.offsetHeight < modalBody.scrollHeight && !headerCloseButton) ? 'modalBody modalBody_border' : 'modalBody modalBody_border_normal';

  window.onresize = () => {
    modalBody.className = (modalBody.offsetHeight < modalBody.scrollHeight && !headerCloseButton) ? 'modalBody modalBody_border' : 'modalBody modalBody_border_normal';
  }

};

export function _applyWrapper() {

  if (!document.getElementById('wrapper')) {

    const wrapper = document.createElement('div');
    wrapper.id    = 'wrapper';
    wrapper.setAttribute('aria-hidden', true);

    const excludedElement = document.getElementsByClassName('modalOverlay')[0].parentElement;

    while (document.body.firstChild) {
      wrapper.appendChild(document.body.firstChild);
    }

    document.body.appendChild(wrapper);
    document.body.appendChild(excludedElement);
  }

};

export function _removeWrapper() {
  const wrapper = document.getElementById('wrapper');
  if (!wrapper) return;

  wrapper.setAttribute('aria-hidden', false);

  const excludedElement = document.getElementsByClassName('modalOverlay')[0].parentElement;

  while (wrapper.firstChild) {
    document.body.appendChild(wrapper.firstChild);
  }

  document.body.removeChild(wrapper);
  document.body.appendChild(excludedElement);
};

export function _renderFooter(footerVisible, text, disableSuccessBtn, footerClassNames) {
  if (footerVisible) {
    return(
      <div className={`modalFooter ${footerClassNames ? footerClassNames:''}`} >
        <button onClick={this.cancelBtnHandler} className="modalCancel pe-btn--btn_large">{text.modalCancelButtonText}</button>
        <button onClick={this.successBtnHandler} className="modalSave pe-btn__primary--btn_large" disabled={disableSuccessBtn}>{text.modalSaveButtonText}</button>
      </div>
    )
  };

};
