export const getAssetPath = (path) => {
  // Проверяем, запущено ли приложение в Electron
  if (window?.process?.type === 'renderer') {
    // Для Electron возвращаем относительный путь от корня
    return path;
  }
  // Для Web используем PUBLIC_URL
  return `${process.env.PUBLIC_URL}/${path}`;
}; 