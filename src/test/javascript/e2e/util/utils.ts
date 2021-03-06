import { ExpectedConditions, ElementArrayFinder, ElementFinder, browser, by, element } from 'protractor';

const waitUntilDisplayedTimeout = 30000;

export const checkSelectorExist = (selector: ElementFinder) => selector !== undefined;

/**
 * @returns Function which resolves to boolean
 */
export const isDisplayed = (selector: ElementFinder) => {
  if (!checkSelectorExist(selector)) return;
  return ExpectedConditions.visibilityOf(selector);
};

export const isHidden = (selector: ElementFinder) => {
  if (!checkSelectorExist(selector)) return;
  return ExpectedConditions.invisibilityOf(selector);
};

/**
 * Wait until this page is displayed.
 */
export const waitUntilDisplayed = async (selector: ElementFinder, classname = '', timeout = waitUntilDisplayedTimeout) => {
  if (!checkSelectorExist(selector)) return;

  await browser.wait(
    isDisplayed(selector),
    timeout,
    `Failed while waiting for "${selector.locator()}" of Page Object Class '${classname}' to display.`
  );
};

export const waitUntilHidden = async (selector: ElementFinder, classname = '', timeout = waitUntilDisplayedTimeout) => {
  if (!checkSelectorExist(selector)) return;

  await browser.wait(
    isHidden(selector),
    timeout,
    `Failed while waiting for "${selector.locator()}" of Page Object Class '${classname}' to be hidden.`
  );
};

export const waitForCount = (elementArrayFinder: ElementArrayFinder, expectedCount: number) => () => {
  return elementArrayFinder.count().then(actualCount => expectedCount === actualCount);
};

export const waitUntilCount = async (
  elementArrayFinder: ElementArrayFinder,
  expectedCount: number,
  timeout = waitUntilDisplayedTimeout
) => {
  await browser.wait(
    waitForCount(elementArrayFinder, expectedCount),
    timeout,
    `Failed while waiting for "${elementArrayFinder.locator()}" to have ${expectedCount} elements.`
  );
};

export const getModifiedDateSortButton = (): ElementFinder => element(by.id('modified-date-sort'));
export const getUserDeactivatedButtonByLogin = (login: string): ElementFinder =>
  element(by.css('table > tbody'))
    .element(by.id(login))
    .element(by.css('.btn-danger.deactivated'));

export const getUserDeleteButtonByLogin = (login: string): ElementFinder =>
  element(by.css('table > tbody'))
    .element(by.id(login))
    .element(by.css('.btn-danger.delete'));

export const getUserDetailsButtonByLogin = (login: string): ElementFinder =>
  element(by.css('table > tbody'))
    .element(by.id(login))
    .element(by.css('.btn-info.details'));

export const getUserEditButtonByLogin = (login: string): ElementFinder =>
  element(by.css('table > tbody'))
    .element(by.id(login))
    .element(by.css('.btn-primary.edit'));

export const getUserEmailByLogin = (login: string): ElementFinder =>
  element(by.css('table > tbody'))
    .element(by.id(login))
    .element(by.css('.jhi-user-email'));

export const getSuccessToast = (): ElementFinder => element(by.css('div[role=alert].alert.alert-success'));

export const getInfoToast = (): ElementFinder => element(by.css('div[role=alert].alert.alert-info'));

export const getDangerToast = (): ElementFinder => element(by.css('div[role=alert].alert.alert-danger'));
