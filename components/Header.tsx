import {
  ChevronDownIcon,
  GlobeIcon,
  HomeIcon,
  SearchIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/solid'
import {
  BellIcon,
  ChatIcon,
  MenuIcon,
  PlusIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'

function Header() {
  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image
          objectFit="contain"
          src="https://links.papareact.com/fqy"
          layout="fill"
        />
      </div>
      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* Search box */}
      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-600" />
        <input
          type="text"
          className="flex-1 bg-transparent outline-none"
          placeholder="Search"
        />
        <button type="submit" hidden />
      </form>

      <div className=" hidden space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>

      {/* singin singout */}
      <div className="hidden items-center space-x-2 border border-gray-100 p-2  lg:flex">
        <div className="relative h-5 w-5 flex-shrink-0 ">
          <Image
            layout="fill"
            objectFit="contain"
            src="https://links.papareact.com/23l"
            height={5}
            width={5}
          />
        </div>
        <p className="text-gray-400">Sing In</p>
      </div>
    </div>
  )
}

export default Header
