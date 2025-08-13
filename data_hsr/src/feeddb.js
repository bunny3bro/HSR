import React, { useEffect, useState } from "react";
import axios from "axios";

const Feeddb = () => {
  const correctPassword = "Bunny@16"; 
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [dat,getdat]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3535/getimage').then((res)=>
        {
    getdat(res.data.imagedata)
        })
    })


  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const [feeds, setFeeds] = useState([]);
  const [cnt, setCnt] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    axios.get("http://localhost:3535/getfeed").then((response) => {
      setFeeds(response.data.feeddata);
    });
  }, [cnt]);

  const handleDelete = (id) => {
    const del = `http://localhost:3535/delete-feed/${id}`;
    axios
      .delete(del)
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "deleted.") {
          alert("Deleted successfully");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const updateTime = () => {
    setCurrentTime(new Date());
  };

  const Logout = () => {
    //window.location.href="http://localhost:3000/home"
    window.location.reload();
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
          <br />
          <table border={1}>
          <thead>
                     <tr>
                        <th><u>S.No</u></th>
                         <th><u>Visiter Name</u></th>
                         <th><u>Visiter Phone Number</u></th> 
                         <th><u>Visiter Email</u></th>
                         <th><u>Choice on the Webpage</u></th>
                         <th><u>Rating of Webpage (🌟)</u></th>
                         <th><u>Visit the other game</u></th>
                         <th><u>comment</u></th>
                         <th><u>Time Stamp</u></th>
                         <th><u>Action</u></th>
                     </tr>
                 </thead>
                 <tbody>
                    {feeds.map((ele,i)=>(
                        <tr key={i} >
                            <td>{i+1}</td>
                            <td>{ele.username}</td>
                            <td>{ele.usernum}</td>
                            <td>{ele.usermail}</td>
                            <td>{ele.userchoice}</td>
                            <td>{ele.userrating}</td>
                            <td>{ele.usercheck}</td>
                            <td>{ele.usercomment}</td>
                            <td>{ele.usertime}</td>
                            <td><button onClick={()=>handleDelete(ele._id)} >Delete</button></td>
                        </tr>
                    ))}
                </tbody>
          </table>
          <br />
          <button onMouseOver={() => setCnt(cnt + 1)}>Reload</button>
          &nbsp;
          &nbsp;
          &nbsp;
          <button onClick={Logout}>Log Out</button>
          <br />
          <br />
          <button onMouseOver={updateTime}>Refresh the Time</button>
          <br />
          <p id="time">{currentTime.toString()}</p>
        </>
      ) : (
        <div>
            <br />
            <br />
            {
                //eslint-disable-next-line
                dat.map((ele,i)=>{
                    if(ele.names==="huohuo"){
                    return(
                        <div>
                            <img src={`http://localhost:3535/images/${ele.profile}`} alt='' className="huo" />
                        </div>
                    )}
                })
            }
            <br />
            <br />
          <label>
            <u>
            Enter Password:
            </u>
            <br />
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='passblack' 
            />
          </label>
          <br />
          <br />
          <button onClick={handlePasswordSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Feeddb;
