import React, { useState } from "react";
import "./predict.css";

// Predict component
const Predict = () => {
  // State values
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Year: "",
    Present_Price: "",
    Kms_Driven: "",
    Owner: "",
    Fuel_Type_Petrol: "",
    Seller_Type_Individual: "",
    Transmission_Mannual: "",
  });

  // Input field change handler -> input field herne
  const setFormHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: +value,
    }));
    console.log(formData);
  };

  // Form submitting handler -> form submit garepaxi
  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Body baata hamro form ko data pathaako
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Status success vayepachi prediction ko response paayeko ra store gareko
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        // error vaye error
        console.error(error);
      });
  };

  // Clear field button handler

  const clearHandler = () => {
    setFormData({
      Year: "",
      Present_Price: "",
      Kms_Driven: "",
      Owner: "",
      Fuel_Type_Petrol: "",
      Seller_Type_Individual: "",
      Transmission_Mannual: "",
    });
    setData(null);
  };

  // Returning JSX
  return (
    <div className="container">
      <p className="title">
        This is react app and is connected to flask in the backend which has ML
        model
      </p>
      <p className="desc">
        Testing flask react with ML (RandomForestClassifier)
      </p>

      <form onSubmit={formSubmitHandler}>
        <input
          type="number"
          name="Year"
          placeholder="Enter year"
          required="required"
          onChange={setFormHandler}
          value={formData.Year}
        />
        <input
          type="number"
          name="Present_Price"
          placeholder="Present_Price"
          required="required"
          onChange={setFormHandler}
          value={formData.Present_Price}
        />
        <input
          type="number"
          name="Kms_Driven"
          placeholder="Kms_Driven"
          required="required"
          onChange={setFormHandler}
          value={formData.Kms_Driven}
        />
        <input
          name="Owner"
          placeholder="How much owners previously had the car(0 or 1 or 3)"
          required="required"
          onChange={setFormHandler}
          value={formData.Owner}
        />

        <input
          type="number"
          name="Fuel_Type_Petrol"
          placeholder="Enter petrol or diesel or CNG as type of car"
          required="required"
          onChange={setFormHandler}
          value={formData.Fuel_Type_Petrol}
        />

        <input
          type="text"
          name=" Seller_type_individula"
          placeholder="Are you A Dealer or Individual?"
          required="required"
          onChange={setFormHandler}
          value={formData.Seller_Type_Individual}
        />

        <input
          type="text"
          name="Transmission_Mannual "
          placeholder="Manual or Anutomatic Car"
          required="required"
          onChange={setFormHandler}
          value={formData.Transmission_Mannual}
        />

        <div className="btn-container">
          <button type="submit">Predict Current Selling price</button>
          <button className="clear" onClick={clearHandler}>
            Clear field
          </button>
        </div>
      </form>
      <div className="data">
        {loading && <h4>Predicting...</h4>}

        {/* Data after making post request in the backend */}
        {data && (
          <>
            <p className="predicted-data">
              The predicted data is <strong>{data?.prediction}</strong>
              <br></br>
              The accuracy is <strong>{data?.accuracy}</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Predict;
