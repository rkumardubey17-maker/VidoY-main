import VideoCard from "../components/Video/VideoCard";
import axiosInstance from "../services/axiosInstance";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import VideoCardSkeleton from "../components/VideoCardSkeleton";

function Home() {
  const {
    data: videos,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await axiosInstance.get("/videos");
      return res.data?.data;
    },
    staleTime: 1000 * 60,
  });

  return (
    <section className="w-full px-3 py-4 pb-[88px] sm:ml-[70px] sm:px-5 sm:pb-6 lg:ml-0">
      {/* Error State */}
      {isError ? (
        <div className="flex h-screen items-center justify-center p-4 text-center">
          <h3 className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-xl font-bold text-red-200">
            {error.response?.data?.message ||
              "An error occurred while fetching videos."}
          </h3>
        </div>
      ) : isLoading ? (
        // Loading State
        <div className="grid min-h-screen grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <VideoCardSkeleton key={index} />
          ))}
        </div>
      ) : videos?.length ? (
        // Videos Grid
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <Link to={`/videos/${video._id}`} key={video._id}>
              <VideoCard
                duration={video.duration}
                author={video.owner[0]?.fullName}
                avatar={video.owner[0]?.avatar?.url}
                thumbnailSrc={video.thumbnail?.url}
                title={video.title}
                views={video.views}
                timeAgo={video.createdAt}
              />
            </Link>
          ))}
        </div>
      ) : (
        // No Videos Available
        <div className="flex min-h-[60vh] items-center justify-center p-4 text-center">
          <h4 className="rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-5 text-lg font-semibold text-slate-400">
            No videos available at the moment. Please check back later.
          </h4>
        </div>
      )}
    </section>
  );
}

export default Home;
