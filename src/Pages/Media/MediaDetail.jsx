import React, { useState } from "react";
import toast from "react-hot-toast";
import SmallBreadcrumbs from "../../components/BreadCrumbs";
import Gallery from "../../components/Gallery";
import { useLocation, useNavigate } from "react-router-dom";
import userStore from "../../store/userStore";
import { TextField } from "@mui/material";
import axios from "axios";
import { SERVER_URL } from "../../api/url";



const MediaDetail = () => {
  const setUser = userStore((state) => state.setUser);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location || {};
const [create,setCreate]=useState(false)
  const [data, setData] = useState({});
  const [bannerImage, setBannerImage] = useState("");
console.log(state)
const handleSubmit = async () => {
  setCreate(true);
  const token = localStorage.getItem("token");

  try {
  
  

    const response = await axios.post(
      `${SERVER_URL}/media-buyer/create-media-buyer/${state._id}`,
      {
        "budget": data?.budget,
        "paid_reach": data?.paid,
        "organic_reach": data?.organic,
        "reactions": data?.reaction,
        "comments": 5000,
        "shares": data?.total,
        "page_visitor": 10000,
        "page_new_follower": 1000000,
        "page_total_reach": 150000,
        "ads":data?.ads,
    },
      {
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    setCreate(false);

    if (response.data?.statusCode === 201) {
 
      toast.success("Successful Created!", {
        position: "top-right",
        duration: 5000,
      });
   
   
 navigate("/media")
    } else if (response.data?.statusCode === 203) {
      toast.error(`${response.data?.message}`, {
        position: "top-right",
        duration: 5000,
      });
    }
  } catch (err) {
    setCreate(false);
    let errorMessage = "An error occurred. Please try again later.";

    if (err.response) {
      switch (err.response.status) {
        case 400:
        case 401:
          errorMessage = err.response.data?.message || "Unauthorized";
          localStorage.clear();
          setUser(null);
          navigate("/");
          break;
        case 500:
          errorMessage =
            err.response.data?.message || "Server error. Please try again later.";
          break;
        case 503:
          errorMessage = "Service is temporarily unavailable. Please try again later.";
          break;
        case 502:
          errorMessage = "Bad Gateway: The server is down. Please try again later.";
          break;
        default:
          errorMessage = err.response.data?.message || "An error occurred.";
      }
    } else if (err.request) {
      errorMessage = "Network error. Please check your internet connection.";
    } else {
      errorMessage = `Error: ${err.message}`;
    }

    toast.error(errorMessage, {
      position: "top-right",
      duration: 5000,
    });
  }
};


  return (
    <div className="mt-24 mx-2 lg:mx-4 hide-scrollbar flex-row justify-center items-center">
      <div className="flex justify-end m-8">
        <SmallBreadcrumbs title="Media" ActiveTitle="Details" link="/media" />
      </div>
      <div className="text-2xl font-bold">Details</div>

      <div className="lg:flex gap-10 w-full">
        <div className="lg:w-[60%] w-full">
          <div>
            <div className="font-bold text-secondaryColor mt-8">Headline</div>
            <p className="text-sm text-bodyColor mt-5">
              {state?.task?.headline || state?.headline}
            </p>
          </div>

          <div>
            <div className="font-bold text-secondaryColor mt-8">Content</div>
            <p
              className="text-sm text-bodyColor mt-5"
              dangerouslySetInnerHTML={{
                __html: state?.content || "<p>No content available</p>",
              }}
            />
          </div>

          <div className="mt-5 flex gap-3 w-full hidden lg:block">
            <div className="w-full">
              <TextField
                label="Budget"
                value={data.budget || ""}
                onChange={(e) => setData({ ...data, budget: e.target.value })}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Reactions"
                value={data.paid || ""}
                onChange={(e) => setData({ ...data, paid: e.target.value })}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Organic Reach"
                value={data.organic || ""}
                onChange={(e) => setData({ ...data, organic: e.target.value })}
                fullWidth
                margin="normal"
              />
            </div>

            <div className="w-full">
              <TextField
                label="Reactions"
                value={data.reaction || ""}
                onChange={(e) =>
                  setData({ ...data, reaction: e.target.value })
                }
                fullWidth
                margin="normal"
              />

              <TextField
                label="ads"
                value={data.ads || ""}
                onChange={(e) =>
                  setData({ ...data, ads: e.target.value })
                }
                fullWidth
                margin="normal"
              />

              <TextField
                label="Total Reach"
                value={data.total || ""}
                onChange={(e) => setData({ ...data, total: e.target.value })}
                fullWidth
                margin="normal"
              />

              <div className="flex justify-end mt-5">
                <button
                  className="bg-primaryColor hover:secondaryColor text-white font-bold py-2 px-6 rounded mt-5"
                  onClick={handleSubmit}
                >
                 {create ? "Loading" :" Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="font-bold text-secondaryColor mt-8">Graphic</div>
          <div className="flex gap-2 my-5">
            <Gallery />
          </div>
        </div>
      </div>

      {/* Mobile View Inputs */}
      <div className="mt-10 flex gap-3 w-full lg:hidden">
      <div className="w-full">
              <TextField
                label="Budget"
                value={data.budget || ""}
                onChange={(e) => setData({ ...data, budget: e.target.value })}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Reactions"
                value={data.paid || ""}
                onChange={(e) => setData({ ...data, paid: e.target.value })}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Organic Reach"
                value={data.organic || ""}
                onChange={(e) => setData({ ...data, organic: e.target.value })}
                fullWidth
                margin="normal"
              />
            </div>

            <div className="w-full">
              <TextField
                label="Reactions"
                value={data.reaction || ""}
                onChange={(e) =>
                  setData({ ...data, reaction: e.target.value })
                }
                fullWidth
                margin="normal"
              />

              <TextField
                label="ads"
                value={data.ads || ""}
                onChange={(e) =>
                  setData({ ...data, ads: e.target.value })
                }
                fullWidth
                margin="normal"
              />

              <TextField
                label="Total Reach"
                value={data.total || ""}
                onChange={(e) => setData({ ...data, total: e.target.value })}
                fullWidth
                margin="normal"
              />

            
            </div>
      </div>

      <div className="flex justify-end mt-5 lg:hidden">
        <button
          className="bg-primaryColor hover:secondaryColor text-white font-bold py-2 px-6 rounded mt-5"
          onClick={handleSubmit}
        >
          {create ? "Loading" :" Submit"}
        </button>
      </div>

      <div className="h-[100px]"></div>
    </div>
  );
};

export default MediaDetail;
