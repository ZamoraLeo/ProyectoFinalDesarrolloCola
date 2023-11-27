const { Builder, By, Key, until } = require('selenium-webdriver');

async function runTest() {
  // Inicializar el navegador (Chrome en este caso)
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navegar a la página de tu aplicación
    await driver.get('http://localhost:3000'); // Asegúrate de cambiar el puerto según tu configuración

    // Realizar interacciones (por ejemplo, hacer clic en un botón)
    const inputMateria = await driver.findElement(By.id('materia-nombre'));
    await inputMateria.sendKeys('Nueva Materia', Key.RETURN);

    // Esperar a que la página cargue (puedes ajustar el tiempo según sea necesario)
    await driver.wait(until.titleIs('App de Prueba'), 5000);

    // Puedes seguir realizando más interacciones y aserciones aquí

    console.log('Prueba exitosa!');
  } finally {
    // Cerrar el navegador al finalizar la prueba
    await driver.quit();
  }
}

// Ejecutar la prueba
runTest();