import { Inter } from "next/font/google";
import { logout } from "@/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { withAuth } from "../utils/withAuth";
import FullscreenLoading from "@/components/FullscreenLoading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "@/components/MainLayout";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth);
  //const error = useSelector(state => state.auth.error);
  const [Loading, setLoading] = useState(true);
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // change duration to adjust how long the animation should last
  }, []);

  if (Loading) {
    return <FullscreenLoading />;
  }
  const handleClick = () => {
    toast.success("This is a success message!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  return (
    <MainLayout handleTabClick={handleTabClick}>
      {activeTab == "#" && <h1>Match</h1>}
      {activeTab == "notification" && <h1>Notification</h1>}
      {activeTab == "messages" && <h1>Messages</h1>}
    </MainLayout>
  );
}

export default withAuth(Home);
