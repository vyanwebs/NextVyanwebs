import WebDevIntro from "../views/Services/WebDevelopment/WebDevIntro";
import WebDevService from "../views/Services/WebDevelopment/WebDevService";
import WebDevFAQ from "../views/Services/WebDevelopment/WebDevFAQ";

import SoftDevIntro from "../views/Services/SoftwareDevelopment/SoftDevIntro";
import SoftDevService from "../views/Services/SoftwareDevelopment/SoftDevService";
import SoftDevFAQ from "../views/Services/SoftwareDevelopment/SoftDevFAQ";

import UIUXIntro from "../views/Services/ui-ux-design/UIUXIntro";
import UIUXService from "../views/Services/ui-ux-design/UIUXService";
import UIUXFAQ from "../views/Services/ui-ux-design/UIUXFAQ";

import DevOpsIntro from "../views/Services/DevOpsEngineering/DevOpsIntro.jsx";
import DevOpsService from "../views/Services/DevOpsEngineering/DevOpsService";
import DevOpsFAQ from "../views/Services/DevOpsEngineering/DevOpsFAQ";

export const serviceComponents = {
  "web-development": {
    Intro: WebDevIntro,
    Service: WebDevService,
    FAQ: WebDevFAQ,
  },
  "software-development": {
    Intro: SoftDevIntro,
    Service: SoftDevService,
    FAQ: SoftDevFAQ,
  },
  "ui-ux-design": {
    Intro: UIUXIntro,
    Service: UIUXService,
    FAQ: UIUXFAQ,
  },
  "devops-engineering": {
    Intro: DevOpsIntro,
    Service: DevOpsService,
    FAQ: DevOpsFAQ,
  },
};
