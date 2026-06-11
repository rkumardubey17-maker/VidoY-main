const VideoCardSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="relative mb-2 w-full pt-[56%] bg-slate-800 rounded-md">
        <div className="absolute inset-0 bg-slate-900 rounded"></div>
        <span className="absolute bottom-1 right-1 h-4 w-10 bg-slate-700 rounded"></span>
      </div>
      <div className="flex gap-x-2 mx-2">
        <div className="h-10 w-10 shrink-0 bg-slate-800 rounded-full"></div>
        <div className="w-full space-y-2">
          <div className="h-4 w-3/4 bg-slate-800 rounded"></div>
          <div className="h-3 w-1/2 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardSkeleton;
