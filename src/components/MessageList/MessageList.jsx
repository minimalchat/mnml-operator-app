import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import './MessageList.css';
import Message from '../Message/Message.jsx';

/**
 * @summary: responsible for handling the display of messages.
 */

const MessageList = (props) => {
  const { messages, activeId } = props;
  const activeMsgs = messages.filter(msg => msg.chat === activeId);

  // render a map of <Message> components with their contents.
  const renderView = () => {
    if (!activeId) return (<div className="MessageList__empty"> No chat selected </div>);
    return activeMsgs.map((msg, index) => {
      const key = `${index}_${msg.chat}`;
      return <Message key={key} type={msg.author}>{msg.content}</Message>;
    });
  };


  return (
    <div className="MessageList">
      <ul className="MessageList__box">
        { renderView() }
      </ul>
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  activeId: PropTypes.string,
};


const mapStateToProps = state => ({
  messages: state.chat.messages,
  activeId: state.chat.activeId,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});


// Hook into redux
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageList);

