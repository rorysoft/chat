import React, { useState } from "react";
import { gql, useSubscription, useMutation } from "@apollo/client";

import { Button, Container, Row, Col, FormInput } from "shards-react";

import Messages from "./Messages";

const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      user
      content
    }
  }
`;

const POST_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const Chat = () => {
  const [chatState, setChatState] = useState({
    user: "Jack",
    content: "",
  });

  const { data, loading } = useSubscription(GET_MESSAGES);
  const [postMessage] = useMutation(POST_MESSAGE);

  const onSend = () => {
    if (chatState.content.length > 0) {
      postMessage({
        variables: chatState,
      });
    }
    setChatState({
      ...chatState,
      content: "",
    });
  };

  if (loading || !data.messages) return <Container>No content!</Container>;

  return (
    <Container>
      <Messages data={data} user={chatState.user} />
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          bottom: "5px",
          width: "100%",
        }}
      >
        <Col xs={2} style={{ padding: 0 }}>
          <FormInput
            label='User'
            value={chatState.user}
            onChange={(e) =>
              setChatState({ ...chatState, user: e.target.value })
            }
          />
        </Col>
        <Col xs={8}>
          <FormInput
            label='Content'
            value={chatState.content}
            onChange={(e) =>
              setChatState({ ...chatState, content: e.target.value })
            }
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                onSend();
              }
            }}
          />
        </Col>
        <Col xs={2} style={{ padding: 0 }}>
          <Button type='submit' onClick={() => onSend()}>
            Send
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
