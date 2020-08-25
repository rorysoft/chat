import React, { useEffect, useRef } from "react";

const Messages = ({ data, user }) => {
  const messagesEndRef = useRef();

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: messagesEndRef.current.scrollHeight,
    });
  });

  return (
    <div style={{ marginBottom: "50px" }} ref={messagesEndRef}>
      {data.messages.map(({ id, user: messageUser, content }) => (
        <div
          style={{
            display: "flex",
            justifyContent: user === messageUser ? "flex-end" : "flex-start",
            paddingBottom: "0.5em",
          }}
          key={id}
        >
          {user !== messageUser && (
            <div
              style={{
                height: 50,
                width: 50,
                marginRight: "0.5em",
                border: "2px solid #e5e6ea",
                borderRadius: 25,
                textAlign: "center",
                fontSize: "18pt",
                paddingTop: 5,
              }}
            >
              {messageUser.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div
            style={{
              background: user === messageUser ? "#58bf56" : "#e5e6ea",
              color: user === messageUser ? "white" : "black",
              padding: "0.75em",
              borderRadius: "1em",
              maxWidth: "60%",
              wordBreak: "break-all",
            }}
          >
            {content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
