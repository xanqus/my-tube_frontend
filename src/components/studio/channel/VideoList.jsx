import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil";
import { BACKEND_URL } from "../../../utils";

import VideoListItem from "./VideoListItem";

const VideoList = () => {
  const userInfo = useRecoilValue(userState);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const data = await axios({
        url: `${BACKEND_URL}/api/v1/video?userId=${userInfo.id}`,
      });

      setVideos(data.data);
      setLoading(false);
    };
    try {
      getData();
    } catch (e) {
      setError(e);
      console.log(e);
    }
  }, []);

  if (error) {
    console.log("error", error);
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading...</>;
  }

  return (
    <div className="overflow-x">
      <table className="table w-full z-0">
        <thead>
          <tr>
            <th className="bg-white border-y box-border">
              <input
                type="checkbox"
                checked={false}
                className="rounded-none checkbox checkbox-sm"
                onChange={() => {}}
              />
            </th>
            <th className="bg-white border-y box-border">동영상</th>
            <th className="bg-white border-y box-border">공개상태</th>
            <th className="bg-white border-y box-border">제한사항</th>
            <th className="bg-white border-y box-border">날짜</th>
            <th className="bg-white border-y box-border">조회수</th>
            <th className="bg-white border-y box-border">댓글</th>
            <th className="bg-white border-y box-border">좋아요</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <VideoListItem key={index} video={video} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoList;
