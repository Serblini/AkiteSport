import { observer } from "mobx-react";
import { Navigate } from "react-router-dom";
import { authStore } from "../utilities/storeOb";

const Account = observer(() => {
  const user = authStore.user;

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!user) {
    return <Navigate to="/account" />;
  }

  // Функция для создания ника из почты
  const createNickname = (email: string) => {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    }
    return email;
  };

  // Создаем никнейм на основе почты пользователя
  const nickname = createNickname(user.email);

  return (
    <div>
      <h1>Личный кабинет</h1>
      <h2>Привет, {nickname}!</h2>
      {/* <p>Email: {user.email}</p> */}
    </div>
  );
});

export default Account;
