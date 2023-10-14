import React, { useEffect, useState } from "react";
import { Pagination, Input, Select } from "antd";
import Button from "../components/Button";
import axios from "axios";
import "./userspage.css";

const Users = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("reset");
  const usersPerPage = 4;
  const { Option } = Select;

  const toggleUserProfile = (userId) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(userId);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const filteredData = userData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOrder === "asc") {
      filteredData.sort((a, b) => a.company.name.localeCompare(b.company.name));
    } else if (sortOrder === "desc") {
      filteredData.sort((a, b) => b.company.name.localeCompare(a.company.name));
    } else if (sortOrder === "reset") {
      setFilteredUsers(userData);
    }
    setFilteredUsers(filteredData);
  }, [searchQuery, sortOrder, userData]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <div className="sorting">
        <Select
          defaultValue="Sort"
          style={{ width: 120 }}
          onChange={handleSortChange}
          className="select"
          size="middle"
        >
          <Option value="asc">Ascending</Option>
          <Option value="desc">Descending</Option>
          <Option value="reset">Reset</Option>
        </Select>
        <Input
          placeholder="Search by name or company name"
          value={searchQuery}
          onChange={handleSearch}
          className="input"
        />
      </div>

      {currentUsers.map((user) => (
        <div className="card" key={user.id}>
          <div className="card-1">
            <div className="card-1-1">
              <div className="name">{user.company.name}</div>
              <div className="contact">
                <h3>Contact</h3>
                <p>{user.name}</p>
              </div>
              <div className="city">
                <h3>City</h3>
                <p>{user.address.city}</p>
              </div>
              <div className="street">
                <h3>Street</h3>
                <p>{user.address.street}</p>
              </div>
              <div className="view-details">
                <Button
                  className="view-btn"
                  text={
                    selectedUserId === user.id ? "Hide Details" : "View Details"
                  }
                  onClick={() => toggleUserProfile(user.id)}
                />
              </div>
            </div>
            {selectedUserId === user.id && (
              <div className={`user-profile show-profile`}>
                <h1 style={{ fontSize: "26px" }}>Description</h1>
                <p style={{ fontSize: "17px", marginTop: "5px" }}>
                  Providing service of domestic flight booking @ lowest price
                  guaranteed and also for railway e ticket booking also offer
                  international flight tickets.
                </p>
                <div className="profile">
                  <div className="profile-1">
                    <div className="profile-1-1">
                      <h1>Contact Person</h1>
                      <p>{user.username}</p>
                    </div>
                    <div className="profile-1-1">
                      <h1>Business Strategy</h1>
                      <p>
                        {user.company.bs.charAt(0).toUpperCase() +
                          user.company.bs.slice(1)}
                      </p>
                    </div>
                    <div className="profile-1-1">
                      <h1>Emails</h1>
                      <p>{user.email}</p>
                    </div>
                    <div className="profile-1-1">
                      <h1>Phones</h1>
                      <p>{user.phone}</p>
                    </div>
                  </div>
                  <div className="profile-2">
                    <div className="profile-1-1">
                      <h1>Address</h1>
                      <p>{user.address.street}</p>
                    </div>
                    <div className="profile-1-1">
                      <h1>City</h1>
                      <p>{user.address.city}</p>
                    </div>
                    <div className="profile-1-1">
                      <h1>Suite</h1>
                      <p>{user.address.suite}</p>
                    </div>
                    <div className="profile-1-1">
                      <h1>Zipcode</h1>
                      <p>{user.address.zipcode}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="pagination">
        <Pagination
          current={currentPage}
          total={filteredUsers.length}
          pageSize={usersPerPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Users;
