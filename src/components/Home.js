import React, { Fragment, useState, useEffect, useRef } from "react";

const Home = () => {
  let assigndate = new Date();

  const [myHoliday, setMyHoliday] = useState([]);
  const [myHolidayDetail, setMyHolidayDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const setTodayIsHoliday = [];
  // const [day, setDay] = useState(31);
  // const [month, setMonth] = useState(12);
  // const [year, setYear] = useState(2019);
  const [day, setDay] = useState(assigndate.getDate());
  const [month, setMonth] = useState(assigndate.getMonth());
  const [year, setYear] = useState(assigndate.getFullYear());

  useEffect(() => {
    fetch(
      `https://calendarific.com/api/v2/holidays?api_key=e8270e3cc014b232180e70390b4616f3813f7b26&country=IN&year=${year}`
    )
      .then(res => {
        res.json().then(result => {
          setMyHoliday(result.response.holidays);
          setIsLoading(false);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleMonth = month => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return monthNames[month - 1];
  };

  const handlePreviousHoliday = pyear => {
    setYear(pyear);
    fetch(
      `https://calendarific.com/api/v2/holidays?api_key=e8270e3cc014b232180e70390b4616f3813f7b26&country=IN&year=${pyear}`
    )
      .then(res => {
        res.json().then(result => {
          setMyHoliday(result.response.holidays);
          setIsLoading(false);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleNextHoliday = nyear => {
    setYear(nyear);
    fetch(
      `https://calendarific.com/api/v2/holidays?api_key=e8270e3cc014b232180e70390b4616f3813f7b26&country=IN&year=${nyear}`
    )
      .then(res => {
        res.json().then(result => {
          setIsLoading(false);
          setMyHoliday(result.response.holidays);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleHolidayDetail = (day, month, year) => {
    fetch(
      `https://calendarific.com/api/v2/holidays?api_key=e8270e3cc014b232180e70390b4616f3813f7b26&country=IN&year=${year}&day=${day}&month=${month}`
    )
      .then(res => {
        res.json().then(result => {
          setIsLoading(false);
          return setMyHolidayDetail(result.response.holidays);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return isLoading === false ? (
    <Fragment>
      {myHoliday === undefined ? (
        <h1 style={{ marginTop: "350px" }}>Error Loding Data</h1>
      ) : (
        <Fragment>
          <div className="row my-2">
            <div className="col-12">
              {myHoliday.map(res => {
                if (
                  res.date.datetime.day === day &&
                  res.date.datetime.month === month &&
                  res.date.datetime.year === year
                ) {
                  return (
                    <>
                      <div className="mb-3">
                        <h5>Hey, You Got Holiday Today</h5>
                        <h1>
                          {res.date.datetime.year}{" "}
                          {handleMonth(res.date.datetime.month)}{" "}
                          {res.date.datetime.day}
                        </h1>
                        <p>{res.description}</p>
                        <button
                          className="btn btn-secondary"
                          style={{
                            borderRadius: "20px",
                            backgroundColor: "#7F00FF"
                          }}
                        >
                          {res.type}
                        </button>
                      </div>
                    </>
                  );
                }
                setTodayIsHoliday.push(res);
              })}

              {(() => {
                if (setTodayIsHoliday.length === myHoliday.length) {
                  return <h1>Today is not a holiday</h1>;
                }
              })()}
            </div>
            <div className="col-6">
              <center>
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePreviousHoliday(year - 1)}
                  style={{ width: "50%", marginLeft: "54%" }}
                >
                  Previous holiday
                </button>
              </center>
            </div>
            <div className="col-6">
              <button
                className="btn btn-light"
                onClick={() => handleNextHoliday(year + 1)}
                style={{ width: "50%", marginRight: "55%" }}
              >
                Next holiday
              </button>
            </div>
            {/* <div className="col-4"></div> */}
          </div>
          <div className="container rounded border w-50 shadow-lg mt-5">
            <div className="row">
              {myHoliday.map((res, index) => {
                return (
                  <div className="col-2 my-3" key={index}>
                    <h1
                      onClick={() =>
                        handleHolidayDetail(
                          res.date.datetime.day,
                          res.date.datetime.month,
                          res.date.datetime.year
                        )
                      }
                      data-toggle="modal"
                      data-target="#exampleModalLong"
                    >
                      {res.date.datetime.day}
                    </h1>
                    {/* <input
                  type="text"
                  className={index}
                  hidden
                  value={res.date.datetime.month}
                /> */}
                    <strong>{handleMonth(res.date.datetime.month)}</strong>
                  </div>
                );
              })}
            </div>
          </div>
          {/* <button onClick={handleCal}>click</button> */}

          <div
            className="modal fade"
            style={{ textAlign: "center" }}
            id="exampleModalLong"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLongTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  {myHolidayDetail.map((res, index) => {
                    return (
                      <h3
                        className="modal-title"
                        id="exampleModalLongTitle"
                        style={{ marginLeft: "150px" }}
                        key={index}
                      >
                        {res.date.datetime.day}{" "}
                        {handleMonth(res.date.datetime.month)}{" "}
                        {res.date.datetime.year}
                      </h3>
                    );
                  })}
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {myHolidayDetail.map((res, index) => {
                    return (
                      <ul style={{ listStyleType: "none" }}>
                        <li
                          key={index}
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          {res.name}
                          <br />
                          <br />

                          <button
                            className="btn btn-secondary"
                            key={index}
                            style={{
                              borderRadius: "20px",
                              backgroundColor: "#7F00FF"
                            }}
                          >
                            {res.type}
                          </button>
                        </li>
                        <li>
                          <p key={index}>{res.description}</p>
                        </li>
                      </ul>
                    );
                  })}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-dismiss="modal"
                    style={{ marginRight: "200px" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  ) : (
    <h1 style={{ marginTop: "350px" }}>Loading...</h1>
  );
};

export default Home;
