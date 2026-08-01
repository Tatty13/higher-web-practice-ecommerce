# E-commerce

Интернет-магазин, разработанный в рамках учебной практики.  
Проект демонстрирует работу клиентской части приложения, каталог товаров, карточки товаров, корзину и базовые пользовательские сценарии.

## 🛠️ Стек

<div>

  <img src="https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/react/react-original.svg" title="React" alt="React" width="40" height="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/antdesign/antdesign-original.svg" title="Ant Design" alt="Ant Design" width="40" height="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/styledcomponents/styledcomponents-original.svg" title="Styled Components" alt="Styled Components" width="40" height="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" title="TypeScript" alt="TypeScript" width="40" height="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/redux/redux-original.svg" title="Redux" alt="Redux" width="40" height="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/reactrouter/reactrouter-original.svg" title="React Router" alt="React Router" width="40" height="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/vite/vite-original.svg" title="Vite" alt="Vite" width="40" height="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/jest/jest-plain.svg" title="Jest" alt="Jest" width="40" height="40"/>

</div>

## 🚀 Запуск проекта

### Фронтенд

```bash
npm install
npm run dev
```

Приложение будет доступно по адресу из вывода команды (обычно http://localhost:4000).

### Моковый бэкенд (json-server)

В отдельном терминале:

```bash
npm run server
```

Сервер поднимается на порту 5001. Базовый URL API использовать в настройках RTK Query (например, `http://localhost:5001`).

### Сборка

```bash
npm run build
```

### Линтинг

```bash
npm run lint
```

## 📁 Структура проекта

```text
src/                      — исходные файлы проекта
├── api/                  — запросы к api
├── app/                  — роутинг приложения
├── assets/               — иконки, изображения
├── common/               — общие компоненты
│  ├── components/        — компоненты
│  └── layout/            — разметка
├── features/             — бизнес-процессы
│  ├── auth/              — авторизация/регистрация
│  ├── cart/              — корзина товаров
│  ├── catalog/           — каталог товаров
│  ├── order/             — оформление заказа
│  ├── orderHistory/      — история заказов
│  └── profile/           — профиль пользователя
├── pages/                — страницы приложения
├── store/                — конфигурация хранилища redux
├── theme/                — темизация
├── types/                — основные типы
│  ├── cart.ts
│  ├── city.ts
│  ├── order.ts
│  ├── product.ts
│  └── user.ts
├── uiKit/                — компоненты UI
├── utils/                — утилиты
├── global.d.ts           — глобальные типы
├── index.css             — глобальные стили
└── main.tsx              — точка входа приложения
```

## ✨ Основные возможности

- просмотр списка товаров
- просмотр отдельной карточки товара
- поиск и фильтрация товара
- регистрация и авторизация пользователя
- личный кабинет и редактирование профиля
- просмотр истории заказов
- добавление товаров в корзину
- оформление и подтверждение заказа
- выставление рейтинга товару

## 👤 Пользовательские сценарии

Гость может:

- просматривать список товаров
- открывать карточки товаров
- регистрироваться
- авторизоваться

Авторизованный пользователь может:

- редактировать профиль
- добавлять товары в корзину
- оформлять заказы
- просматривать историю заказов
- выставлять рейтинг ранее купленным товарам
