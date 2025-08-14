export function processa_login(email: string, senha: string): void {
  const emailInput = document.getElementById(
    "email"
  ) as HTMLInputElement | null;
  const senhaInput = document.getElementById(
    "senha"
  ) as HTMLInputElement | null;

  if (!emailInput || !senhaInput) {
    console.error("Campos de email ou senha não encontrados no DOM.");
    return;
  }

  fetch("http://192.168.100.4:8000/processa_login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${encodeURIComponent(email)}&senha=${encodeURIComponent(
      senha
    )}`,
  })
    .then(async (response) => {
      const text = await response.text();
      console.log("Resposta bruta do PHP:", text);
      try {
        const data = JSON.parse(text);
        alert(data.message);
        console.log("Resposta JSON:", data);
      } catch (e) {
        console.error("Erro ao parsear JSON:", e);
      }
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
    });
}
