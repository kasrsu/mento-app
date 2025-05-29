
# 📱 MENTO Frontend — Expo App

![Expo](https://img.shields.io/badge/Expo-48C9B0?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-20232A?logo=react)
![Platform](https://img.shields.io/badge/Platforms-Android%20%7C%20iOS%20%7C%20Web-blue)

---

MENTO is an AI-powered course guidance system for IT freshers. This mobile-first frontend is built using **Expo + React Native**, providing users a smooth and responsive interface to interact with the MENTO backend and chatbot system.

---

## ⚙️ Get Started

### 1. Install Dependencies

```bash
npm install
````

### 2. Start the App

```bash
npx expo start
```

After launching, you’ll see options to open the app in:

* 📱 [Expo Go](https://expo.dev/go) (on your physical device)
* 📱 Android Emulator
* 🍎 iOS Simulator
* 🌐 Web browser (for quick testing)

> ✅ **Recommended**: Use a [development build](https://docs.expo.dev/develop/development-builds/introduction/) for full feature access.

---

## 🗂 Project Structure

```bash
app/
├── components/              # Reusable UI components (ChatInterface, Header, ProgressCard)
├── context/                 # Global state (SessionContext.tsx)
├── navigation/              # App screen navigation and types
├── screens/                 # Main app screens (Chat, Home, Profile, Recommendations)
├── types/                   # TypeScript interfaces (e.g. Module.ts)
└── App.tsx                  # Entry point of the Expo app
```

---

## ♻️ Reset Project (Optional)

To reset the app and start fresh:

```bash
npm run reset-project
```

This will archive the current app to `app-example/` and generate a blank structure under `app/`.

---

## 🔗 Backend Integration

This app is connected to the [MENTO backend](https://github.com/kasrsu/project_mento), which powers the chatbot and recommendation engine. Make sure the backend API is running and accessible when using the app.

> ⚠️ **IMPORTANT**: Update the API base URL in the relevant context or service files before building.

---

## 📚 Learn More

* [📘 Expo Documentation](https://docs.expo.dev/)
* [📘 React Native Docs](https://reactnative.dev/)
* [📘 Expo Router (File-based Routing)](https://docs.expo.dev/router/introduction/)

---

## 🤝 Join the Community

* 💬 [Expo Discord](https://chat.expo.dev/)
* 💻 [Expo GitHub](https://github.com/expo/expo)

---

## 🧑‍💻 Maintainer

**Anusara (KASR)**
📧 [your-email@example.com](mailto:your-email@example.com)
🌐 [GitHub: kasrsu](https://github.com/kasrsu)

---

## 📄 License

This project is part of the MENTO AI initiative and is licensed under [MIT License](LICENSE).

---


