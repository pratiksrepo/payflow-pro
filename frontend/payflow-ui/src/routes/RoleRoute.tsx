import {
    Navigate
}
from "react-router-dom";

import {
    getRole
}
from "../utils/jwtHelper";

interface Props
{
    allowedRole: string;

    children: React.ReactNode;
}

export default function RoleRoute(
{
    allowedRole,
    children
}: Props)
{
    const role =
        getRole();

    if (
        role !== allowedRole
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