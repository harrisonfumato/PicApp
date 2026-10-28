import React from 'react'; // Import React
import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiOutlineDocument
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'create',
		label: 'Add Customer',
		path: '/create',
		icon: <HiOutlineCube />
	},
	
	{
		key: 'customers',
		label: 'Customers',
		path: '/customers',
		icon: <HiOutlineUsers />
	},
	{
		key: 'transactions',
		label: 'Add Picture',
		path: '/picture',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'messages',
		label: 'Pictures',
		path: '/pictable',
		icon: <HiOutlineDocument />
	}
	,
	{
		key: 'order',
		label: 'Orders',
		path: '/order',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/messages',
		icon: <HiOutlineAnnotation />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]
