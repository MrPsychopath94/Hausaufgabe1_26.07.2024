import {Builder, By, until} from "selenium-webdriver"


let driver;


beforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3001")
})

afterAll(async () => {
  await driver.quit()
})

test('tier hinzufügen und in der Liste verifizieren', async () => {
await driver.findElement(By.linkText("Tiere Hinzufügen")).click()
await driver.findElement(By.name("tierart")).sendKeys("Esel")
await driver.findElement(By.name("name")).sendKeys("IA")
await driver.findElement(By.name("krankheit")).sendKeys("Bauchweh")
await driver.findElement(By.name("geburtstag")).sendKeys("01.05.2022")
await driver.findElement(By.name("gewicht")).sendKeys("120")
// await driver.findElement(By.css("button[type='submit']")).click()
await driver.findElement(By.css("button")).click()
await driver.wait(until.alertIsPresent(),2000)
let alert = await driver.switchTo().alert();
await alert.accept();


const allTiereLink =await driver.wait(until.elementLocated(By.linkText("Alle Tiere anzeigen")), 2000);
allTiereLink.click()

await driver.wait(until.elementLocated(By.css("ul")),2000)
const lastChild = await driver.findElement(By.css("ul li:last-child"))
expect(await lastChild.getText()).toContain("IA")

});


test("Tier editieren und in der Liste verifizieren", async () => {
 
  const searchInput = await driver.findElement(By.css("input[placeholder='Tiere Suchen..']"));
  await searchInput.sendKeys("Esel"); 

 
  const firstTier = await driver.wait(
    until.elementLocated(By.css("ul li:first-child")),
    5000
  );

  
  const editButton = await firstTier.findElement(By.linkText("Bearbeiten"));
  await editButton.click();

  
  await driver.wait(until.elementLocated(By.name("name")), 5000);

 
  const nameField = await driver.findElement(By.name("name"));
  await nameField.clear();
  await nameField.sendKeys("Neuer Name");

  const krankheitField = await driver.findElement(By.name("krankheit"));
  await krankheitField.clear();
  await krankheitField.sendKeys("Neue Krankheit");

 
  const saveButton = await driver.findElement(
    By.css("button[type='submit']") 
  );
  await saveButton.click();

  
  await driver.wait(until.urlContains("/animalList"), 5000);

 
  await searchInput.clear();
  await searchInput.sendKeys("Neuer Name");
  
  await driver.wait(until.elementLocated(By.css("ul li:first-child")), 5000);
  const updatedTierName = await driver.findElement(By.css("ul li:first-child")).getText();

  expect(updatedTierName).toContain("Neuer Name");
  expect(updatedTierName).toContain("Neue Krankheit");
});