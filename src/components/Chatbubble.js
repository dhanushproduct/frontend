import React from 'react';

const ChatBubble = ({ message, isSender, align }) => {
 
  const color = isSender == true
    ? 'bg-gray-800 text-white'
    : 'bg-slate-300 text-black';

  const alignment = align == 'left'
    ? 'float-left'
    : 'float-right';

  return (
    <div className={`max-w-xs mx-2 my-1 py-2 px-4 rounded-lg ${color} ${alignment}`}>
      {message}
    </div>
  );
};

export default ChatBubble;
