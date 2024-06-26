import { step, test } from '../../utils/fixtures/base-test';
import { IPage } from '../../support/pages/BasePage';
import { ContributorsPage } from '../../support/pages/ton/ContributorsPage';
import { MainPage } from '../../support/pages/ton/MainPage';
import { ActivitiesPage } from '../../support/pages/ton/ActivitiesPage';
import routes from '../../utils/helpers/routes';

let thisPage: IPage;
const pages = [ContributorsPage, MainPage, ActivitiesPage];

test.describe(`Check pages and elements`, () => {
    pages.forEach((currentPage) => {
        test.describe(`Check page ${currentPage.name}`, () => {
            test('check url and elements', async ({ page }) => {
                thisPage = new currentPage(page);

                await thisPage.goto();
                await thisPage.checkUrl();
                await thisPage.checkElements();
            });
        });
    });

    test('Check activity groups at /activities page', async ({ app, mock, page }) => {
        let activityGroups;

        await mock.getResponse(routes.getActivityGroup(), (result: any) => {
            activityGroups = result.pageProps.activityGroups;
        });

        await app.activitiesPage.goto();

        await page.waitForResponse(routes.getActivityGroup());

        await app.activitiesPage.activityGroupBar.shouldBeVisible();
        await app.activitiesPage.activityCard.shouldBeVisible();

        await mock.purgeAllRoutes();

        for (let group of activityGroups) {
            await step(`Checking "${group.name}" tab:`, async () => {
                await app.activitiesPage.activityGroupBar.clickGroup(group.name);

                await app.activitiesPage.activityGroupBar.shouldBeVisible();
                await app.activitiesPage.activityGroupBar.tabIsActive(group.name);

                if (group.slug != 'active')
                    await app.activitiesPage.activityGroupBanner.shouldBeVisible();

                await step(
                    `Checking that ${group.name} group has expected elements displayed`,
                    async () => {
                        if (group.slug != 'events')
                            await app.activitiesPage.activityCard.participantsAvatars.anyMemberShouldBeVisible();

                        await app.activitiesPage.activityCard.additionalInfo.anyMemberShouldBeVisible();
                        await app.activitiesPage.activityCard.participants.anyMemberShouldBeVisible();
                        await app.activitiesPage.activityCard.title.anyMemberShouldBeVisible();
                        await app.activitiesPage.activityCard.subtitle.anyMemberShouldBeVisible();
                        await app.activitiesPage.activityCard.image.anyMemberShouldBeVisible();
                    }
                );
            });
        }
    });

    test.skip('debug', async ({ app, page }) => {
        await app.contributorsPage.goto();
        await app.contributorsPage.checkUrl();
        await app.contributorsPage.checkElements();
    });
});
