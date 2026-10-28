import React, { Fragment, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { Transition, Menu } from '@headlessui/react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import UserDetail from '../../components/Shared/UserDetails.jsx';
import { useSelector } from 'react-redux';
import { logout, selectSubdomain } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUserDetailOpen, setUserDetailOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const subdomain = useSelector(selectSubdomain);
  console.log('User data from Redux:', user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleUserDetail = () => {
    setUserDetailOpen((prevState) => !prevState);
  };

  console.log('User data in Header:', user);

  return (
    <div className="bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between">
      <div className="relative flex-grow">
        <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm"
        />
      </div>

      {/* Responsive subdomain link, floated to the right */}
      {subdomain && (
        <div className="text-blue-500 text-sm sm:text-base md:text-lg ml-auto">
          <a href={`https://${subdomain}`} target="_blank" rel="noopener noreferrer">
            Visit Your Page
          </a>
        </div>
      )}

      <div className="flex items-center gap-2 mr-2">
        <Menu as="div" className="relative inline-block test-left">
          <div>
            <Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <span className="sr-only">Open user menu</span>
              <div
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}
              >
                <span className="sr-only">{user?.name}</span>
              </div>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={toggleUserDetail}
                    className={classNames(
                      active && 'bg-gray-100',
                      'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
                    )}
                  >
                    Your Profile
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate('/settings')}
                    className={classNames(
                      active && 'bg-gray-100',
                      'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
                    )}
                  >
                    Settings
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={handleLogout}
                    className={classNames(
                      active && 'bg-gray-100',
                      'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
                    )}
                  >
                    Sign out
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {isUserDetailOpen && (
        <UserDetail user={user} onClose={toggleUserDetail} />
      )}
    </div>
  );
}

export default Header;
