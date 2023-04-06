import React, { useState, useEffect } from 'react';
import { getMainFeed } from '../../api/mainfeed';

function Posts() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const newData = await getMainFeed(page);
      if (newData.length === 0) {
        setEndReached(true);
      } else {
        setData((prevData) => prevData.concat(newData));
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !endReached
    ) {
      fetchData();
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [endReached]);

  return (
    <div className="">
      <div className="flex flex-col ">
        {data.map((item) => (
        <div className="flex justify-center">
          <div className="border rounded-md shadow-md overflow-hidden w-4/12 m-8">
            <img
              className="object-cover w-half h-64"
              src={`https://jv-unit-4-project-backend.herokuapp.com${item.image}`}
              alt={item.caption}
            />
            <div className="p-4">
              <h2 className="text-lg font-medium mb-2">{item.caption}</h2>
              <p className="text-gray-600">
                Author: {item.author.profile.firstName}{' '}
                {item.author.profile.lastName}
              </p>
            </div>
          </div>
        </div>
        ))}
      </div>
      {endReached && (
        <div className="text-center mt-6">You have reached the end!</div>
      )}
    </div>
  );
}

export default Posts;