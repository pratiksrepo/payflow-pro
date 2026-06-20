import {
    Navigate
}
from "react-router-dom";

import {
    getRole
}
from "../utils/jwtHelper";

export default function AdminRoute(
{
    children
}: {
    children: React.ReactNode;
})
{
    const role =
        getRole();

    if (
        role !== "Admin"
    )
    {
        return (
            <Navigate
                to="/dashboard"
            />
        );
    }

    

    return children;
}