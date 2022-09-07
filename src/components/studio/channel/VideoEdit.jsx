import React from "react";
import { useRecoilState } from "recoil";
import { isEditingState, modalActiveState } from "../../../recoil";

const VideoEdit = ({ selectedVideo }) => {
  const [active, setActive] = useRecoilState(modalActiveState);
  const [isEditing, setIsEditing] = useRecoilState(isEditingState);
  return (
    <div className="flex flex-col modal-box relative max-w-full w-240 h-208 rounded-md p-0">
      <div className="flex border-b h-14">
        <div className="flex justify-center items-center ml-5 text-lg">
          {selectedVideo && selectedVideo.videoName}
        </div>
        <div className="ml-auto w-14">
          <label
            htmlFor="my-modal-4"
            className="flex justify-center items-center h-full cursor-pointer text-gray-700 font-bold"
            onClick={() => {
              setActive(false);
              setIsEditing(false);
            }}
          >
            ✕
          </label>
        </div>
      </div>
      <div className="justify-center items-end h-96">
        <div className="flex flex-col w-full">
          <ul class="flex justify-center progressbar mt-8">
            <li className="flex flex-col list-none float-left w-1/3 relative text-center">
              <div className="absolute w-32 h-20 top-0 left-1/2 -translate-x-16 -translate-y-4 hover:bg-blue-200 hover:cursor-pointer rounded-md z-0"></div>
              <div className="bg-white w-6 h-6 leading-6 border block mx-auto mt-0 mb-2.5 rounded-full border-blue-500 bg-blue-500 text-white z-10 pointer-events-none">
                <div className="z-10 pointer-events-none">✓</div>
              </div>
              <div className="z-10 pointer-events-none">세부정보</div>
              <div className="absolute w-[calc(100%-1.5rem)] h-0.5 bg-gray-400 top-[11px] left-1/2 translate-x-3 z-10 pointer-events-none"></div>
            </li>
            <li className="flex flex-col list-none float-left w-1/3 relative text-center">
              <div className="absolute w-32 h-20 top-0 left-1/2 -translate-x-16 -translate-y-4 hover:bg-blue-200 hover:cursor-pointer rounded-md z-0"></div>
              <div className="bg-white w-6 h-6 leading-6 border-4 block mx-auto mt-0 mb-2.5 rounded-full border-blue-500 text-white z-10 pointer-events-none">
                <div className="z-10 pointer-events-none"></div>
              </div>
              <div className="z-10 pointer-events-none">세부정보</div>
            </li>
          </ul>
        </div>
        edit
      </div>
    </div>
  );
};

export default VideoEdit;
