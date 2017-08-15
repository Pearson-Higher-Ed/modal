import React, { Component } from 'react';
import { injectIntl }       from 'react-intl';
import { messages }         from './translations/defaultMessages';
import { Button }           from 'pearson-compounds';

import { Modal as ModalWithOutFooter } from '../index';
import { Modal as ModalWithFooter }    from '../index';
import { Modal as ModalWithoutClose }  from '../index';

class ModalPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstModalIsShown  : false,
      secondModalIsShown : false,
    };

    this.firstButtonHandler  = _firstButtonHandler.bind(this);
    this.secondButtonHandler = _secondButtonHandler.bind(this);
    this.thirdButtonHandler  = _thirdButtonHandler.bind(this);

  }

  render() {

    const { firstModalIsShown, secondModalIsShown, thirdModalIsShown } = this.state;

    // ======================Internationalization Example=======================
    // intl prop is injected by the injectIntl() at the bottom of the page...
    // Provider Context wraps the root element in demo.js.

    const { intl } = this.props;

    // do the intl string replacement...
    const text =  {
      initiatingButtonText  : intl.formatMessage(messages.initiatingButtonText),
      initiatingButtonText2 : intl.formatMessage(messages.initiatingButtonText2),
      initiatingButtonText3 : intl.formatMessage(messages.initiatingButtonText3),
      headerTitle           : intl.formatMessage(messages.headerTitle),
      bodyText              : intl.formatMessage(messages.bodyText),
      closeButtonSRText     : intl.formatMessage(messages.closeButtonSRText),
      modalSaveButtonText   : intl.formatMessage(messages.modalSaveButtonText),
      modalCancelButtonText : intl.formatMessage(messages.modalCancelButtonText),
      srHeaderText          : intl.formatMessage(messages.srHeaderText)
    };

    //Pass custom styles/classes into the component desired.
    const customClassNames = {
      base: 'pe-template__static-large'
    }
    const customStyles = {
      content: {
        top: '50%'
      }
    }
    const footerClassNames = 'myFooterClassName';
    

    return (
        <div className="displaySection">
          <h1><a href="http://pearson-higher-ed.github.io/design/c/modal/">Modal</a></h1>
          <br />
          <p className="summary" >Modal interrupts the user with a message or request for certain actions with a block of content on top of the main view.</p>
          <br />
          <div className="elementContainer">

            <ModalWithFooter id="modalWithFooter" isShown={firstModalIsShown} disableSuccessBtn={false} text={text} srHeaderText={text.srHeaderText} footerVisible={true} cancelBtnHandler={() => this.setState({firstModalIsShown:false})} successBtnHandler={() => this.setState({firstModalIsShown:false})} customClassNames={customClassNames} customStyles={customStyles} footerClassNames={footerClassNames}>
              <p>{text.bodyText}</p>
              <button onClick={() => this.setState({firstModalIsShown:false})}>Close Modal</button>
            </ModalWithFooter>

            <ModalWithOutFooter id="modalWithOutFooter" isShown={secondModalIsShown} text={text} srHeaderText={text.srHeaderText} footerVisible={false} cancelBtnHandler={() => this.setState({secondModalIsShown:false})} successBtnHandler={() => this.setState({secondModalIsShown:false})} >
              <p>{text.bodyText}</p>
            </ModalWithOutFooter>

            <ModalWithoutClose id="modalWithOutClose" isShown={thirdModalIsShown} text={text} srHeaderText={text.srHeaderText} footerVisible={false} hideCloseButton={true} cancelBtnHandler={() => this.setState({thirdModalIsShown:false})} successBtnHandler={() => this.setState({thirdModalIsShown:false})} >
              <p>{text.bodyText}</p>
            </ModalWithoutClose>
            <Button
              btnType="primary"
              btnSize="xlarge"
              onClick={this.firstButtonHandler}
              >
              {text.initiatingButtonText}
            </Button>

            <br />
            <br />

            <Button
              btnType="cta"
              btnSize="xlarge"
              onClick={this.secondButtonHandler}
              >
              {text.initiatingButtonText2}
            </Button>

            <br />
            <br />

            <Button
              btnType="cta"
              btnSize="xlarge"
              onClick={this.thirdButtonHandler}
              >
              {text.initiatingButtonText3}
            </Button>
          </div>

          <div className="code">
            <h2>Props:</h2>
            <ul>
              <li>text:Object === 'initiatingButtonText', 'headerTitle', 'bodyText', 'closeButtonSRText', 'modalSaveButtonText', 'modalCancelButtonText'</li>
              <li>footerVisible:Boolean === true/false (close button and footer are mutually exclusive.)</li>
              <li>isShown:Boolean === true/false (opens the modal when true)</li>
              <li>disableSuccessBtn:Boolean === true/false (disables the success button when footer is shown)</li>
              <li>successBtnHandler:Function === () => console.log("success")</li>
              <li>cancelBtnHandler:Function === () => console.log("cancel") function to handle closing modal should set of modalIsOpen to false</li>
              <li>shouldCloseOnOverlayClick:Boolean === true/false, defaults to True (allow clicking on overlay to close modal)</li>
              <li>hideCloseButton:Boolean === true/false, defaults to False (hide close button)</li>
              <li>srHeaderText:String(Required) === Basic text to be read by screen reader when no header is present)</li>
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
          <p>Modal also accepts children for addtional custom configureation:</p>
          <p className="code">{'<Modal isShown={true} text={text} footerVisible={true} successBtnHandler={() => console.log("Success!!")} ><p>hi there</p></Modal>'}</p>
          <p>Import Multiple Modals:</p>
          <p className="code">{"import { Modal as ModalWithFooter } from '@pearson-components/modal';"}</p>
          <p className="code">{"import { Modal as ModalWithOutFooter } from '@pearson-components/modal';"}</p>
          <p className="code">{'<ModalWithFooter isShown={firstModalIsShown} disableSuccessBtn={false} text={text} srHeaderText={text.srHeaderText} footerVisible={true} cancelBtnHandler={() => this.setState({firstModalIsShown:false})} successBtnHandler={() => console.log("Success!!!!!!")} ><p>{text.bodyText}</p></ModalWithFooter>'}</p>
          <p className="code">{'<ModalWithOutFooter isShown={secondModalIsShown} text={text} footerVisible={false} srHeaderText={text.srHeaderText} cancelBtnHandler={() => this.setState({secondModalIsShown:false})} successBtnHandler={() => console.log("Success!!!!!!")} ><p>{text.bodyText}</p></ModalWithOutFooter>'}</p>
          <p className="code">{'<modalWithOutClose isShown={thirdModalIsShown} text={text} footerVisible={false} srHeaderText={text.srHeaderText} hideCloseButton={true} cancelBtnHandler={() => this.setState({thirdModalIsShown:false})} successBtnHandler={() => console.log("Success!!!!!!")} ><p>{text.bodyText}</p></ModalWithoutClose>'}</p>
        </div>
      )
    }

}


export default injectIntl(ModalPage);


function _firstButtonHandler (){
  this.setState({firstModalIsShown:true});
}

function _secondButtonHandler (){
  this.setState({secondModalIsShown:true});
}

function _thirdButtonHandler (){
  this.setState({thirdModalIsShown:true});
}

function _cancelBtnHandler (){
  this.setState({modalIsOpen:false});
}

function _successBtnHandler() {
  console.log("Success!!!");
}
