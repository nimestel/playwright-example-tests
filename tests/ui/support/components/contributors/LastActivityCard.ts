import { Image } from '../common-components/image/Image';
import { Title } from '../common-components/title/Title';
import { BaseComponent } from '../BaseComponent';
import { Link } from '../common-components/link/Link';

export type LastActivityCardContent = {
    avatar: string;
    fullname: string;
    time: string;
    description: string;
    activity: string;
};

const selectors = {
    body: '[class*="userCradWrapper"]',
    avatar: 'img[class*="styles_avatar"]',
    fullname: '[class*="styles_headline"]',
    time: '[class*="styles_caption"]',
    description: '[class*="styles_regular"]',
    activity: '[class*="styles_regular"] a'
};

export class LastActivityCard extends BaseComponent {
    public static body = selectors.body;
    public selectors = selectors;

    public avatar = new Image({
        locator: this.locator.locator(selectors.avatar)
    });

    public fullname = new Title({
        locator: this.locator.locator(selectors.fullname)
    });

    public time = new Title({
        locator: this.locator.locator(selectors.time)
    });

    public description = new Title({
        locator: this.locator.locator(selectors.description)
    });

    public activity = new Link({
        locator: this.locator.locator(selectors.activity)
    });
}
