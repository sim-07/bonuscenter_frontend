import { Box } from "@mui/material";
import { useState } from "react";

import DashboardLayout from "../src/components/common/DashboardLayout";
import BonusContainer from "@/components/bonus/BonusContainer";

export default function Dashboard() {

    
    return (
        <DashboardLayout>
            <BonusContainer width="90%"/>
        </DashboardLayout>
    );
}
