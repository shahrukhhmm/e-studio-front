import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleUserSelection } from "../../../actions/actions";
import { fetchAllUsers } from "../../lib/helper";
import { Link } from "react-router-dom";

const Users = ({ category }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const { selectedUsers, roomName } = useSelector(
    (state) => state.musicReducer
  );

  // Define categories array
  const categories = [
    "Piano",
    "Singer",
    "Guitarist",
    "Bassist",
    "Drummer",
    "Keyboardist",
    "Violinist",
    "Flutist",
    "Saxophonist",
    "Rapper",
  ];

  // Function to get a random category
  const getRandomCategory = () => {
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  };

  const getUsers = async () => {
    try {
      const response = await fetchAllUsers();
      if (response.data) {
        // Adding category to each user object
        const usersWithCategory = response.data.map((user) => ({
          ...user,
          category: getRandomCategory(),
        }));
        setUsers(usersWithCategory);
      } else {
        console.log("error fetching users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const isUserSelected = (user) =>
    selectedUsers.some(
      (selectedUser) =>
        selectedUser.name === user.name && selectedUser.roomName === roomName
    );

  const handleUserSelection = (user) => {
    dispatch(toggleUserSelection(user, roomName));
  };

  return (
    <div className="users">
      <h2>Select Artists / Users For Band</h2>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="user-list">
          {users.map((user, index) => (
            <div key={index} className="user-card">
              <div className="user-avatar">
                <img
                  alt="user avatar"
                  src={`https://dummyimage.com/84x84&text=${user.name.charAt(
                    0
                  )}`}
                />
              </div>
              <div className="user-info">
                <h3>{user?.name}</h3>
                <p>Followers: {user?.followers?.length}</p>
                <p>Following: {user?.following?.length}</p>
                <p style={{ display: "flex", flexDirection: "column" }}>
                  Category:{" "}
                  {user?.songsByCategory && user?.songsByCategory?.length > 0 ? (
                    user.songsByCategory.map((category, index) => (
                      <span key={index}>{category.category}</span>
                    ))
                  ) : (
                    <>No songs uploaded by this user</>
                  )}
                </p>

                <div className="user-actions">
                  <input
                    id={`user-${index}-checkbox`}
                    type="checkbox"
                    checked={isUserSelected(user)}
                    onChange={() => handleUserSelection(user)}
                    className={`user-checkbox custom-checkbox ${isUserSelected(user) ? "checked" : ""
                      }`}
                  />
                  <Link to={`/user/${user._id}`}>
                    <button className="view-profile-button">View Profile</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
