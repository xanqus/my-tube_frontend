import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  currentlySelectedVideoState,
  isEditingState,
  modalActiveState,
} from "../../../recoil";
import { formatDate } from "../../../utils";

const VideoListItem = ({ video }) => {
  const setActive = useSetRecoilState(modalActiveState);
  const setIsEditing = useSetRecoilState(isEditingState);
  const setSelectedVideo = useSetRecoilState(currentlySelectedVideoState);
  const navigate = useNavigate();
  return (
    video && (
      <tr>
        <th className="border-y">
          <input
            type="checkbox"
            checked="checked"
            className="rounded-none checkbox checkbox-sm focus:ring-0"
            onChange={() => {}}
          />
        </th>
        <td className="border-y">
          <div className="flex">
            <div className="w-36">
              <img src={video.thumbnailUrl} alt="thumnail" />
            </div>
            <div className="flex flex-col ml-6">
              <div
                className="cursor-pointer hover:underline"
                onClick={() => {
                  if (video.isTemp) {
                    setSelectedVideo(video);
                    setActive(true);
                    setIsEditing(true);
                  } else {
                    setSelectedVideo(video);
                    navigate(`/studio/video/${video.videoId}/edit`, {
                      state: { video },
                    });
                  }
                }}
              >
                {video.title}
              </div>
              <div>설명추가</div>
            </div>
          </div>
        </td>
        <td className="border-y">
          {video.isTemp ? "초안" : video.isPublic ? "공개" : "미공개"}
        </td>
        <td className="border-y">없음</td>
        <td className="border-y">
          <div className="flex flex-col">
            <div>{formatDate(video.regDate)}</div>
            <div>게시날짜</div>
          </div>
        </td>
        <td className="border-y">{video.views}</td>
        <td className="border-y">0</td>
        <td className="border-y">{video.likeCount}</td>
      </tr>
    )
  );
};

export default VideoListItem;
