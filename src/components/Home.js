import React, { Fragment, useState, useEffect } from 'react'

const Home = () => {

    const [myHoliday, setMyHoliday] = useState([])
    const [myHolidayDetail, setMyHolidayDetail] = useState([])
    const [year, setYear] = useState(Number)

    useEffect(() =>{

        fetch('https://calendarific.com/api/v2/holidays?api_key=e8270e3cc014b232180e70390b4616f3813f7b26&country=IN&year=2019')
        .then((res)=>{
            res.json()
            .then((result)=>{
                setYear(2019)
                setMyHoliday(result.response.holidays)
            })
        })
        .catch((error)=>{
            console.log(error)
        })
        
    },[])
  
    const handleMonth = (month) =>{

        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return(monthNames[month-1])

    }

    const handlePreviousHoliday = (e) =>{
        
        const pYear = Number(year-1)
        setYear(pYear)
        
        fetch(`https://calendarific.com/api/v2/holidays?api_key=e8270e3cc014b232180e70390b4616f3813f7b26&country=IN&year=${pYear}`)
        .then((res)=>{
            res.json()
            .then((result)=>{

                setMyHoliday(result.response.holidays)
            })
        })
        .catch((error)=>{
            console.log(error)
        })

        console.log(myHoliday)
    }
    const handleNextHoliday = (e) =>{

        const nYear = Number(year+1)
        setYear(nYear)

        fetch(`https://calendarific.com/api/v2/holidays?api_key=e8270e3cc014b232180e70390b4616f3813f7b26&country=IN&year=${nYear}`)
        .then((res)=>{
            res.json()
            .then((result)=>{

                setMyHoliday(result.response.holidays)
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleHolidayDetail = (e) =>{
        const day = Number( e.target.innerHTML )
        const index = e.target.getAttribute('id')
        const month = document.getElementsByClassName(index)[0].value
        fetch(`https://calendarific.com/api/v2/holidays?api_key=e8270e3cc014b232180e70390b4616f3813f7b26&country=IN&year=2019&day=${day}&month=${month}`)
        .then((res)=>{
            res.json()
            .then((result)=>{
                console.log(result)
                return(
                    setMyHolidayDetail(result.response.holidays)
                )
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    return (
        
        <Fragment>
            <div className="row my-2">
                <div className="col-3"></div>
                   <div className="col-3">
                       <button className="btn btn-secondary"
                        onClick={handlePreviousHoliday}
                        style={{width:'100%'}}
                       >Previous holiday</button>
                   </div>
                   <div className="col-3">
                   <button className="btn btn-light"
                   onClick={handleNextHoliday}
                   style={{width:'100%'}}
                   >Next holiday</button>
                   </div>
                   <div className="col-3"></div>
               </div>
           <div className="container rounded border w-50 shadow-lg mt-5">
               
                <div className="row">
                    {
                        myHoliday.map((res, index)=>{
                            return(
                                <div className="col-2 my-3" key={index}>
                                    
                                        <h1 onClick={handleHolidayDetail} id={index}  data-toggle="modal" data-target="#exampleModalLong">
                                            {
                                                res.date.datetime.day
                                            }
                                            
                                        </h1>
                                        <input type="text" className={index}
                                            hidden
                                            value= {res.date.datetime.month}
                                        />
                                    <strong>
                                        {
                                            handleMonth(res.date.datetime.month)
                                        }
                                    </strong>
                                    
                                </div>
                            )
                        })
                    }
                </div>
           </div>
           {/* <button onClick={handleCal}>click</button> */}


<div className="modal fade" style={{textAlign:'center'}} id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
          {
      myHolidayDetail.map((res, index)=>{
          return(
          <h3 className="modal-title" id="exampleModalLongTitle" 
          style={{marginLeft:'150px'}} key={index}>
              {res.date.datetime.day} {handleMonth(res.date.datetime.month)} {res.date.datetime.year}</h3>
          )
      })
    }
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {
            myHolidayDetail.map((res, index)=>{
               return(
                   <ul style={{listStyleType:'none'}}>
                       <li key={index} style={{fontSize:'20px',fontWeight:'bold'}}>
                           {
                               res.name
                           }
                           <br />
                           <br />
                          

                            <button className="btn btn-secondary" key={index}
                            style={{borderRadius:'20px',backgroundColor:'#7F00FF'}}
                            >{res.type}
                            </button>
                            
                       </li>
                       <li><p key={index}>{res.description}</p></li>
                   </ul>
                   
               )
            })
        }
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-success" data-dismiss="modal" style={{marginRight:'200px'}}>Close</button>
      </div>
    </div>
  </div>
</div>



        </Fragment>
    )
}

export default Home