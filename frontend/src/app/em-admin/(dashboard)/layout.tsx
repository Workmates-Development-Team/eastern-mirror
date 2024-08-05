"use client";
import { authState } from "@/atoms/authAtom";
import { profileState } from "@/atoms/profileAtom";
import AdminNavbar from "@/components/admin/Navbar";
import AdminSidebar from "@/components/admin/Sidebar";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { token } = useRecoilValue(authState);
  const setProfile = useSetRecoilState(profileState);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {data} = await axiosInstance.get("/admin/profile");
        setProfile(data);
      } catch (error) {
        console.log(error)
        router.push("/em-admin/login");
      }
    };

    if (token) {
      fetchProfile();
    } else {
      router.push("/em-admin/login");
    }
  }, [token, router, setProfile]);

  const profile = useRecoilValue(profileState);
  console.log(token, profile);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <AdminNavbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
