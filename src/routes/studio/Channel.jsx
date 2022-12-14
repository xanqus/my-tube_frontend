import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import ModalBox from "../../components/common/ModalBox";
import ModalButton from "../../components/common/ModalButton";
import VideoList from "../../components/studio/channel/VideoList";
import Layout from "../../layouts/Layout";
import {
  channelState,
  isEditingState,
  modalActiveState,
  videoState,
} from "../../recoil";
import { BACKEND_URL } from "../../utils";

const Channel = () => {
  const navigate = useNavigate();
  const [active, setActive] = useRecoilState(modalActiveState);
  const isEditing = useRecoilValue(isEditingState);
  const [videos, setVideos] = useRecoilState(videoState);
  const channelInfo = useRecoilValue(channelState);

  useEffect(() => {
    document.title = "채널 콘텐츠 - MyTube Studio";

    navigate(`/studio/channel/${channelInfo.id}`, { replace: true });
    const getData = async () => {
      try {
        if (channelInfo.id) {
          const data = await axios({
            url: `${BACKEND_URL}/video?channelId=${channelInfo.id}`,
          });
          setVideos(data.data);
        }
      } catch (e) {}
    };
    getData();
  }, [channelInfo]);
  return (
    <Layout>
      <div className="flex pointer-events-auto">
        <div className="flex w-60 flex-shrink-0 border border-r-0 border-t-0 z-0">
          side menu
        </div>
        <div className="flex flex-col flex-grow z-0 border border-b-0">
          <ModalButton>
            <div>채널 콘텐츠</div>
            <div
              className="flex justify-center items-center border w-auto ml-auto mr-4 text-md px-3 cursor-pointer"
              onClick={() => {
                setActive(true);
              }}
            >
              <i className="fi fi-rs-video-plus mt-1 mr-2 text-red-500"></i>
              <div className="text-base">만들기</div>
            </div>
          </ModalButton>

          <VideoList />
        </div>
      </div>
      <ModalBox />
    </Layout>
  );
};

export default Channel;
