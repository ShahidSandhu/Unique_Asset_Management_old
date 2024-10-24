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
    </div>
  );
}

export default App;
