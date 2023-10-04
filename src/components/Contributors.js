import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contributors = ({ repo }) => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      const res = await axios.get(`https://api.github.com/repos/${repo}/contributors`);
      setContributors(res.data);
    };

    fetchContributors();
  }, [repo]);

  return (
    <div>
      <h2 style={{margin:'0 0 0 15px',color:'white',fontSize:'large'}}>Contributors <span style={{color:'red'}}>&#x2764;</span></h2>
      <div  style={{margin:'5px 10px 10px 5px',display:'flex',flexDirection:'row',justifyContent:'left'}} >
        {contributors.map((contributor) => ( 
          <a href={contributor.html_url} target='_blank' style={{margin:'0 10px 0 10px'}}>
          <img src={contributor.avatar_url} alt={contributor.login}width="40" height="40"  />
          </a> 
      ))}
      </div>
    </div>
    
  );
};

export default Contributors;