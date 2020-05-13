import React, { Component }     from 'react';
import PropTypes                from 'prop-types';
import { default as BaseModal } from 'react-modal';
import ally                     from 'ally.js';

import '../scss/Modal.scss';


export default class Modal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      shiftTab: false,
      tab: false,
      overlayPadding: ''
    };
  };

  componentDidMount() {
    window.addEventListener('resize', this.setDimensions);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && !nextProps.isShown && this.props.isShown) {
      this.removeOverlayStyle();
      this.removeWrapper();
    }
  }

  handleKeyDown = (event) => {
    if (!event.shiftKey && event.which === 9 && !this.state.tab) {
      return this.setState({ tab: true });
    }

    if (event.shiftKey && event.which === 9 && !this.state.shiftTab && !this.state.tab) {
      event.preventDefault();
      this.setState({ shiftTab: true });
      const tabbableConfig = { context: '.modalContent' };
      const tabbableElements = ally.query.tabbable(tabbableConfig);
      tabbableElements[tabbableElements.length-1].focus();
    }
  };

  afterOpen = () => {
    const modalContent = document.getElementsByClassName('modalContent')[0];
    // apply accessibility wrapper if no appElement is given
    if (!this.props.appElement) {
      this.applyWrapper();
    }

    // apply Focus to close button on open...
    modalContent.focus();
    modalContent.addEventListener('keydown', this.handleKeyDown);

    this.setDimensions();
  };

  onClose = () => {
    this.cancelBtnHandler();
    this.setState({
      shiftTab: false,
      tab: false
    });
    window.removeEventListener('resize', this.setDimensions);
  };

  successBtnHandler = () => {
    this.removeOverlayStyle();
    this.removeWrapper();
    this.props.successBtnHandler.call(this);
  };

  cancelBtnHandler = () => {
    this.removeOverlayStyle();
    this.removeWrapper();
    this.props.cancelBtnHandler.call(this);
  };

  removeOverlayStyle = () => {
    const modalBody    = document.getElementsByClassName('modalBody')[0];
    const modalOverlay = document.getElementsByClassName('modalOverlay')[0];

    modalBody.style.maxHeight        = '';
    modalOverlay.style.paddingTop    = '';
    modalOverlay.style.paddingBottom = '';
  };

  setDimensions = () => {
    const modalBody = document.getElementsByClassName('modalBody')[0];
    const headerCloseButton = document.getElementsByClassName('modalClose')[0];
    const modalContent = document.getElementsByClassName('modalContent')[0];
    const modalOverlay = document.getElementsByClassName('modalOverlay')[0];
    const header = document.getElementsByClassName('modalHeader')[0];
    const footer = document.getElementsByClassName('modalFooter')[0];

    // apply padding based on clientHeight...
    const windowHeight  = window.innerHeight;
    const paddingHeight = (windowHeight - modalContent.offsetHeight) / 2;
    const headerHeight  = header.getBoundingClientRect().height;
    const footerHeight  = footer ? footer.getBoundingClientRect().height : 0;

    this.setState({ overlayPadding: paddingHeight > 20 ? `${paddingHeight}px` : '20px' });

    modalBody.style.maxHeight = (this.props.scrollWithPage || !this.props.footerVisible)
      ? 'none' : `${windowHeight - (headerHeight + footerHeight + 120)}px`;
    // conditional borders on modalbody if scrollbar is present...
    modalBody.className = (modalBody.offsetHeight < modalBody.scrollHeight && !headerCloseButton) ? 'modalBody modalBody_border' : 'modalBody modalBody_border_normal';
  };

  applyWrapper = () => {
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

  removeWrapper = () => {
    const wrapper = document.getElementById('wrapper');
    if (!wrapper) { return; }

    wrapper.setAttribute('aria-hidden', false);

    const excludedElement = document.getElementsByClassName('modalOverlay')[0].parentElement;

    while (wrapper.firstChild) {
      document.body.appendChild(wrapper.firstChild);
    }

    document.body.removeChild(wrapper);
    document.body.appendChild(excludedElement);
  };

  render() {
    const { isShown, footerVisible, text, children, disableSuccessBtn,
            shouldCloseOnOverlayClick, hideCloseButton, srHeaderText, headerClass,
            scrollWithPage, saveBtnId, shouldReturnFocusAfterClose, className } = this.props;

    return (
          <BaseModal
            className        = {`pe-template__static-medium modalContent ${className}`}
            overlayClassName = "modalOverlay"
            isOpen           = {isShown}
            onAfterOpen      = {this.afterOpen}
            onRequestClose   = {this.onClose}
            role             = "dialog"
            contentLabel     = "Modal"
            shouldCloseOnOverlayClick = {shouldCloseOnOverlayClick}
            appElement       = {this.props.appElement}
            ariaHideApp      = {this.props.ariaHideApp}
            style            = {{
              overlay: {
                overflowY: (scrollWithPage || !footerVisible) ? 'auto' : null,
                paddingTop: this.props.overlayPadding || this.state.overlayPadding
              }
            }}
            aria             = {{
              labelledby  : 'modalHeaderText',
              modal       : true
            }}
            shouldReturnFocusAfterClose={shouldReturnFocusAfterClose}
    	    >

            <div role="document">
              {this.props.displayErrorBanner && (
                <div className={this.props.bannerWrapperClass}>
                  <p className="pe-label">{text.bannerBody}</p>
                  {this.props.secondaryLinkCallback && (
                    <button
                      type="button"
                      onClick={() => this.props.secondaryLinkCallback && this.props.secondaryLinkCallback()}
                      className="pe-link"
                    >
                      {text.link}
                    </button>
                  )}
                  <button
                    type="button"
                    className="pe-icon--btn"
                    onClick={() => this.props.closeBanner && this.props.closeBanner()}
                    aria-label={text.closeButtonSRText}
                  >
                    <svg
                      role="img"
                      ariaLabelledby="close-banner-button"
                      focusable="false"
                      className="pe-icon--remove-sm-24"
                    >
                      <title id="close-banner-button">Close banner</title>
                      <use xlinkHref="#remove-sm-24"></use>
                    </svg>
                  </button>
                </div>
              )}
              <div id="modalHeader" className={`modalHeader ${headerClass}`}>
                {!footerVisible && !hideCloseButton &&
                  <button
                    type="button"
                    className="modalClose pe-icon--btn"
                    onClick={this.cancelBtnHandler}
                    aria-label={text.closeButtonSRText}
                  >
                    <svg
                      role="img"
                      ariaLabelledby="close-modal-button"
                      focusable="false"
                      className="pe-icon--remove-sm-24"
                    >
                      <title id="close-modal-button">Close modal</title>
                      <use xlinkHref="#remove-sm-24"></use>
                    </svg>
                  </button>}
                {text.headerTitle  &&
                  <h2 id="modalHeaderText" className="modalHeaderText pe-title">
                    {text.headerTitle}
                    {this.props.postTitleText &&
                      <span>
                        <span>&nbsp;</span>
                        <span className={this.props.postTitleTextClass}>{this.props.postTitleText}</span>
                      </span>
                    }
                  </h2>}
                {!text.headerTitle &&
                  <span id="modalHeaderText" className="pe-sr-only">
                    {srHeaderText}
                  </span>}
              </div>

              <div className="modalBody" tabIndex={0}>
                {children}
              </div>
              {footerVisible && (
                <div className="modalFooter">
                  <button
                    onClick={this.successBtnHandler}
                    className="modalSave pe-btn__primary--btn_large"
                    id={saveBtnId}
                    disabled={disableSuccessBtn}
                  >
                    {text.modalSaveButtonText}
                  </button>
                  <button
                    onClick={this.cancelBtnHandler}
                    className="modalCancel pe-btn--btn_large"
                  >
                    {text.modalCancelButtonText}
                  </button>
                </div>
              )}
            </div>
          </BaseModal>
    )

  };

};


Modal.propTypes = {
  className                   : PropTypes.string,
  text                        : PropTypes.object.isRequired,
  srHeaderText                : PropTypes.string.isRequired,
  headerClass                 : PropTypes.string,
  successBtnHandler           : PropTypes.func,
  cancelBtnHandler            : PropTypes.func,
  footerVisible               : PropTypes.bool,
  shouldCloseOnOverlayClick   : PropTypes.bool,
  hideCloseButton             : PropTypes.bool,
  isShown                     : PropTypes.bool,
  disableSuccessBtn           : PropTypes.bool,
  ariaHideApp                 : PropTypes.bool,
  appElement                  : PropTypes.instanceOf(Element),
  scrollWithPage              : PropTypes.bool,
  saveBtnId                   : PropTypes.string,
  postTitleText               : PropTypes.string,
  postTitleTextClass          : PropTypes.string,
  shouldReturnFocusAfterClose : PropTypes.bool,
  displayErrorBanner          : PropTypes.bool,
  bannerWrapperClass          : PropTypes.string,
  closeBanner                 : PropTypes.func,
  secondaryLinkCallback       : PropTypes.func,
  overlayPadding              : PropTypes.string
};

Modal.defaultProps = {
  className: '',
  shouldCloseOnOverlayClick: true,
  headerClass: '',
  scrollWithPage: false,
  postTitleTextClass: '',
  shouldReturnFocusAfterClose: true,
  displayErrorBanner: false
};
