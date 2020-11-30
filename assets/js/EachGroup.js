import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import socket from "./socket";

function EachGroup(props) {
  const [singleGroup, setSingleGroup] = useState({});
  const [msg, setMsg] = useState("");
  const [allMsgs, setAllMsgs] = useState([]);
  const [roomC, setRoomC] = useState();
  useEffect(() => {
    axios.get(`/api/rooms/${props.match.params.id}`).then((res) => {
      setSingleGroup(res.data.data);
    });

    let roomChannel = socket.channel("rooms:" + props.match.params.id);
    roomChannel
      .join()
      .receive("ok", (res) => {
        setRoomC(roomChannel);
        console.log(`Joined: ${res}`);
      })
      .receive("error", (res) => console.log(`Error: ${res}`));
  }, []);

  useEffect(() => {
    let roomChannel = socket.channel("rooms:" + props.match.params.id);
    roomChannel
      .join()
      .receive("ok", (res) => {
        setRoomC(roomChannel);
        console.log(`Joined: ${res}`);
      })
      .receive("error", (res) => console.log(`Error: ${res}`));

    console.log("reached");
    roomChannel.on("new_chat", (res) => {
      setAllMsgs([...allMsgs, res.body]);
    });
  }, [allMsgs]);

  const handleSubmitMsg = (e) => {
    e.preventDefault();

    roomC
      .push("new_chat", { body: msg })
      .receive("ok", (res) => {
        roomC.on("new_chat", (res) => {
          setAllMsgs([...allMsgs, res.body]);
        });
      })
      .receive("error", (e) => {
        console.log(e);
      });
  };

  return (
    <div className="container mt-3">
      <h2>{singleGroup.name}</h2>
      <h4>{singleGroup.description}</h4>
      <form action="" onSubmit={handleSubmitMsg}>
        <label htmlFor="msg">
          <h4>Message</h4>
        </label>
        <input
          id="msg"
          value={msg}
          type="text"
          className="form-control"
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <button type="submit" className="btn btn-primary mt-3">
          Message
        </button>
      </form>
      {allMsgs.length > 0
        ? allMsgs.map((msg, i) => {
            return (
              <div key={i} className="">
                {msg}
              </div>
            );
          })
        : null}
    </div>
  );
}

export default withRouter(EachGroup);
