'use client'
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


interface Props {
    onAction: (page: number) => Promise<void>;
    totalItems: number;
}
export const CustomPagination = (props: Props) => {

    const { onAction, totalItems } = props;

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        onAction(value);
    };

    return (
        <>
            <Stack spacing={2}>
                <Pagination count={Math.ceil(totalItems / 10)} variant="outlined" page={page} onChange={handleChange} shape="rounded" />
            </Stack>
        </>
    );
}