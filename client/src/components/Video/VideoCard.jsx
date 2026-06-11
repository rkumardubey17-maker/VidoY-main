import PropTypes from "prop-types";
import { timeAgoFormat } from "../../utils/timeAgoFormat";
import { convertToTime } from "../../utils/convertToTime.js";

const VideoCard = ({
  avatar,
  duration,
  thumbnailSrc,
  title,
  views,
  timeAgo,
  author,
}) => {
  return (
    <div className="group w-full rounded-2xl border border-slate-800/80 bg-slate-900/35 p-2 shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-slate-900/70">
      <div className="relative mb-3 w-full overflow-hidden rounded-xl bg-slate-900 pt-[56%]">
        <div className="absolute inset-0">
          <img
            src={thumbnailSrc}
            alt={title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <span className="absolute bottom-2 right-2 inline-block rounded-md bg-slate-950/80 px-2 py-0.5 text-xs text-slate-100 ring-1 ring-white/10">
          {convertToTime(duration)}
        </span>
      </div>
      <div className="mx-1 flex gap-x-3">
        <div className="h-10 w-10 shrink-0">
          <img
            src={avatar}
            alt={author}
            className="h-full w-full rounded-full object-cover ring-2 ring-slate-800"
          />
        </div>
        <div className="w-full">
          <h6 className="line-clamp-2 text-[0.95rem] font-semibold text-slate-100">
            {title}
          </h6>
          <p className="mt-1 flex text-xs text-slate-400">
            {author} - {views} Views - {timeAgoFormat(timeAgo)}
          </p>
        </div>
      </div>
    </div>
  );
};

VideoCard.propTypes = {
  avatar: PropTypes.string,
  duration: PropTypes.number,
  thumbnailSrc: PropTypes.string,
  title: PropTypes.string,
  views: PropTypes.number,
  timeAgo: PropTypes.string,
  author: PropTypes.string,
};

export default VideoCard;
