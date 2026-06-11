import { NavLink, useParams } from "react-router-dom";

function EditChannelInfo() {
  const { username } = useParams();
  return (
    <>
      <div className="px-4 pb-4 mt-5">
        <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-slate-700 bg-[#020617] py-2 sm:top-[82px] text-center">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "w-full border-b-2 border-cyan-400 bg-white px-3 py-1.5 text-cyan-300"
                : "w-full border-b-2 border-transparent px-3 py-1.5 text-slate-400"
            }
            to={`/c/${username}/edit/personal-info`}
          >
            Personal Information
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "w-full border-b-2 border-cyan-400 bg-white px-3 py-1.5 text-cyan-300"
                : "w-full border-b-2 border-transparent px-3 py-1.5 text-slate-400"
            }
            to={`/c/${username}/edit/channel-info`}
          >
            Channel Information
          </NavLink>
        </ul>
      </div>

      <div className="flex flex-wrap justify-center gap-y-4 p-4">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <h5 className="font-semibold">Channel Info</h5>
          <p className="text-slate-300">Update your Channel details here.</p>
        </div>
        <div className="w-full sm:w-1/2 lg:w-2/3">
          <div className="rounded-lg border">
            <div className="flex flex-wrap gap-y-4 p-4">
              <div className="w-full">
                <label className="mb-1 inline-block" htmlFor="username">
                  Username
                </label>
                <div className="flex rounded-lg border">
                  <p className="flex shrink-0 items-center border-r border-slate-800 px-3 align-middle">
                    vidplay.com/
                  </p>
                  <input
                    type="text"
                    className="w-full bg-transparent px-2 py-1.5"
                    id="username"
                    placeholder="@username"
                    value="reactpatterns"
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="mb-1 inline-block" htmlFor="desc">
                  Description
                </label>
                <textarea
                  className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                  rows="4"
                  id="desc"
                  placeholder="Channel Description"
                >
                  I&#x27;m a Product Designer based in Melbourne, Australia. I
                  specialise in UX/UI design, brand strategy, and Webflow
                  development.
                </textarea>
                <p className="mt-0.5 text-sm text-slate-300">
                  275 characters left
                </p>
              </div>
            </div>
            <hr className="border border-slate-700" />
            <div className="flex items-center justify-end gap-4 p-4">
              <button className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">
                Cancel
              </button>
              <button className="inline-block bg-cyan-400 px-3 py-1.5 text-slate-950">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditChannelInfo;
