"use client"
import { getFiles } from '@/actions';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { UserClient } from '@/components/tables/user-tables/client';
import { users } from '@/constants/data';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' }
];
export default function page() {
  const [data,setData] = useState()
  useEffect(()=>{
    getFiles().then((res)=>{
      if (!res.success) {
        alert("Something went wrong")
      }
      setData(res.body)
    })
  })
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
          {JSON.stringify(data)}
        <Breadcrumbs items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </>
  );
}
