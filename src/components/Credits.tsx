import React, { ReactElement } from "react"

export const Credits = (): ReactElement => {
  return (
    <footer>
      <p>&copy; Steven Moran {new Date().getFullYear()}</p>
    </footer>
  );
};
