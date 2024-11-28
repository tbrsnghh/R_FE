import React from "react";
import LayoutDefault from "../../layout/default/LayoutDefault";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const userImage = userInfo !== null ? `http://localhost:8080/api/posts/images/${userInfo.profilePictureUrl?.replace(/^uploads\\/, "")}` : '';
  const handleLogout = () => {
    dispatch(logout());
    navigate("/Sign_in");
  };

  const Profile = () => {
    return (
      <div className="w-full mt-5 h-screen flex flex-col items-center bg-gray-100 py-10">
        <div className="bg-white p-6 w-4/5">
          <div className="flex items-center space-x-4">
            <img
              src={userImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <p className="texxt-gray-600 text-sm">Username</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {userInfo?.username}
              </h2>
              
            </div>
          </div>

          <div className="mt-5">
            
            <div className="mt-2 space-y-2">
              <p><strong>Tên: </strong>{userInfo?.firstName || "Chưa cập nhật"}</p>
              <p><strong>Họ: </strong>{userInfo?.lastName || "Chưa cập nhật"}</p>
              <p><strong>Số điện thoại: </strong>{userInfo?.phoneNumber || "Chưa cập nhật"}</p>
              <p><strong>Email: </strong>{userInfo?.email || "Chưa cập nhật"}</p>
              <p><strong>Ngày sinh: </strong>{userInfo?.birthday || "Chưa cập nhật"}</p>
              <p><strong>Địa chỉ: </strong>{userInfo?.address || "Chưa cập nhật"}</p>
              {/* <p><strong>Vai trò: </strong>{userInfo?.role || "Chưa cập nhật"}</p> */}
            </div>
          </div>

          <div className="mt-5 text-left space-x-2">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Đăng xuất
            </button>
            <button
              onClick={() => navigate("/updateAvatar")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Cập nhật ảnh đại diện
            </button>
          </div>
        </div>
      </div>
    );
  };

  return <LayoutDefault children={<Profile />} />;
}
