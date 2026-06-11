import { useEffect, useRef, useState } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import axiosInstance from "../../services/axiosInstance";
import { useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function Comment({
  ownerAvatar,
  timeAgo,
  username,
  comment: initialComment,
  commentId,
  likes: likesCount,
  isLiked,
}) {
  const { videoId } = useParams();
  const queryClient = new QueryClient();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(initialComment);
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likesCount);
  const inputRef = useRef(null);
  const authStatus = useSelector((state) => state.auth.status);

  const { mutate: deleteComment } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete(`/comments/c/${commentId}`);
      return res.data;
    },
    onSuccess: () => {
      alert("Comment deleted successfully");
      queryClient.invalidateQueries(["comments", videoId]);
    },
    onError: (error) => {
      console.error("Error deleting comment:", error.response?.data.message);
    },
    onSettled: () => {
      setDropdownOpen(false);
    },
  });

  const { mutate: updateComment } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.patch(`/comments/c/${commentId}`, {
        content: editedComment,
      });
      return res.data;
    },
    onSuccess: () => {
      alert("Comment updated successfully");
      queryClient.invalidateQueries(["comments", videoId]);
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Error updating comment:", error.response?.data.message);
    },
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post(`/likes/toggle/c/${commentId}`);
      return res.data;
    },
    onSuccess: (data) => {
      setLiked(data.data?.isLiked);
      setLikes(data.data?.likes);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error liking tweet");
      console.error("Like toggle error:", error.response?.data.message);
    },
  });

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleEdit = () => {
    if (!authStatus) {
      toast.error("Please login to edit comment");
      return;
    }
    setIsEditing(true);
    setDropdownOpen(false);
  };

  const handleUpdate = () => {
    if (commentId) {
      updateComment();
    }
  };
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleLike = () => {
    if (!authStatus) {
      toast.error("Please login to like comment");
      return;
    }
    if (commentId) {
      likeMutation.mutate();
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex gap-x-4">
        <div className="mt-2 h-11 w-11 shrink-0">
          <img
            src={ownerAvatar}
            alt={username}
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="block flex-grow">
          <p className="flex items-center text-slate-200">
            @{username} · <span className="text-sm ml-1">{timeAgo}</span>
          </p>

          {isEditing ? (
            <input
              className="mt-3 text-sm text-slate-950 p-2 rounded-md w-full"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              ref={inputRef}
            />
          ) : (
            <p className="mt-3 text-sm">{initialComment}</p>
          )}

          <button
            className="group/btn flex items-center gap-x-2 border-slate-800  py-1.5 mt-2 after:content-[attr(data-like)]  focus:after:content-[attr(data-like-alt)]"
            data-like={likes}
            data-like-alt={likes}
            onClick={handleLike}
          >
            <span
              className={`inline-block w-5 ${
                liked ? "text-cyan-300" : "group-focus/btn:text-cyan-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={liked ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                ></path>
              </svg>
            </span>
          </button>
        </div>

        <div className="relative ml-auto my-auto mr-3">
          {isEditing ? (
            <button
              className="text-md text-white bg-blue-500 px-3 rounded-md py-1"
              onClick={handleUpdate}
            >
              Update
            </button>
          ) : (
            <button
              className="text-2xl font-bold text-white focus:outline-none"
              onClick={toggleDropdown}
            >
              &#8942;
            </button>
          )}

          {!isEditing && dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-slate-900 text-white rounded-md shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-800"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-800"
                onClick={commentId && deleteComment}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <hr className="my-4 border-slate-800" />
    </div>
  );
}

Comment.propTypes = {
  ownerAvatar: PropTypes.string.isRequired,
  timeAgo: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
};

export default Comment;
