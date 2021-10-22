import classnames from "classnames";
import React from "react";

const styles = {
  h1: "text-3xl",
  h2: "text-xl",
  h3: "text-lg",
  h4: "",
  h5: "",
  h6: "",
};

const alignment = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const textColor = {
  white: "text-white",
  alternate: "text-alternate",
  primary: "text-primary",
  dark: "text-dark"
};

const Heading = ({
  type: Tag = "h1",
  children,
  align = "center",
  color = "white",
  className
}) => {

  const classNamesArr = className ? className.split(" ") : []
  return (
    <Tag
      className={classnames([
        "p-2",
        "m-2",
        "font-bold",
        styles[Tag],
        alignment[align],
        textColor[color],
        ...classNamesArr
      ])}
    >
      {children}
    </Tag>
  );
};

export default Heading;
