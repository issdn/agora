import React from "react";
import { prettyDate } from "../../scripts/utils";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export default function PrettyDate({ date }: { date: string }) {
  return (
    <div
      className="flex flex-row
      gap-x-1 items-center"
    >
      <CalendarMonthOutlinedIcon fontSize="inherit" />
      <p>{!date ? "1/1/2022" : prettyDate(date)}</p>
    </div>
  );
}
