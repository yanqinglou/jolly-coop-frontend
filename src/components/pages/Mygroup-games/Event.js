import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import Form from "react-bootstrap/Form";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, CloseButton } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import * as dayjs from "dayjs";

const Event = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [msg, setmsg] = useState("");
  const [event, setevent] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setmsg("");
    setShow(true);
  };

  const createEvent = () => {
    const eventObj = {
      UserId: props.userId,
      GroupId: props.groupId,
      enddate: startDate,
      status: "on-going",
    };
    API.createEvent(eventObj, props.token).then((data) => {
      setmsg("Event has been created!");
      findEvent();
    });
  };

  const findEvent = () => {
    API.findEventinaGroup(props.groupId, props.token).then((data) => {
      setevent(data);
    });
  };

  const deleteEvent = (e) => {
    e.preventDefault();
    const eventId = e.target.value
    API.deleteEventinaGroup(eventId, props.token).then((data) => {
      console.log(data);
      findEvent();
    });
  };

  useEffect(() => {
    findEvent();
  }, []);

  return (
    <div className="event">
      <Form.Text className="text-muted">Next group event:</Form.Text>
      <div className="eventcontainer">
        {event.map((event) => (
          <div className="futureevent example_e">
            <img src="https://cdn-icons-png.flaticon.com/512/1362/1362048.png"></img>
            <ul key={event.id}>
              <li>
                Time:{" "}
                <strong>
                  {dayjs(event.enddate).format("MMM-DD-YYYY hh:mm A")}
                </strong>
              </li>
              <li>
                status: <strong>{event.status}</strong>
              </li>
            </ul>
            {event.UserId === props.userId && (
              <CloseButton
                aria-label="Hide"
                className="futureeventDelete"
                value={event.id}
                onClick={deleteEvent}
              ></CloseButton>
            )}
          </div>
        ))}
      </div>
      <button className="button-74" onClick={handleShow}>
        Create new event
      </button>
      <br></br>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Text>Select date and time:</Form.Text>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          <Form.Label variant="danger">{msg}</Form.Label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={createEvent}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Event;
