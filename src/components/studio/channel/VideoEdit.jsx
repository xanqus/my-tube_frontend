import axios from "axios";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  channelState,
  currentlySelectedVideoState,
  isEditingState,
  modalActiveState,
  userState,
  videoState,
} from "../../../recoil";
import VideoEditStep from "./videoEdit/VideoEditStep";
import { ApiController, BACKEND_URL } from "../../../utils";
import { Link } from "react-router-dom";

const VideoEdit = () => {
  const userInfo = useRecoilValue(userState);
  const setActive = useSetRecoilState(modalActiveState);
  const setIsEditing = useSetRecoilState(isEditingState);
  const [stepNumber, setStepNumber] = useState(0);
  const setVideos = useSetRecoilState(videoState);
  const [selectedVideo, setSelectedVideo] = useRecoilState(
    currentlySelectedVideoState
  );
  const [title, setTitle] = useState(selectedVideo.title);
  const [description, setDescription] = useState(selectedVideo.description);
  const [isPublic, setIsPublic] = useState(selectedVideo.isPublic);
  const channelInfo = useRecoilValue(channelState);

  return (
    <div className="flex flex-col modal-box relative max-w-full w-240 h-192 rounded-md p-0">
      <div className="flex border-b h-14 flex-shrink-0">
        <div className="flex justify-center items-center ml-5 text-lg">
          {selectedVideo && selectedVideo.title}
        </div>
        <div className="ml-auto w-14">
          <label
            htmlFor="my-modal-4"
            className="flex justify-center items-center h-full cursor-pointer text-gray-700 font-bold"
            onClick={async () => {
              setActive(false);
              setIsEditing(false);
              setSelectedVideo(null);
              await ApiController({
                url: `/video/${selectedVideo.videoId}`,
                method: "PATCH",
                data: { title, description },
              });
              // await axios({
              //   url: `${BACKEND_URL}/video/${selectedVideo.videoId}`,
              //   method: "PATCH",
              //   data: { title, description },
              // });
              const data = await axios({
                url: `${BACKEND_URL}/video?channelId=${channelInfo.id}`,
              });
              setVideos(data.data);
            }}
          >
            ???
          </label>
        </div>
      </div>
      <div className="h-auto justify-center items-end">
        <VideoEditStep stepNumber={stepNumber} setStepNumber={setStepNumber} />

        <div className="h-126">
          {stepNumber === 0 ? (
            <div className="flex h-full pt-4">
              <div className=" w-3/5 pl-12">
                <div className="text-2xl font-bold h-12">????????????</div>
                <div className="border border-gray-300 focus-within:border-blue-500 rounded">
                  <div className="text-sm pl-2 pt-2">??????(????????????)</div>
                  <input
                    type="text"
                    className="w-full border-none p-4 pt-3 focus:ring-0"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-6 border border-gray-300 focus-within:border-blue-500 rounded">
                  <div className="text-sm pl-2 pt-2">??????</div>
                  <textarea
                    type="text"
                    className="w-full border-none p-4 pt-3 focus:ring-0 resize-none"
                    placeholder="??????????????? ???????????? ?????? ???????????????"
                    value={description || ""}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-6">
                  <div>???????????? ?????????</div>
                  <div className="text-sm text-gray-400">
                    ???????????? ????????? ???????????? ????????? ??????????????? ??????????????????.
                    ???????????? ????????? ?????????????????? ???????????? ????????? ?????????.
                  </div>
                  <input type="file" />
                </div>
              </div>
              <div className="flex flex-col items-end w-2/5 pr-12">
                <div className="w-72 h-40 mt-12 ">
                  <video
                    className="w-full h-full rounded-t"
                    poster={selectedVideo.thumbnailUrl}
                    controls
                  >
                    <source src={selectedVideo.videoUrl} />
                  </video>
                </div>
                <div className="w-72 border border-gray-400 h-32  rounded-b text-sm p-2">
                  <div>????????? ??????</div>
                  <div className="text-blue-500">
                    <Link
                      to={`/watch?id=${selectedVideo.videoId}`}
                    >{`http://localhost:3000/watch?id=${selectedVideo.videoId}`}</Link>
                  </div>
                  <div className="mt-3">?????? ??????</div>
                  <div>{selectedVideo.filename}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full pt-4">
              <div className=" w-3/5 pl-12">
                <div className="text-2xl font-bold h-12">?????? ??????</div>
                <div className="flex flex-col">
                  <div className="border border-gray-300 focus-within:border-blue-500 rounded px-6 py-3 mb-3">
                    ?????? ?????? ??????
                    <div className="flex ml-6 mt-4">
                      <input
                        type="radio"
                        name="radio-6"
                        className="radio checked:bg-gray-500 border-gray-500 "
                        checked={!isPublic}
                        onClick={() => {
                          setIsPublic(false);
                        }}
                        onChange={() => {}}
                      />
                      <div className="ml-3">?????????</div>
                    </div>
                    <div className="flex ml-6 mt-4">
                      <input
                        type="radio"
                        name="radio-6"
                        className="radio checked:bg-gray-500 border-gray-500"
                        checked={isPublic}
                        onClick={() => {
                          setIsPublic(true);
                        }}
                        onChange={() => {}}
                      />
                      <div className="ml-3">??????</div>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-300 focus-within:border-blue-500 rounded p-3">
                  ??????
                </div>
                <div className="bg-gray-50 h-auto mt-4 px-6 pt-3">
                  <div>?????? ?????? ?????? ????????? ???????????????.</div>
                  <div className="text-sm my-3">
                    ??? ???????????? ???????????? ????????????????
                  </div>
                  <div className="my-3 text-gray-500 text-sm">
                    ??????, ??????, ?????????, ????????? ?????????????????? ??????????????? ????????????
                    YouTube ????????? ???????????? ?????????.
                  </div>
                  <div>????????? ????????? ?????? ?????????????????? ????????????????</div>
                  <div className="my-3 text-gray-500 text-sm pb-6">
                    MyTube ???????????? ???????????? ???????????? ????????? ???????????? YouTube???
                    ???????????? ????????? ??????????????? ????????? ??? ????????????.
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end w-2/5 pr-12">
                <div className="w-72 h-40 mt-12 ">
                  <video
                    className="w-full h-full rounded-t"
                    poster={selectedVideo.thumbnailUrl}
                    controls
                  >
                    <source src={selectedVideo.videoUrl} />
                  </video>
                </div>
                <div className="w-72 border border-gray-400 h-32 rounded-b text-sm p-2">
                  <div>????????? ??????</div>
                  <div className="text-blue-500">
                    <Link
                      to={`/watch?id=${selectedVideo.videoId}`}
                    >{`http://localhost:3000/watch?id=${selectedVideo.videoId}`}</Link>
                  </div>
                  <div className="mt-3">?????? ??????</div>
                  <div>{selectedVideo.filename}</div>
                </div>
                <div
                  onClick={async () => {
                    setActive(false);
                    setIsEditing(false);
                    setSelectedVideo(null);
                    await ApiController({
                      url: `/video/${selectedVideo.videoId}`,
                      method: "PATCH",
                      data: { title, description, isPublic, isTemp: false },
                    });
                    // await axios({
                    //   url: `${BACKEND_URL}/video/${selectedVideo.videoId}`,
                    //   method: "PATCH",
                    //   data: { title, description, isPublic, isTemp: false },
                    // });
                    const data = await axios({
                      url: `${BACKEND_URL}/video?channelId=${channelInfo.id}`,
                    });

                    setVideos(data.data);
                  }}
                  className="btn btn-sm bg-blue-500 text-white border-none hover:bg-blue-500 rounded-none mt-auto"
                >
                  ??????
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoEdit;
