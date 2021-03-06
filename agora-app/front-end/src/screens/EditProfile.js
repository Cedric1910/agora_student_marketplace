import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, logout } from "../actions/userActions";
import "../signup.css";
import Axios from "axios";

function EditProfile(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const [fname, setFname] = useState("");
  const [studentid, setStudentid] = useState("");
  const [sname, setSname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [university, setUniversity] = useState("University of Auckland");
  const [street_address, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postcode, setPostcode] = useState("");
  const [profilePicture, setProfilePicture] = useState(
    "/profilePictures/defaultprofileicon.jpg"
  );
  const [upLoading, setUpLoading] = useState(false);
  // This field will determine if the upload profile picture button is available
  // for the user to press or not.
  const [uploadButton, setUploadButton] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setFname(userInfo.fname);
      setSname(userInfo.sname);
      setStudentid(userInfo.studentid);
      setEmail(userInfo.email);
      setGender(userInfo.gender);
      setUniversity(userInfo.university);
      setStreet(userInfo.street_address);
      setCity(userInfo.city);
      setRegion(userInfo.region);
      setPostcode(userInfo.postcode);
      setProfilePicture(userInfo.profilePicture);
    }
    return () => {};
    // eslint-disable-next-line
  }, [userInfo]);

  const uploadFileHandler = (e) => {
    setUploadButton(false);
    const file = e.target.files[0];
    const bodyFormData = new FormData();

    bodyFormData.append("image", file);
    // Now we are ready to send an AJAX request with Axios

    // This line will produce the div that tells the user their file is uploading
    setUpLoading(true);
    Axios.post("/api/users/uploadProfilePicture", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setProfilePicture(response.data);
        // This line will remove the "uploading..." div
        setUpLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setUpLoading(false);
      });
  };

  const setNoProfile = (e) => {
    setProfilePicture("/profilePictures/defaultprofileicon.jpg");
    setUploadButton(false)
  }

  /* This handler will run when the user clicks on the create account button */
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser(
        studentid,
        fname,
        sname,
        email,
        gender,
        university,
        street_address,
        city,
        postcode,
        region,
        profilePicture
      )
    );
    dispatch(logout());
    alert(
      "Successfully updated profile. Please logging again to view changes."
    );
    props.history.push("/account/signin");
  };

  return loading ? (
    <div className="loading">Loading profile editor ...</div>
  ) : error ? (
    <div className="error">
       There have been some unexpected server issues while fetching your request. Try again soon.
    </div>
  ) : (
    <div className="wrapper">
      <div className="registration_form">
        <div className="titleText">      
          <span>
            <h2>Edit profile page:</h2>
            <p> Student ID: <strong> {userInfo.studentid} </strong> </p>
            {console.log(userInfo.studentid)}
          </span>
        </div>
        <br></br> 
        {loading}
        {error && <div>Student ID or Email Address has been taken.</div>}
        <div className="input_grp">
            <div className="input_wrap">
              {uploadButton ? (
                <div>
                  <label className="upload-image">Upload a profile picture</label>
                  <input type="file" onChange={uploadFileHandler}></input>
                  <button onClick={(e) => setNoProfile()}>
                    No profile picture
                  </button>
                </div>
              ) : (
                <div className="uploaded">
                  {" "}
                  Uploaded profile picture successfully{" "}
                </div>
              )}
              {upLoading && <div>Uploading...</div>}
            </div>
          </div>
        <form className="form_wrap" onSubmit={submitHandler}>
          <div className="input_grp">
            <div className="input_wrap">
              <label>First Name:</label>
              <input
                type="text"
                id="fname"
                name="fname"
                required
                defaultValue={userInfo.fname}
                onChange={(e) => setFname(e.target.value)}
              ></input>
            </div>
            <div className="input_wrap">
              <label>Last Name:</label>
              <input
                type="text"
                id="sname"
                name="sname"
                placeholder="sname"
                defaultValue={userInfo.sname}
                required
                onChange={(e) => setSname(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="input_grp">
            <div className="input_wrap">
              <label>Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                defaultValue={userInfo.email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

            <div className="input_wrap">
              <label for="gender">Gender: </label>
              <select
                className="select-css"
                id="gender"
                name="gender"
                defaultValue={userInfo.gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="input_grp">
            <div className="input_wrap">
              <label>Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={userInfo.street_address}
                required
                onChange={(e) => setStreet(e.target.value)}
              ></input>
            </div>
            <div className="input_wrap">
            <label>City:</label>
                  <select className="select-css"
                    id="city"
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="Dunedin">Dunedin</option>
                    <option value="Auckland">Auckland</option>
                    <option value="Wellington">Wellington</option>
                    <option value="Christchurch">Christchurch</option>
                    <option value="Lincoln">Lincoln</option>
                    <option value="Palmerston North">Palmerston North</option>
                    <option value="Hamilton">Hamilton</option>
                  </select>
            </div>
          </div>
          

          <div className="input_grp">
            <div className="input_wrap">
              <label>Region:</label>
              <input
                type="text"
                id="region"
                name="region"
                defaultValue={userInfo.region}
                required
                onChange={(e) => setRegion(e.target.value)}
               ></input>
              </div> 
              <div className="input_wrap">
              <label>Post Code:</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                defaultValue={userInfo.postcode}
                required
                onChange={(e) => setPostcode(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="input_grp">
            <div className="input_wrap">
              <label for="school">University: </label>
              <select
                className="select-css"
                id="school"
                name="school"
                defaultValue={userInfo.university}
                onChange={(e) => setUniversity(e.target.value)}
              >
                <option value="University of Auckland">
                  University of Auckland
                </option>
                <option value="Auckland University of Technology (AUT)">
                  Auckland University of Technology (AUT)
                </option>
                <option value="University of Waikato">
                  University of Waikato
                </option>
                <option value="Massey University">Massey University</option>
                <option value="Victoria University of Wellington">
                  Victoria University of Wellington
                </option>
                <option value="University of Canterbury">
                  University of Canterbury
                </option>
                <option value="Lincoln University">Lincoln University</option>
                <option value="University of Otago">University of Otago</option>
              </select>
            </div>
            </div>

          <div className="input_grp">
            <div class="input_wrap">
              <input
                type="submit"
                value="Update Profile"
                class="submit_btn"
              ></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
