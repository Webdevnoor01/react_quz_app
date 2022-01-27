import React, { useMemo } from "react";
import image from "../assets/images/success.png";
import useFetch from "../hooks/useFetch";
import classes from "../styles/Summary.module.css";
const Summary = ({ score, noq }) => {
  const getKeyword =useMemo(()=>{
    
      console.log("Summary")
      if ((score / noq) * 5 * 100 < 50) {
        return "failed";
      } else if ((score / noq) * 5 * 100 < 75) {
        return "good";
      } else if ((score / noq) * 5 * 100 < 100) {
        return "very good";
      } else {
        return "excellent";
      }
    
  },[score, noq])
  const reqUrl = `https://api.pexels.com/v1/search?query=${getKeyword}`;
  const reqHeader = {
    Authorization: process.env.REACT_APP_PEXELS_API_KEY,
  };
  const reqMethod = "GET";

  const { loading, error, result } = useFetch(reqUrl, reqMethod, reqHeader);

  const successBadge = result ? result.photos[0].src.medium : image;
  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        {/* progress bar will be placed here */}
        <p className={classes.score}>
          `Your score is` <br />
          {score} out of {noq * 5}
        </p>
      </div>
      {loading && <div className={classes.badge}>loading your badge</div>}
      {error && <div className={classes.badge}>There was an error occure</div>}
      {!loading && !error && (
        <div className={classes.badge}>
          <img src={successBadge} alt="Success" />
        </div>
      )}
    </div>
  );
};

export default Summary;
