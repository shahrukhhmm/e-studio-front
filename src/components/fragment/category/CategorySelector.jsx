import React, { useEffect, useState } from "react";
import "./CategorySelector.scss";
import { getGroups } from "../../lib/helper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CategorySelector = ({ categories, onSelectCategory }) => {
  const id = useSelector((state) => state?.musicReducer?.user?._id);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const getAllGroups = async () => {
    const response = await getGroups(id);
    if (response) {
      setGroups(response);
    } else {
      console.log("error fetching groups");
    }
  };

  useEffect(() => {
    getAllGroups();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="category-selector">
      <h2>Select a Group</h2>
      <div className="category-list">
        {groups?.map((group, index) => (
          <div
            key={index}
            className={`category-item `}
            onClick={() =>
              navigate(`/chat-room/${group?._id}`, { replace: true })
            }
          >
            {group?.groupName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
