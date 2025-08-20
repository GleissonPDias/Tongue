function UploadPhoto({ userId }) {
  const handleFileChange = async (e) => {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("photo", e.target.files[0]);

    await fetch("http://192.168.100.4:8000/apis/upload_photo.php", {
      method: "POST",
      body: formData,
    });
  };
  return <input type="file" accept="image/*" onChange={handleFileChange} />;
}
