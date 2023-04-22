import { Inter } from "next/font/google";
import { logout } from "@/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { withAuth } from "../utils/withAuth";
import FullscreenLoading from "@/components/FullscreenLoading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "@/components/MainLayout";
import MatchPage from "./matches";

const inter = Inter({ subsets: ["latin"] });

function Home(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  //const error = useSelector(state => state.auth.error);
  const [activeTab, setActiveTab] = useState("#");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const error = useSelector((state) => state);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);


  if (isLoading) {
    return <FullscreenLoading />;
  }
  return (
    <MainLayout handleTabClick={handleTabClick} user={props.user}>
      {activeTab == "#" && <MatchPage user={props.user}/>}
      {activeTab == "notification" && <h1>Notification</h1>}
      {activeTab == "messages" && <h1>Messages</h1>}
    </MainLayout>
  );
}

export default withAuth(Home);
