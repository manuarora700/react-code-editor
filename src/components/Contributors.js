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
      <h2 className='m-0 ml-4 text-white text-lg'>Contributors <span className='text-red-500'>&#x2764;</span></h2>
      <div  className='m-1 mt-2 ml-1 flex flex-row justify-start' >
        {contributors.map((contributor) => ( 
          <a href={contributor.html_url} target='_blank' className='mx-3'>
          <img src={contributor.avatar_url} alt={contributor.login}width="40" height="40"  />
          </a> 
      ))}
      </div>
    </div>
    
  );
};

export default Contributors;