type UploadPhotoProps = {
  userId: number;
  onUploadSuccess?: () => void; // 👈 nova prop
};

export function UploadPhoto({ userId, onUploadSuccess }: UploadPhotoProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("Nenhuma imagem selecionada.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userId.toString());
    formData.append("photo", file);

    try {
      const response = await fetch(
        "http://localhost:8000/apis/upload_photo.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("Foto enviada com sucesso!");

        // 👇 chama a função para forçar o recarregamento da imagem
        onUploadSuccess?.();
      } else {
        alert("Erro ao enviar a foto: " + result.message);
      }
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      alert("Erro inesperado ao enviar a foto.");
    }
  };

  return <input type="file" accept="image/*" onChange={handleFileChange} />;
}
