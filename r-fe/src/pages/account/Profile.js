import React, { useState } from "react";
import LayoutDefault from "../../layout/default/LayoutDefault";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, logout, uploadProfilePicture } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // Preview URL for the selected image

  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  userInfo === null && dispatch(getUserInfo());
  
  const userImage =
    userInfo !== null
      ? `http://localhost:8080/api/posts/images/${userInfo.profilePictureUrl?.replace(/^uploads\\/, "")}`
      : "";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/Sign_in");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      // Generate a preview URL for the image file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Vui lòng chọn một tệp!");
      return;
    }

    dispatch(uploadProfilePicture(selectedFile))
      .unwrap()
      .then(() => {
        alert("Ảnh đại diện đã được cập nhật thành công!");
        setIsModalOpen(false); // Close modal after successful upload
        setSelectedFile(null); // Reset selected file
        setPreviewUrl(null);   // Reset preview URL
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("Đã xảy ra lỗi khi tải lên ảnh.");
      });
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
              <p className="text-gray-600 text-sm">Username</p>
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
              <p><strong>Ngày sinh: </strong>{userInfo?.birthDay || "08/12/2002"}</p>
              <p><strong>Địa chỉ: </strong>{userInfo?.address || "Chưa cập nhật"}</p>
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
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Thay đổi ảnh đại diện
            </button>
          </div>
        </div>

        {/* Modal for updating the profile picture */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-bold mb-4">Thay đổi ảnh đại diện</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full mb-4"
              />
              
              {/* Preview the selected image and file name */}
              {selectedFile && (
                <div className="flex flex-col items-center">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-full mb-2"
                  />
                  <p className="text-gray-600 text-sm">{selectedFile.name}</p>
                </div>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={handleUpload}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Tải lên
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return <LayoutDefault children={<Profile />} />;
}
