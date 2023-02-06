import React from "react";
import { AddToastFuncType } from "../types/appTypes";

type PropsType = { addToast: AddToastFuncType };

export default function RouteRenderer({
  element,
  props,
}: {
  element: any;
  props: PropsType;
}) {
  return React.cloneElement(element, props);
}
