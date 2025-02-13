import { Skeleton, SVGSkeleton } from "./skeleton-ui";

const LoadingSkeleton = () => {
  return (
    <>
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center justify-center">
          <Skeleton className="w-[176px] max-w-full " />
        </div>
        <form className="flex space-x-2">
          <div className="flex h-9 w-full border  px-3 py-1 transition-colors flex-grow shadow-none rounded-lg">
            <Skeleton className="w-[112px] max-w-full " />
          </div>
          <div className="inline-flex items-center  border  rounded-lg justify-center gap-2 transition-colors [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 py-2 px-7">
            <Skeleton className="w-[24px] max-w-full" />
          </div>
        </form>
        <div className="w-full">
          <div className="h-9 items-center justify-center  grid w-full grid-cols-3 gap-2 bg-[#f5f5f5] rounded-lg ">
            <div className="inline-flex items-center justify-center px-3 py-1  rounded-lg bg-[#f5f5f5]">
              <Skeleton className="w-[24px] max-w-full" />
            </div>
            <div className="inline-flex items-center justify-center px-3 py-1  rounded-lg">
              <Skeleton className="w-[32px] max-w-full" />
            </div>
            <div className="inline-flex items-center justify-center px-3 py-1  rounded-lg">
              <Skeleton className="w-[72px] max-w-full" />
            </div>
          </div>
          <div className="mt-2 space-y-4">
            <ul className="space-y-2 ">
              <li className="flex items-center space-x-2 p-2 bg-[#f5f5f5] rounded-md">
                <div className="h-4 w-4 shrink-0  bg-gray-300 shadow-none rounded-sm"></div>
                <label className="flex-grow">
                  <Skeleton className="w-full max-w-full " />
                </label>
                <div className="inline-flex items-center justify-center gap-2 transition-colors [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 w-9">
                  <SVGSkeleton className="w-[24px] h-[24px]" />
                </div>
              </li>
              <li className="flex items-center space-x-2 p-2 bg-[#f5f5f5] rounded-md">
                <div className="h-4 w-4 shrink-0  bg-gray-300  shadow-none rounded-sm"></div>
                <label className="flex-grow">
                  <Skeleton className="w-full max-w-full" />
                </label>
                <div className="inline-flex items-center justify-center gap-2 transition-colors [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 w-9 ">
                  <SVGSkeleton className="w-[100px] h-[24px]" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingSkeleton;
