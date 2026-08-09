import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentsIcon from "@mui/icons-material/Payments";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";

import { useNavigate } from "react-router-dom";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function Sidebar({
    open,
    onClose
}: Props) {

    const navigate = useNavigate();

    const menus = [
        {
            text: "Dashboard",
            icon: <DashboardIcon />,
            path: "/dashboard"
        },
        {
            text: "Wallet",
            icon: <AccountBalanceWalletIcon />,
            path: "/wallet"
        },
        {
            text: "Payments",
            icon: <PaymentsIcon />,
            path: "/payments"
        },
        {
            text: "Notifications",
            icon: <NotificationsIcon />,
            path: "/notifications"
        },
        {
            text: "Search",
            icon: <SearchIcon />,
            path: "/search"
        },
        {
            text: "Audit Logs",
            icon: <HistoryIcon />,
            path: "/auditlogs"
        }
    ];

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
        >
            <List sx={{ width: 250 }}>

                {menus.map(menu => (

                    <ListItemButton
                        key={menu.text}
                        onClick={() => {
                            navigate(menu.path);
                            onClose();
                        }}
                    >

                        <ListItemIcon>
                            {menu.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={menu.text}
                        />

                    </ListItemButton>

                ))}

            </List>
        </Drawer>
    );
}