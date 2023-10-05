import { Route, Routes } from "react-router-dom";
import Profile from "./profile";
import Credential from "./credential";
import Transaction from "./transaction";
import withAuth from "../services/Auth";
import DefaultLayout from "../layout/DefaultLayout";

function Homepage() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/credential" element={<Credential />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </DefaultLayout>
  );
}

export default withAuth(Homepage);
