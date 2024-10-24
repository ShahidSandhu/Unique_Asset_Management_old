<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [value, setValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/assets/");
      console.log(response.data);
      setAssets(response.data);
    } catch (err) {
      setError("Error fetching assets");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assetData = {
      name,
      description,
      serial_number: serialNumber,
      value,
    };

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (editingId) {
        await axios.put(
          `http://127.0.0.1:8000/api/assets/${editingId}/`,
          assetData
        );
        setSuccessMessage("Asset updated successfully");
      } else {
        await axios.post("http://127.0.0.1:8000/api/assets/", assetData);
        setSuccessMessage("Asset added successfully");
      }
      resetForm();
      fetchAssets();
    } catch (err) {
      setError("Error submitting asset");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (asset) => {
    setName(asset.name);
    setDescription(asset.description);
    setSerialNumber(asset.serial_number);
    setValue(asset.value);
    setEditingId(asset.id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await axios.delete(`http://127.0.0.1:8000/api/assets/${id}/`);
      setSuccessMessage("Asset deleted successfully");
      fetchAssets();
    } catch (err) {
      setError("Error deleting asset");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setSerialNumber("");
    setValue("");
    setEditingId(null);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <a href="#assets">Manage Assets</a>
          </li>
          <li>
            <a href="#analytics">Analytics</a>
          </li>
          <li>
            <a href="#settings">Settings</a>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="content-header">
          <h1>Asset Management</h1>
        </div>

        <div className="form-section">
          <form className="asset-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Asset Name"
                required
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Asset Description"
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="Serial Number"
                required
              />
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Asset Value"
                required
              />
            </div>
            <div className="form-actions">
              <button className="submit-btn" type="submit" disabled={loading}>
                {editingId ? "Update Asset" : "Add Asset"}
              </button>
              {editingId && (
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="content-body">
          <h2>Assets</h2>

          {loading && <p>Loading...</p>}
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          <div className="asset-grid">
            {assets.map((asset) => (
              <div key={asset.id} className="asset-card">
                <div className="asset-card-body">
                  <h3>{asset.name}</h3>
                  <p>{asset.description}</p>
                  <p>
                    <strong>Serial:</strong> {asset.serial_number}
                  </p>
                  <p>
                    <strong>Value:</strong> ${asset.value}
                  </p>
                </div>
                <div className="asset-card-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(asset)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(asset.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
=======
import React, { useState } from "react";

function App() {
  // State to hold the form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [value, setValue] = useState(""); // New state for value

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Make the POST request to Django API
    fetch("http://127.0.0.1:8000/api/assets/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        serial_number: serialNumber,
        value: value, // Include value in the request body
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Reset form fields after success
        setName("");
        setDescription("");
        setSerialNumber("");
        setValue(""); // Reset value field
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <h1>Add New Asset</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Asset Name"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Asset Description"
        />
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          placeholder="Serial Number"
        />
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Asset Value"
        />
        <button type="submit">Add Asset</button>
      </form>
>>>>>>> 659cdf4cab91caa8492e33642cd680fd9cb57431
    </div>
  );
}

export default App;
