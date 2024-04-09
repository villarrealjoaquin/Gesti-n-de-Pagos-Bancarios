import { Route, Routes } from "react-router-dom";

export const RouterWithNotFound = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<>Not found</>} />
    </Routes>
  );
};
