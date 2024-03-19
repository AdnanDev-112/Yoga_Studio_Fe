//"use admin";
"use client";
//import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function manageCourses() {
  // const { data: session } = useSession();

  //const params = useParams();
  const router = useRouter();

  useEffect(() => {
    addData(); // Pass the id value to the getData function
  }, []);

  const handleBack = () => {
    router.push("/Admin/Courses");
  };

  function addData() {
    axios
      .post("http://localhost:8080/course/addCourse/" + 2, {
        // Include data here
        id: "",
        name: "",
        startDate: "",
        endDate: "",
        numberOfClasses: "",
        price: "",
        studioID: "",
      })
      .then((response) => {
        console.log(response.data);
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error adding course:", error);
        setFormData([]);
      });
  }

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    startDate: "",
    endDate: "",
    numberOfClasses: "",
    price: "",
    studioID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to backend
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      id: "",
      name: "",
      startDate: "",
      endDate: "",
      numberOfClasses: "",
      price: "",
      studioID: "",
    });
  };

  const formStyles = {
    // CSS properties for the form
    display: "flex",
    flexDirection: "column",
    alignItems: "top",
    justifyContent: "center",
    height: "70vh",
    // background CSS properties
    backgroundImage:
      "url(https://media.istockphoto.com/id/1310338394/photo/yoga-in-the-mountains.jpg?s=612x612&w=0&k=20&c=VAjYG0hUakFn8nySwsdMBf_4KFZVFi6B3l_zw0WaRxQ=)", // Replace 'path/to/your/image.jpg' with the actual path to your image
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "500px",
  };

  return (
    <form style={formStyles} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">Yoga Session ID:</label>
        <select
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
        >
          {" "}
          {/* we should get yoga session table her and populate it  */}
          <option value="">Select ID</option>
          <option value="1">Yoga Session 1</option>
          <option value="2">Yoga Session 2</option>
          <option value="3">Yoga Session 3</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="name">Course Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date: </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date: </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="numberOfClasses">Number of Classes:</label>
        <input
          type="number"
          id="numberOfClasses"
          name="numberOfClasses"
          value={formData.numberOfClasses}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="studioID">Studio ID:</label>
        <select
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
        >
          {/* could add manually or connect to studio table and populate */}
          <option value="">Select ID</option>
          <option value="1">Studio 1</option>
          <option value="2">Studio 2</option>
          <option value="3">Studio 3</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {/* <div>
        <label htmlFor="id">Pricing ID:</label>
        <input
          type="text"
          id="pricingId"
          name="pricingId"
          value={formData.pricingID}
          onChange={handleChange}
        />
      </div> */}
      <button
        type="submit"
        style={{
          fontWeight: "bold",
          padding: "5px 5px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        ADD COURSE
      </button>
    </form>
  );
}
