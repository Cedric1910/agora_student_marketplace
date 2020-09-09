import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createListing } from "../actions/listingActions";

function CreateListing(props) {
  /* 
        These fields will be used to get the data the user enters
        into the form into js variables that we can send to the backend
        which will then send it to the database.
    */
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("An image");
  const [category, setCategory] = useState("Default Category"); //need to add all categories in the html will do this tomorrow.
  const [price, setPrice] = useState(""); //unsure about this for now
  const [city, setCity] = useState("");
  const [university, setUniversity] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [seller, setSeller] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [deliveryoption, setDeliveryoption] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  // currently just need to figure out how to dispatch the information when submit button is clicked to the post
  // in listingRoute. I believe I have done everything already needed there.
  /* 
  const listingSave = useSelector((state) => state.listingSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = listingSave;
  */

  useEffect(() => {
    if (userInfo) {
      setSeller(userInfo.fname + " " + userInfo.sname);
      setUniversity(userInfo.university);
      setCity(userInfo.city);
      setSellerId(userInfo.studentid);
    }
    return () => {};
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createListing(
        name,
        description,
        image,
        category,
        price,
        city,
        university,
        brand,
        condition,
        seller,
        sellerId,
        deliveryoption
      )
    );
    props.history.push("/");
  };

  useEffect(() => {
    return () => {};
  });

  return (
    <div className="sign-up-container">
      <div className="createnewAccountContainer">
        <h2>Hello {userInfo.fname}! Create a new Listing: </h2>
        <form className="create-new-account-form" onSubmit={submitHandler}>
          <label>Listing Name: </label>
          <input
            type="text"
            id="listingName"
            name="listingName"
            placeholder="Listing Name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
          <br></br>
          <label>Listing Description: </label>
          <textarea
            type="text"
            id="listingDescription"
            name="listingDescription"
            placeholder="Your Description Here."
            rows="5"
            cols="40"
            required
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br></br>

          <label>Category: </label>
          <select id="categories" onChange={(e) => setCategory(e.target.value)}>
            <option value="Antiques">Antiques</option>
            <option value="University Textbooks">University Textbooks</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
            <option value="Sports Clothing">Sports Clothing</option>
            <option value="Shoes">Shoes</option>
            <option value="Jewellery and Watches">Jewellery and Watches</option>
            <option value="Accessories">Accessories</option>
            <option value="Computers">Computers</option>
            <option value="Mobile Phones">Mobile Phones</option>
            <option value="Electronics">Electronics</option>
            <option value="Gaming consoles">Gaming consoles</option>
            <option value="Console and PC games">Console and PC games</option>
            <option value="Health and Beauty">Health and Beauty</option>
            <option value="Furniture">Furniture</option>
            <option value="Lamps and Lighting">Lamps and Lighting</option>
            <option value="Toys">Toys</option>
            <option value="Sports Equipments">Sports Equipments</option>
          </select>

          <br></br>
          <label>Price: </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="$0.00"
            required
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <br></br>
          <label>Product brand: </label>
          <input
            type="text"
            id="brand"
            name="brand"
            placeholder="brand"
            onChange={(e) => setBrand(e.target.value)}
          ></input>
          <label>Condition: </label>
          <input
            type="text"
            id="condition"
            name="condition"
            placeholder="Condition"
            onChange={(e) => setCondition(e.target.value)}
          ></input>
          <label>Delivery </label>
          <input
            type="radio"
            id="pickup"
            name="deliveryoptions"
            value="pickup"
            required
            onChange={(e) => setDeliveryoption(e.target.value)}
          ></input>
          <label>Pick-Up </label>
          <input
            type="radio"
            id="delivery"
            name="deliveryoptions"
            value="delivery"
            required
            onChange={(e) => setDeliveryoption(e.target.value)}
          ></input>
          <button type="submit" value="Submit">
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;
