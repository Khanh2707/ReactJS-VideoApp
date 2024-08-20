import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "profilePicture",
    headerName: "Profile Picture",
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={params.value}
          alt='profile'
          style={{ width: "160px", height: "90px" }}
        />
      </Box>
    ),
  },
];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 35,
    profilePicture: "https://picsum.photos/200?random=1",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    profilePicture: "https://picsum.photos/200?random=2",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
    profilePicture: "https://picsum.photos/200?random=3",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: 16,
    profilePicture: "https://picsum.photos/200?random=4",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: 27,
    profilePicture: "https://picsum.photos/200?random=5",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: "John",
    age: 150,
    profilePicture: "https://picsum.photos/200?random=6",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    profilePicture: "https://picsum.photos/200?random=7",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    profilePicture: "https://picsum.photos/200?random=8",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
    profilePicture: "https://picsum.photos/200?random=9",
  },
];

export default function ChannelEditingVideos() {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      autoHeight={true}
      rowHeight={110} // Chỉnh sửa chiều cao của hàng ở đây
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  );
}
