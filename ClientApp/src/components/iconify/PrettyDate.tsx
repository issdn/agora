import React from "react";
import IconInformation from "./IconInformation";
import { prettyDate } from "../../scripts/utils";

export default function PrettyDate({ date }: { date: string }) {
  return (
    <IconInformation
      iconName="calendar_month"
      information={!date ? "1/1/2022" : prettyDate(date)}
    />
  );
}
