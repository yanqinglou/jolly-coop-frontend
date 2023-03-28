import React, { useState, useEffect } from "react";
import "./style.css";
import API from "../../../utils/API";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const members = [];

// const group= ('')
let memberIds = [];

const StartGroup = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [nameGroup, setnameGroup] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "groupName":
        setnameGroup(value);
        break;
      default:
        break;
    }
  };

  const getGroupName = (e) => {
    setInput(e.target.value);
  };
  // const getNewFriend = (e) => {
  //     setFriendInput(e.target.value)
  // }
  const addGroupName = () => {
    const copyName = [...name];
    copyName.push(input);
    setName([...name, input]);
    setInput("");

    const groupTitle = {
      name: copyName,
    };

    console.log(groupTitle);
    setnameGroup(copyName);
  };

  function containsObject(obj, list) {
    // console.log(obj,list)

    for (let i = 0; i < list.length; i++) {
      if (list[i].username === obj.username) {
        return true;
      }
    }

    return false;
  }
  const addMember = (e) => {
    // e.preventDefault();
    const member = {
      id: e.target.getAttribute("data-id"),
      username: e.target.getAttribute("data-username"),
    };

    if (!containsObject(member, groupMembers)) {
      members.push(member);
      // console.log(members)
      setGroupMembers([...groupMembers, member]);
      memberIds.push(member.id);
    }
    // console.log("groupMembers:", groupMembers)
    // setFriendInput("")
  };

  const removeUser = (id) => {
    const removed = groupMembers.filter((groupMember) => groupMember.id !== id);
    setGroupMembers(removed);
    const removedIds = memberIds.filter((groupMember) => groupMember !== id);
    memberIds = removedIds;
    // console.log(removedIds)
    // console.log(groupMembers)
    // console.log(memberIds)
  };

  const fetchFriends = (e) => {
    if (e.target.value == "") {
      setData([]);
      return;
    }

    const fetchUsers = async () => {
      const users = await API.getAllUsers();
      var newUsers = users.filter(function (user) {
        var username = user.username.toLowerCase();
        if (username.includes(e.target.value.toLowerCase())) {
          return user;
        }
      });
      // console.log(newUsers)
      setData(newUsers);
    };
    fetchUsers();
    // addMember()
    return;
  };
  const createNewMyGroups = async () => {
    const groupObj = {
      name: nameGroup,
      users: memberIds,
    };
    if (nameGroup.length === 0) {
      alert("you need a name!");
    } else if (groupObj.users.length === 0) {
      alert("you havent added anyone in the group! Please search for friends");
    } else {
      const newGroup = await API.createGroup(
        groupObj,
        localStorage.getItem("token")
      );
      return (window.location.href = "/mygroup");
    }

    // let path = `/mylist`;
    // navigate(path);
  };

  return (
    <div className="search-page">
      <div className="Group-Name">
        <h3>Name: </h3>
        <Form.Control
          className="GroupName"
          type="text"
          value={nameGroup}
          onChange={handleFormChange}
          placeholder="enter name of group"
          name="groupName"
        />
        <br />
      </div>
      <div className="main">
        <div className="Group-Card">
          <h3>{nameGroup}</h3>
          <div className="add-list">
            <ul>
              {groupMembers.map((groupMember, index) => {
                // console.log(groupMember)
                return (
                  <li key={index}>
                    {groupMember.username}{" "}
                    <button
                      className="delete-users"
                      onClick={() => removeUser(groupMember.id)}
                    >
                      -
                    </button>
                    <br />
                  </li>
                );
              })}
            </ul>
          </div>
          <br></br>
          <div className="options">
            <button className="button-74" onClick={createNewMyGroups}>
              Start the group
            </button>
          </div>
        </div>

        <div className="Search">
          <h3 >Search for friends</h3>
          <Form.Control
            className="search-input"
            onChange={fetchFriends}
            placeholder="Search by name"
          />
          <table>
            <tbody>
              {data.map((users, index) => {
                if (index < 5) {
                  return (
                    <tr key={index}>
                      <th>
                        {users.username}

                        <button
                          data-id={users.id}
                          data-username={users.username}
                          className="add-users"
                          id="add-member"
                          // value={friendInput}
                          // onChange={getNewFriend}
                          onClick={addMember}
                        >
                          +
                        </button>
                      </th>
                    </tr>
                  );
                } else return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default StartGroup;
