// "use client"
// import { useGetTeamsQuery, useGetUsersQuery } from '@/state/api'
// import React from 'react'
// import { useAppSelector } from '../redux';
// import Header from '@/components/Header';
// import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton} from '@mui/x-data-grid';
// import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';

// const CustomToolbar = () => (
//     <GridToolbarContainer className='toolbar flex gap-2'>
//         <GridToolbarFilterButton />
//         <GridToolbarExport />
//     </GridToolbarContainer>
// );

// const columns: GridColDef[] = [
//     {field: "id", headerName: "Team ID", width: 200},
//     {field: "teamName", headerName: "Team Name", width: 400},
//     {field: "productOwnerUsername", headerName: "Product Owner", width: 400},
//     {field: "projectManagerUsername", headerName: "Project Manager", width: 400},
// ]

// const Teams = () => {
//     const {data: teams, isLoading, isError} = useGetTeamsQuery();
//     const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
//     if(isLoading) return <div>Loading...</div>
//     if(isError || !teams) return <div>Error while fetching teams...</div>
//   return (
//     <div className='flex w-full flex-col p-8'>
//         <Header name='Teams'/>
//         <div style={{height: 650, width:"100%"}}>
//            <DataGrid 
//                 rows={teams || []} 
//                 columns={columns}  
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

// export default Teams
"use client";

import React from "react";
import { useGetTeamsQuery } from "@/state/api";
import { useAppSelector } from "../redux";
import Header from "@/components/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import clsx from "clsx";

// 🌟 Elegant Toolbar
const CustomToolbar = () => (
  <GridToolbarContainer className="flex items-center justify-end px-4 py-3 bg-transparent">
    <div className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </div>
  </GridToolbarContainer>
);

// 📦 Columns
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Team ID",
    width: 180,
    headerClassName: "premium-header",
  },
  {
    field: "teamName",
    headerName: "Team Name",
    flex: 1,
    minWidth: 240,
    headerClassName: "premium-header",
  },
  {
    field: "productOwnerUsername",
    headerName: "Product Owner",
    flex: 1,
    minWidth: 220,
    headerClassName: "premium-header",
  },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    flex: 1,
    minWidth: 220,
    headerClassName: "premium-header",
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


const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading)
    return <div className="text-center text-gray-500 dark:text-gray-400">Loading...</div>;
  if (isError || !teams)
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Error while fetching teams...
      </div>
    );

  return (
    <div className="w-full px-6 py-8 md:px-12 md:py-10 space-y-8 bg-gray-50 dark:bg-[#0e0e10]">
      <Header name="Teams" />
      <div className="w-full h-[650px] rounded-xl overflow-hidden shadow-xl border border-transparent dark:border-neutral-800">
        <DataGrid
          rows={teams || []}
          columns={columns}
          pagination
          getRowId={(row) => row.id}
          slots={{ toolbar: CustomToolbar }}
          className={clsx("custom-data-grid")}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;
