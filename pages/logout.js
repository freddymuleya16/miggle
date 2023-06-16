import { logout } from '@/actions/authActions';
import { withAuth } from '@/utils/withAuth';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function Logout() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout())
    }, [dispatch])
    return (
        <div>Logout</div>
    )
}

export default withAuth(Logout)