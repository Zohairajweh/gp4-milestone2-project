import * as React from 'react';
import { Component, Fragment } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { Message } from '../store/message/types';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { sendMessage } from '../store/message/actions';

export interface IMessageSendButtonProps {
  messageList: Message[];
  sendMessage: typeof sendMessage;
  loggedInUserId: number;
}

export class MessageSendButton extends Component<IMessageSendButtonProps> {

  onClickSendMessage() {
    const { messageList, loggedInUserId  } = this.props
    let unsentMessages: Message[]
    let currentMessage: Message
    unsentMessages = messageList.filter(individualMessage => (!individualMessage.hasBeenSent));
    currentMessage = unsentMessages.filter(individualMessage => (individualMessage.fromUserId === loggedInUserId))[0];
    if ( currentMessage !== undefined ) {
      if ( currentMessage.recipientUserIds.length > 0 && currentMessage.messageContent !== '' ) {
        this.props.sendMessage(currentMessage.messageId);
      }
    }
  }

  public render() {
    return (
      <Fragment>
          <Grid.Row>
            <Button
              content = 'Send'
              onClick={() => this.onClickSendMessage()} />        
          </Grid.Row>
      </Fragment>
    );
  }

}

const mapStateToProps = (state: RootState) => {
  return {
    // messageList: state.message.messageList
  };
}

export default connect(
  mapStateToProps,
  { sendMessage }
)(MessageSendButton);