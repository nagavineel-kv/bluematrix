// "use client"
// import { useGetUsersQuery } from '@/state/api'
// import React from 'react'
// import { useAppSelector } from '../redux';
// import Header from '@/components/Header';
// import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton} from '@mui/x-data-grid';
// import Image from 'next/image';
// import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';

// const CustomToolbar = () => (
//     <GridToolbarContainer className='toolbar flex gap-2'>
//         <GridToolbarFilterButton />
//         <GridToolbarExport />
//     </GridToolbarContainer>
// );

// const columns: GridColDef[] = [
//     {field: "userId", headerName: "ID", width: 100},
//     {field: "username", headerName: "Username", width: 150},
//     {field: "profilePictureUrl", headerName: "Profile Picture", width: 100, 
//         renderCell: (params) => (
//             <div className='flex h-full w-full items-center justify-center'>
//                 <div className='h-9 w-9'>
//                     <Image src={`/${params.value}`} alt={params.row.username} width={100} height={50} className='h-full rounded-full object-cover'/>
//                 </div>
//             </div>
//         )
//     },
// ]

// const Users = () => {
//     const {data: users, isLoading, isError} = useGetUsersQuery();
//     const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
//     if(isLoading) return <div>Loading...</div>
//     if(isError || !users) return <div>Error while fetching users...</div>
//   return (
//     <div className='flex w-full flex-col p-8'>
//         <Header name='Users'/>
//         <div style={{height: 650, width:"100%"}}>
//            <DataGrid 
//                 rows={users || []} 
//                 columns={columns} 
//                 getRowId={(row) => row.userId} 
//                 pagination 
//                 slots={{
//                     toolbar: CustomToolbar
//                 }}
//                 className={dataGridClassNames} 
//                 sx={dataGridSxStyles(isDarkMode)}
//             />
//         </div>
//     </div>
//   )
// }

// export default Users
"use client";

import React from "react";
import { useGetUsersQuery } from "@/state/api";
import { useAppSelector } from "../redux";
import Header from "@/components/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";

// 🌟 Floating, luxury-style toolbar
const CustomToolbar = () => (
  <GridToolbarContainer className="flex items-center justify-end px-4 py-3 bg-transparent">
    <div className="flex gap-2 text-sm text-muted-foreground">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </div>
  </GridToolbarContainer>
);

// 📊 Elegant DataGrid columns
const columns: GridColDef[] = [
  {
    field: "userId",
    headerName: "ID",
    width: 100,
    headerClassName: "font-medium",
  },
  {
    field: "username",
    headerName: "Username",
    flex: 1,
    minWidth: 160,
    headerClassName: "font-medium",
  },
  {
    field: "profilePictureUrl",
    headerName: "Profile",
    width: 100,
    sortable: false,
    headerClassName: "font-medium",
    renderCell: (params) => (
      <div className="flex items-center justify-center w-full">
        <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-300 dark:border-neutral-700 shadow-sm bg-gray-100 dark:bg-neutral-800">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    ),
  },
];

const dataGridSxStyles = (isDarkMode: boolean) => ({
  borderRadius: "12px",
  border: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.05)",
  backgroundColor: isDarkMode ? "#101012" : "#ffffff",
  color: isDarkMode ? "#E0E0E0" : "#1A1A1A",
  fontSize: "0.95rem",
  boxShadow: isDarkMode
    ? "0 4px 12px rgba(0,0,0,0.45)"
    : "0 6px 20px rgba(0,0,0,0.08)",

  ".MuiDataGrid-columnHeaders": {
    backgroundColor: isDarkMode ? "#19191c" : "#f9f9fb",
    fontWeight: 600,
    fontSize: "0.95rem",
    color: isDarkMode ? "#e4e4e4" : "#1a1a1a",
    borderBottom: isDarkMode
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(0,0,0,0.06)",
  },
  ".MuiDataGrid-row": {
    transition: "background 0.3s ease",
    "&:hover": {
      backgroundColor: isDarkMode ? "#1a1a1e" : "#f5f7f9",
    },
  },
  ".MuiDataGrid-cell": {
    padding: "14px",
  },
  ".MuiDataGrid-footerContainer": {
    backgroundColor: isDarkMode ? "#19191c" : "#f9f9fb",
    borderTop: isDarkMode
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(0,0,0,0.06)",
  },

  // Pagination fixes for dark mode
  ".MuiTablePagination-root": {
    color: isDarkMode ? "#FFFFFF" : "inherit",
  },
  ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
    color: isDarkMode ? "#E0E0E0" : "inherit",
  },
  ".MuiIconButton-root": {
    color: isDarkMode ? "#FFFFFF" : "inherit",
  },
  ".MuiIconButton-root:hover": {
    backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.04)",
  },
});


const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading)
    return <div className="text-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>;

  if (isError || !users)
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Error fetching users.
      </div>
    );

  return (
    <div className="w-full px-6 py-8 md:px-12 md:py-10 space-y-8 bg-background-light dark:bg-background-dark">
      <Header name="Users" />
      <div className="w-full h-[650px] rounded-xl overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-transparent dark:border-neutral-800">
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId}
          pagination
          slots={{ toolbar: CustomToolbar }}
          disableColumnMenu
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Users;

