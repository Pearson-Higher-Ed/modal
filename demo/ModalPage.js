import React, { Component } from 'react';
import { injectIntl }       from 'react-intl';
import { messages }         from './translations/defaultMessages';

import { Modal as ModalWithOutFooter } from '../index';
import { Modal as ModalWithFooter }    from '../index';
import { Modal as ModalWithoutClose }  from '../index';
import { Modal as ModalWithAppWrapper }  from '../index';
import { Modal as ModalScroll }  from '../index';

class ModalPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstModalIsShown  : false,
      secondModalIsShown : false,
      thirdModalIsShown  : false,
      fourthModalIsShown : false,
      fifthModalIsShown  : false,
      sixthModalIsShown  : false
    };

    this.firstButtonHandler  = _firstButtonHandler.bind(this);
    this.secondButtonHandler = _secondButtonHandler.bind(this);
    this.thirdButtonHandler  = _thirdButtonHandler.bind(this);
    this.fourthButtonHandler = _fourthButtonHandler.bind(this);
    this.fifthButtonHandler  = _fifthButtonHandler.bind(this);
    this.sixthButtonHandler  = _sixthButtonHandler.bind(this);

  }

  render() {

    const { firstModalIsShown, secondModalIsShown, thirdModalIsShown, fourthModalIsShown, fifthModalIsShown, sixthModalIsShown } = this.state;

    // ======================Internationalization Example=======================
    // intl prop is injected by the injectIntl() at the bottom of the page...
    // Provider Context wraps the root element in demo.js.

    const { intl } = this.props;

    // do the intl string replacement...
    const text =  {
      initiatingButtonText  : intl.formatMessage(messages.initiatingButtonText),
      initiatingButtonText2 : intl.formatMessage(messages.initiatingButtonText2),
      initiatingButtonText3 : intl.formatMessage(messages.initiatingButtonText3),
      initiatingButtonText4 : intl.formatMessage(messages.initiatingButtonText4),
      initiatingButtonText6 : intl.formatMessage(messages.initiatingButtonText6),
      headerTitle           : intl.formatMessage(messages.headerTitle),
      bodyText              : intl.formatMessage(messages.bodyText),
      closeButtonSRText     : intl.formatMessage(messages.closeButtonSRText),
      modalSaveButtonText   : intl.formatMessage(messages.modalSaveButtonText),
      modalCancelButtonText : intl.formatMessage(messages.modalCancelButtonText),
      srHeaderText          : intl.formatMessage(messages.srHeaderText)
    };


    return (
        <div className="displaySection">
          <h1><a href="http://pearson-higher-ed.github.io/design/c/modal/">Modal</a></h1>
          <br />
          <p className="summary" >Modal interrupts the user with a message or request for certain actions with a block of content on top of the main view.</p>
          <br />
          <div className="elementContainer">

            <ModalWithFooter
              id="modalWithFooter"
              className="modal-with-footer"
              isShown={firstModalIsShown}
              disableSuccessBtn={false}
              text={text}
              srHeaderText={text.srHeaderText}
              footerVisible={true}
              cancelBtnHandler={() => this.setState({firstModalIsShown:false})}
              successBtnHandler={() => this.setState({firstModalIsShown:false})}>
              <p>{text.bodyText}</p>
              <button onClick={() => this.setState({firstModalIsShown:false})}>Close Modal</button>
            </ModalWithFooter>

            <ModalWithOutFooter
              id="modalWithOutFooter"
              isShown={secondModalIsShown}
              text={text}
              srHeaderText={text.srHeaderText}
              footerVisible={false}
              cancelBtnHandler={() => this.setState({secondModalIsShown:false})}
              successBtnHandler={() => this.setState({secondModalIsShown:false})}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
              </p>
            </ModalWithOutFooter>

            <ModalWithoutClose
              id="modalWithOutClose"
              className="modal-without-close"
              isShown={thirdModalIsShown}
              text={text}
              srHeaderText={text.srHeaderText}
              footerVisible={false}
              hideCloseButton={true}
              cancelBtnHandler={() => this.setState({thirdModalIsShown:false})}
              successBtnHandler={() => this.setState({thirdModalIsShown:false})}>
              <p>{text.bodyText}</p>
            </ModalWithoutClose>

            <ModalWithAppWrapper
              id="ModalWithAppWrapper"
              isShown={fourthModalIsShown}
              text={text}
              srHeaderText={text.srHeaderText}
              footerVisible={true}
              cancelBtnHandler={() => this.setState({fourthModalIsShown: false})}
              successBtnHandler={() => this.setState({fourthModalIsShown:false})}
              ariaHideApp={true} appElement={document.getElementById('app')} >
              <p>{text.bodyText}</p>
            </ModalWithAppWrapper>

            <ModalScroll
              id="modalScroll"
              scrollWithPage
              isShown={fifthModalIsShown}
              disableSuccessBtn={false}
              text={text}
              srHeaderText={text.srHeaderText}
              footerVisible={true}
              cancelBtnHandler={() => this.setState({fifthModalIsShown:false})}
              successBtnHandler={() => this.setState({fifthModalIsShown:false})}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias reprehenderit illum, incidunt corrupti laborum. Qui necessitatibus quisquam incidunt. Quos, inventore ullam? Odio delectus eum, quisquam nisi dolor eveniet laboriosam ab?
              </p>
            </ModalScroll>

            <ModalWithFooter
              id="modalWithFooter"
              isShown={sixthModalIsShown}
              disableSuccessBtn={false}
              text={text}
              srHeaderText={text.srHeaderText}
              footerVisible={true}
              saveBtnId="save-button-styles"
              cancelBtnHandler={() => this.setState({sixthModalIsShown:false})}
              successBtnHandler={() => this.setState({sixthModalIsShown:false})}>
              <p>{text.bodyText}</p>
              <button onClick={() => this.setState({sixthModalIsShown:false})}>Close Modal</button>
            </ModalWithFooter>

            <button
              className="pe-btn__primary--btn_xlarge"
              onClick={this.firstButtonHandler}
            >
              {text.initiatingButtonText}
            </button>

            <br />
            <br />

            <button
              className="pe-btn__cta--btn_xlarge"
              onClick={this.secondButtonHandler}
            >
              {text.initiatingButtonText2}
            </button>

            <br />
            <br />

            <button
              className="pe-btn__cta--btn_xlarge"
              onClick={this.thirdButtonHandler}
            >
              {text.initiatingButtonText3}
            </button>

            <br />
            <br />

            <button
              className="pe-btn__cta--btn_xlarge"
              onClick={this.fourthButtonHandler}
            >
              {text.initiatingButtonText4}
            </button>

            <br/>
            <br/>

            <button
              className="pe-btn__cta--btn_xlarge"
              onClick={this.fifthButtonHandler}
            >
              Modal that scrolls the page
            </button>

            <br/>
            <br/>

            <button
              className="pe-btn__cta--btn_xlarge"
              onClick={this.sixthButtonHandler}
            >
              {text.initiatingButtonText6}
            </button>
          </div>

          <div className="code">
            <h2>Props:</h2>
            <ul className="prop-list">
              <li>text:Object === 'initiatingButtonText', 'headerTitle', 'bodyText', 'closeButtonSRText', 'modalSaveButtonText', 'modalCancelButtonText'</li>
              <li>footerVisible:Boolean === true/false (close button and footer are mutually exclusive.)</li>
              <li>isShown:Boolean === true/false (opens the modal when true)</li>
              <li>disableSuccessBtn:Boolean === true/false (disables the success button when footer is shown)</li>
              <li>successBtnHandler:Function === () => console.log("success")</li>
              <li>cancelBtnHandler:Function === () => console.log("cancel") function to handle closing modal. Should set modalIsOpen to false</li>
              <li>shouldCloseOnOverlayClick:Boolean === true/false, defaults to True (allow clicking on overlay to close modal)</li>
              <li>hideCloseButton:Boolean === true/false, defaults to False (hide close button)</li>
              <li>srHeaderText:String(Required) === Basic text to be read by screen reader when no header is present)</li>
              <li>headerClass:String === Allows the passing of additional class names to the Modal's header.</li>
              <li>scrollWithPage:Boolean</li>
              <li>Allows the Modal to extend beyond the page with excess content.</li>
              <li>saveBtnId:String === Allows the passing of an id to provide more customizable styling</li>
            </ul>
          </div>
          <div className="code">
            <h2>Install:</h2>
            <p>npm install @pearson-components/modal --save</p>
          </div>
          <br />
          <p className="code">{"import { Modal } from '@pearson-components/modal';"}</p>
          <p className="code">{'<Modal isShown={firstModalIsShown} text={text} srHeaderText={text.srHeaderText} footerVisible={true} disableSuccessBtn={false} cancelBtnHandler={() => this.setState({firstModalIsShown:false})} successBtnHandler={() => console.log("Success!!!!!!")} ><p>{text.bodyText}</p></Modal>'}</p>
          <br />
          <p>Modal also accepts children for additional custom configuration:</p>
          <p className="code">{'<Modal isShown={true} text={text} footerVisible={true} successBtnHandler={() => console.log("Success!!")} ><p>hi there</p></Modal>'}</p>
          <p>Import Multiple Modals:</p>
          <p className="code">{"import { Modal as ModalWithFooter } from '@pearson-components/modal';"}</p>
          <p className="code">{"import { Modal as ModalWithOutFooter } from '@pearson-components/modal';"}</p>
          <p className="code">{'<ModalWithFooter className="modal-with-footer" isShown={firstModalIsShown} disableSuccessBtn={false} text={text} srHeaderText={text.srHeaderText} footerVisible={true} cancelBtnHandler={() => this.setState({firstModalIsShown:false})} successBtnHandler={() => console.log("Success!!!!!!")} ><p>{text.bodyText}</p></ModalWithFooter>'}</p>
          <p className="code">{'<ModalWithOutFooter isShown={secondModalIsShown} text={text} footerVisible={false} srHeaderText={text.srHeaderText} cancelBtnHandler={() => this.setState({secondModalIsShown:false})} successBtnHandler={() => console.log("Success!!!!!!")} ><p>{text.bodyText}</p></ModalWithOutFooter>'}</p>
          <p className="code">{'<modalWithOutClose className="modal-without-close" isShown={thirdModalIsShown} text={text} footerVisible={false} srHeaderText={text.srHeaderText} hideCloseButton={true} cancelBtnHandler={() => this.setState({thirdModalIsShown:false})} successBtnHandler={() => console.log("Success!!!!!!")} ><p>{text.bodyText}</p></ModalWithoutClose>'}</p>
          <p className="code">{`<ModalWithAppWrapper isShown={thirdModalIsShown} text={text} footerVisible={false} srHeaderText={text.srHeaderText} hideCloseButton={true} cancelBtnHandler={() => this.setState({thirdModalIsShown:false})} successBtnHandler={() => console.log("Success!!!!!!")} ariaHideApp={true} appElement={document.getElementById('app')}><p>{text.bodyText}</p></ModalWithAppWrapper>`}</p>
          <p className="code">{'<ModalWithFooter isShown={firstModalIsShown} disableSuccessBtn={false} text={text} srHeaderText={text.srHeaderText} footerVisible={true} saveBtnId="save-btn-styles" cancelBtnHandler={() => this.setState({firstModalIsShown:false})} successBtnHandler={() => console.log("Success!!!!!!")} ><p>{text.bodyText}</p></ModalWithFooter>'}</p>
        </div>
      )
  }

}


export default injectIntl(ModalPage);


function _firstButtonHandler () {
  this.setState({firstModalIsShown:true});
}

function _secondButtonHandler () {
  this.setState({secondModalIsShown:true});
}

function _thirdButtonHandler () {
  this.setState({thirdModalIsShown:true});
}

function _fourthButtonHandler () {
  this.setState({fourthModalIsShown:true});
}

function _fifthButtonHandler () {
  this.setState({fifthModalIsShown:true});
}

function _sixthButtonHandler () {
  this.setState({sixthModalIsShown:true});
}
