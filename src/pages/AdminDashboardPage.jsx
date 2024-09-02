import React, { useEffect, useState } from "react";
import { FaChevronDown, FaRegUser } from "react-icons/fa";
import { AuthContext } from "../context/Auth/AuthContext";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router";
import Card from "../components/AdminCard";

const AdminDashboardPage = () => {
  const { dispatch, state } = React.useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [num_pages, setNum_Pages] = useState(null);
  const [pageCount, setPage] = useState(1);
  const navigate = useNavigate();
  const now = new Date();
  const date = now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const time = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };

  const handleNextPage = () => {
    if (pageCount < num_pages) {
      setPage(pageCount + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageCount > 1) {
      setPage(pageCount - 1);
    }
  };

  const handleCardMove = (dragIndex, hoverIndex) => {
    const draggedCard = videos[dragIndex];
    setVideos((prevData) => {
      const newData = [...prevData];
      newData.splice(dragIndex, 1);
      newData.splice(hoverIndex, 0, draggedCard);
      return newData;
    });
  };

  useEffect(() => {
    const sdk = new MkdSDK();

    const payload = {
      payload: {},
      page: pageCount,
      limit: 10,
    };

    const fetchVideo = async () => {
      try {
        const data = await sdk.callRestAPI(payload, "PAGINATE");

        if (!data || !data.list) {
          throw new Error("Unexpected response format: Missing video data.");
        }

        setNum_Pages(data.num_pages);
        setVideos(data.list);
      } catch (err) {
        console.error("Failed to fetch videos: ", err.message || err);
      }
    };

    fetchVideo();
  }, [pageCount]);

  return (
    <div className="container p-10  min-h-screen font-sans bg-[#111111]">
      <header className=" mb-[4rem] flex items-center justify-between">
        <div className="logo">
          <h3 className="text-5xl font-black text-white">APP</h3>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="py-2 px-4 font-thin text-[#050505] rounded-3xl flex items-center bg-[#9BFF00]"
          >
            <FaRegUser className="mr-1 text-[#696969]" />
            Logout
          </button>
        </div>
      </header>
      <main>
        <div className="font-thin mb-5 justify-between  flex text-[#ffffff]">
          <p className="text-[#ffffff] text-4xl font-thin">
            Today’s leaderboard
          </p>
          <div className="flex bg-[#1d1d1d]  px-4 rounded-xl items-center gap-2 ">
            <span className="font-thin text-sm">{date}</span>{" "}
            <span className="text-[#696969] font-semibold">&#x2022;</span>
            <span className="font-thin text-sm bg-[#9bff00] text-[#000000] px-1 rounded">
              Submissions OPEN
            </span>
            <span className="text-[#696969] font-semibold">&#x2022;</span>{" "}
            <span className="font-thin text-sm">{time}</span>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-[#696969] flex font-thin  mb-2">
            <p className="w-[48%] mr-24 pl-5"># Title</p>
            <p className="pl-3">Author</p>
            <p className="flex items-center gap-1 ml-auto">
              Most Liked <FaChevronDown />
            </p>
          </div>
          <div>
            {videos &&
              videos.length > 0 &&
              videos.map((data, index) => {
                return (
                  <Card
                    handleCardMove={handleCardMove}
                    key={index}
                    index={index}
                    data={data}
                  />
                );
              })}
          </div>
        </div>
        <div className="my-5">
          <div className="btns flex justify-between">
            <button
              onClick={handlePrevPage}
              className="text-white btn-primary bg-[#9bff00] px-2 py-1 rounded-md"
            >
              Prev
            </button>
            <button
              onClick={handleNextPage}
              className="text-white btn-primary bg-[#9bff00] px-2 py-1 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
