export function UserPhoto({ userId }) {
  return (
    <img
      src={`http://192.168.100.4:8000/apis/get_photo.php?id=${userId}`}
      alt="Foto do usuário"
    />
  );
}
