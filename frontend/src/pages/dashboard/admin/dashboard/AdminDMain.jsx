
import { useSelector } from 'react-redux'
import { useGetAdminStatsQuery } from '../../../../redux/features/stats/statsApi';
import AdminStats from './AdminStats';
import AdminStatsChart from './AdminStatsChart';

const AdminDMain = () => {
    const {user} = useSelector((state)=> state.auth);
    const {data: stats,isLoading,error} = useGetAdminStatsQuery();
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Failed and error</div>
    if(!stats) return <div>Failed to load data</div>
  return (
    <div className='p-6'>
        <div>
            <h1 className='text-2xl font-semibold mb-4'>Admin DashBoard</h1>
            <p className='text-gray-500'>Hi , {user?.username}! Welcome to admin dashboard</p>
            <AdminStats stats={stats}/>
            <AdminStatsChart stats={stats}/>
        </div>
    </div>
  )
}

export default AdminDMain