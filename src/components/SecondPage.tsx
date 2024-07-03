import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import axios from 'axios';
import DepartmentsList from './DepartmentsList';

interface Post {
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 230 },
    { field: 'body', headerName: 'Body', width: 400 }
  ];

  return (
    <div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={posts}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20]}
        />
      </div>
      <DepartmentsList />
    </div>
  );
};

export default SecondPage;