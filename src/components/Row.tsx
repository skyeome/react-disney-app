import React from "react";

const Row = ({
  title,
  id,
  fetchUrl
}: {
  title: string;
  id: string;
  fetchUrl: string;
}) => {
  return (
    <div>
      <div>{title}</div>
      <div>{id}</div>
      <div>{fetchUrl}</div>
    </div>
  );
};

export default Row;
