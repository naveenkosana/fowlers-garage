import { LionPagination } from '@lion/pagination';
import { LionButton } from '@lion/button';
import { LionIcon } from '@lion/icon';
import { LionSelectRich, LionOption } from '@lion/select-rich';
import { LionDialog } from '@lion/dialog';
import { LionInputDatepicker } from '@lion/input-datepicker';

import { FowlersGarage } from './FowlersGarage.js';
import { TitleNavbar } from './Components/TitleNavbar.js';
import { HomePage } from './Components/HomePage.js';
import { VehicleCard } from './Components/VehicleCard.js';
import { FilterPanel } from './Components/FilterPanel.js';
import { VehicleDetail } from './Components/VehicleDetail.js';

customElements.define('fowlers-garage', FowlersGarage);
customElements.define('title-navbar', TitleNavbar);
customElements.define('home-page', HomePage);
customElements.define('lion-pagination', LionPagination);
customElements.define('lion-button', LionButton);
customElements.define('lion-icon', LionIcon);
customElements.define('lion-select-rich', LionSelectRich);
customElements.define('lion-option', LionOption);
customElements.define('vehicle-card', VehicleCard);
customElements.define('filter-panel', FilterPanel);
customElements.define('vehicle-detail', VehicleDetail);
customElements.define('lion-dialog', LionDialog);
customElements.define('lion-input-datepicker', LionInputDatepicker);
