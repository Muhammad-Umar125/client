import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'


const MenuItems = ({ setSiteBarOpen }) => {
    return (
        <div className=' px-3 mt-4'>
            {
                menuItemsData.map(({ to, label, Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === '/'}
                        onClick={() => setSiteBarOpen(false)}
                        className={({ isActive }) => `flex p-3 gap-2 ${isActive ? `bg-indigo-50 text-indigo-700 rounded-2xl` : `hover:bg-gray-50`}`}>
                        <Icon className='w-5 h-5' />
                        {label}
                    </NavLink>
                ))
            }
        </div>
    )
}

export default MenuItems
