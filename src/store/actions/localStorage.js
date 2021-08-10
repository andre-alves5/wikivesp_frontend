export const saveToke = (user) => {
  if (!user.token) return null;
  const [token1, token2, token3] = user.token.split(".");
  localStorage.setItem("valueTk1", token1);
  localStorage.setItem("valueTk2", token2);
  localStorage.setItem("valueTk3", token3);
};

export const cleanToken = () => {
  localStorage.removeItem("valueTk1");
  localStorage.removeItem("valueTk2");
  localStorage.removeItem("valueTk3");
};

export const getToken = () => {
  const token1 = localStorage.getItem("valueTk1");
  const token2 = localStorage.getItem("valueTk2");
  const token3 = localStorage.getItem("valueTk3");
  if (!token1 || !token2 || !token3) return null;
  return `${token1}.${token2}.${token3}`;
};

export const getHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
};
