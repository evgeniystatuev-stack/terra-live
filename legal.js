// Legal texts shown in Settings. Keep appstore/privacy.md and appstore/terms.md in sync (those are the published copies).
const SUPPORT_EMAIL = 'yauhenistatuyeu1996@yahoo.com';  // set to the support address before App Store submission; the Contact row hides while empty
const LEGAL_DATE = { ru: '21 октября 2026 г.', en: 'October 21, 2026' };

const LEGAL = {
privacy: { ru: `
<h3>Политика конфиденциальности</h3>
<p class="muted">Terra Live · действует с ${LEGAL_DATE.ru}</p>
<p class="muted">Перевод для удобства. Юридически главная версия — английская; при расхождениях действует она.</p>
<p><b>Коротко:</b> в Terra Live нет аккаунтов, рекламы, аналитики и собственных серверов. Мы не собираем, не храним и не продаём персональные данные.</p>
<h4>Геопозиция</h4>
<p>Если вы разрешите доступ, приложение использует вашу геопозицию на устройстве, чтобы показать погоду и новости рядом с вами и подставить начало маршрута. Для этого координаты (без вашего имени, идентификаторов или истории) отправляются напрямую в сервисы погоды и карт, перечисленные ниже, только на время обработки запроса. Геопозиция никогда не используется для рекламы или отслеживания. Доступ можно отозвать в Настройках iOS в любой момент — приложение продолжит работать.</p>
<h4>Сервисы, к которым обращается приложение</h4>
<ul>
<li>Apple — Карты, названия мест, Apple Weather (координаты места или области карты).</li>
<li>Национальная метеослужба США (NWS), MET Norway — прогноз погоды (координаты).</li>
<li>NASA GIBS — снимки Земли и снежный покров; Live Cloud Maps / EUMETSAT — облака; CelesTrak — орбиты спутников; GDACS — тропические циклоны (запросы без данных о вас).</li>
<li>Издания новостей — их открытые RSS-ленты (запрос ленты, без данных о вас); сайты мест отдыха — их значки (favicon).</li>
</ul>
<p>Каждый сервис получает только то, что нужно для ответа на запрос, и действует по собственной политике конфиденциальности.</p>
<h4>Ссылки</h4>
<p>«Подробнее» у новости и ссылки в карточках мест открывают сайт издания или заведения в Safari. Там действуют правила этого сайта.</p>
<h4>Что хранится на устройстве</h4>
<p>Только ваши настройки: язык новостей, единицы измерения, вид транспорта и фильтры маршрута. Они не покидают устройство.</p>
<h4>Дети</h4>
<p>Приложение не собирает данные ни о ком, включая детей.</p>
<h4>Изменения</h4>
<p>Если политика изменится, новая версия появится здесь и на странице приложения с новой датой.</p>
<h4>Связь</h4>
<p>{CONTACT}</p>`,
en: `
<h3>Privacy Policy</h3>
<p class="muted">Terra Live · effective ${LEGAL_DATE.en}</p>
<p><b>In short:</b> Terra Live has no accounts, ads, analytics or servers of its own. We do not collect, store or sell personal data.</p>
<h4>Location</h4>
<p>If you allow it, the app uses your location on the device to show the weather and news around you and to set the start of your route. To do that, coordinates (no name, identifiers or history) are sent directly to the weather and map services listed below, only for the time it takes to answer the request. Location is never used for advertising or tracking. You can revoke access in iOS Settings at any time; the app keeps working.</p>
<h4>Services the app talks to</h4>
<ul>
<li>Apple — Maps, place names, Apple Weather (coordinates of a place or map area).</li>
<li>US National Weather Service (NWS), MET Norway — forecasts (coordinates).</li>
<li>NASA GIBS — Earth imagery and snow cover; Live Cloud Maps / EUMETSAT — clouds; CelesTrak — satellite orbits; GDACS — tropical cyclones (requests carry no data about you).</li>
<li>News publishers — their public RSS feeds (a feed request, nothing about you); websites of places to stop — their icons (favicons).</li>
</ul>
<p>Each service receives only what it needs to answer the request and applies its own privacy policy.</p>
<h4>Links</h4>
<p>“Read more” on a story and links on place cards open the publisher’s or business’s website in Safari, where that site’s rules apply.</p>
<h4>What stays on your device</h4>
<p>Only your settings: news language, units, vehicle type and route filters. They never leave the device.</p>
<h4>Children</h4>
<p>The app collects no data from anyone, including children.</p>
<h4>Changes</h4>
<p>If this policy changes, the new version appears here and on the app’s page with a new date.</p>
<h4>Contact</h4>
<p>{CONTACT}</p>` },

terms: { ru: `
<h3>Условия использования</h3>
<p class="muted">Terra Live · действует с ${LEGAL_DATE.ru}</p>
<p class="muted">Перевод для удобства. Юридически главная версия — английская; при расхождениях действует она.</p>
<p>Устанавливая или используя Terra Live, вы соглашаетесь с этими условиями. Дополнительно действует стандартное лицензионное соглашение Apple для приложений из App Store.</p>
<h4>1. Лицензия</h4>
<p>Вы получаете неисключительную лицензию на использование приложения на своих устройствах Apple в личных целях. Нельзя копировать, изменять, продавать приложение или обходить его защиту.</p>
<h4>2. Погода, дороги и маршруты — только для сведения</h4>
<p>Прогнозы погоды, предупреждения об опасных явлениях (включая метель, ледяной дождь и гололёд — «black ice»), маршруты, время в пути и места остановок рассчитываются автоматически по данным сторонних сервисов и могут быть неточными, устаревшими или неполными. Они не заменяют официальные предупреждения властей, дорожные знаки и вашу собственную оценку обстановки. <b>Все решения за рулём принимает водитель.</b> Не пользуйтесь приложением во время движения — остановитесь в безопасном месте.</p>
<h4>3. Новости и чужой контент</h4>
<p>Заголовки и краткие анонсы принадлежат изданиям и показываются из их открытых лент с указанием источника и ссылкой на оригинал. Сведения о местах (отели, стоянки, парки), их названия и значки принадлежат соответствующим компаниям; классы отелей по звёздам определяются по сети отелей и носят ориентировочный характер. Terra Live не связан с этими изданиями и компаниями и не отвечает за их содержание, цены и доступность.</p>
<h4>4. Сторонние сервисы</h4>
<p>Приложение зависит от сервисов Apple, NASA, NWS, MET Norway, EUMETSAT, CelesTrak, GDACS и изданий. Они могут изменяться, ограничиваться или прекращаться без нашего участия.</p>
<h4>5. Отсутствие гарантий</h4>
<p>Приложение предоставляется «как есть», без каких-либо гарантий, явных или подразумеваемых, в том числе гарантий точности, пригодности для определённой цели и бесперебойной работы.</p>
<h4>6. Ограничение ответственности</h4>
<p>В максимальной степени, допускаемой законом, разработчик не несёт ответственности за любые убытки, ущерб имуществу, травмы или иные последствия, возникшие из-за использования приложения или невозможности его использовать, в том числе из-за неточных данных о погоде, дорогах или местах. Там, где закон не позволяет полностью исключить ответственность, она ограничивается суммой, уплаченной вами за приложение за последние 12 месяцев.</p>
<h4>7. Изменения</h4>
<p>Мы можем обновлять приложение и эти условия. Новая редакция появляется здесь с новой датой; продолжая пользоваться приложением, вы принимаете её.</p>
<h4>8. Применимое право</h4>
<p>К этим условиям применяется законодательство штата Калифорния, США, без учёта коллизионных норм, если обязательные нормы закона вашей страны не предусматривают иное.</p>
<h4>Связь</h4>
<p>{CONTACT}</p>`,
en: `
<h3>Terms of Use</h3>
<p class="muted">Terra Live · effective ${LEGAL_DATE.en}</p>
<p>By installing or using Terra Live you agree to these terms. Apple’s standard Licensed Application End User License Agreement also applies to apps from the App Store.</p>
<h4>1. License</h4>
<p>You receive a non-exclusive license to use the app on your Apple devices for personal purposes. You may not copy, modify, sell the app or circumvent its protection.</p>
<h4>2. Weather, roads and routes are for information only</h4>
<p>Forecasts, hazard warnings (including blizzards, freezing rain and black ice), routes, travel times and places to stop are computed automatically from third-party data and may be inaccurate, outdated or incomplete. They do not replace official warnings, road signs or your own judgment. <b>Every decision behind the wheel is the driver’s.</b> Do not use the app while driving — stop in a safe place first.</p>
<h4>3. News and third-party content</h4>
<p>Headlines and summaries belong to the publishers and are shown from their public feeds with the source named and a link to the original. Information about places (hotels, parking, parks), their names and icons belong to the respective businesses; hotel star classes are derived from the hotel chain and are indicative only. Terra Live is not affiliated with these publishers or businesses and is not responsible for their content, prices or availability.</p>
<h4>4. Third-party services</h4>
<p>The app depends on services of Apple, NASA, NWS, MET Norway, EUMETSAT, CelesTrak, GDACS and news publishers. They may change, be limited or stop without our involvement.</p>
<h4>5. No warranty</h4>
<p>The app is provided “as is”, without warranties of any kind, express or implied, including accuracy, fitness for a particular purpose and uninterrupted operation.</p>
<h4>6. Limitation of liability</h4>
<p>To the fullest extent permitted by law, the developer is not liable for any loss, property damage, injury or other consequence arising from using or being unable to use the app, including from inaccurate weather, road or place data. Where the law does not allow liability to be excluded entirely, it is limited to the amount you paid for the app in the last 12 months.</p>
<h4>7. Changes</h4>
<p>We may update the app and these terms. A new version appears here with a new date; continued use means you accept it.</p>
<h4>8. Governing law</h4>
<p>These terms are governed by the laws of the State of California, USA, without regard to its conflict-of-law rules, unless mandatory law of your country provides otherwise.</p>
<h4>Contact</h4>
<p>{CONTACT}</p>` },

// Required notices: CC BY needs the credit + license; MIT/BSD/ISC need the full license text (loaded from vendor/*.txt when opened)
credits: [
  { what: 'Apple Weather', who: 'Apple Inc.', lic: '<a href="#" data-url="https://weatherkit.apple.com/legal-attribution.html">Weather · data sources</a>' },
  { what: 'Apple Maps, place search, geocoding', who: '© Apple Inc.', lic: 'MapKit' },
  { what: 'US weather forecasts and alerts', who: 'National Weather Service (NOAA)', lic: 'public domain' },
  { what: 'World weather forecasts', who: 'MET Norway (api.met.no)', lic: 'CC BY 4.0' },
  { what: 'Earth imagery (Blue Marble), snow cover', who: 'NASA GIBS / Worldview', lic: 'public domain' },
  { what: 'Live cloud map', who: 'Live Cloud Maps (Matt Eason), CC0 — Contains modified EUMETSAT data', lic: 'EUMETSAT data licence' },
  { what: 'Tropical cyclones', who: 'GDACS — Global Disaster Alert and Coordination System (EC/UN)', lic: 'open data, attribution' },
  { what: 'Satellite orbits (TLE)', who: 'CelesTrak (Dr. T.S. Kelso)', lic: 'free use, attribution' },
  { what: 'ISS 3D model', who: 'NASA', lic: 'public domain (NASA does not endorse this app)' },
  { what: 'Planet and Sun textures', who: 'Solar System Scope (solarsystemscope.com)', lic: 'CC BY 4.0' },
  { what: 'Milky Way panorama', who: 'ESO/S. Brunier', lic: 'CC BY 4.0' },
  { what: 'Star catalogue, constellations', who: 'Hipparcos (ESA 1997); data files from d3-celestial © 2015 Olaf Frohn', lic: 'BSD-3-Clause', file: 'vendor/LICENSE-d3-celestial.txt' },
  { what: 'Country, state and city borders and names, highways', who: 'Natural Earth (naturalearthdata.com)', lic: 'public domain' },
  { what: 'State highways', who: 'U.S. Census Bureau, TIGER/Line 2024', lic: 'public domain' },
  { what: 'Road closures, chain controls, traffic cameras', who: 'Caltrans (California DOT), state DOT work-zone feeds (WZDx), state 511 traffic cameras (UDOT, Idaho 511, AZ511, NDOT, New England 511, 511GA, FL511, 511PA, 511WI, 511LA, CTroads, Alaska 511, Ontario 511); images load from the agencies\' own servers', lic: 'public data' },
  { what: 'Planet positions', who: 'JPL Keplerian elements (Standish), NASA', lic: 'public domain' },
  { what: 'News', who: 'the publishers named on each story, via their public RSS feeds; all rights belong to them', lic: '' },
  { what: 'Place icons', who: 'favicons published by the businesses themselves; trademarks belong to their owners', lic: '' },
  { what: 'three.js', who: '© 2010-2023 three.js authors', lic: 'MIT', file: 'vendor/LICENSE-three.txt' },
  { what: 'satellite.js', who: '© Shashwat Kandadai and UCSC', lic: 'MIT', file: 'vendor/LICENSE-satellite.txt' },
  { what: 'Lucide icons', who: '© Lucide Icons and Contributors', lic: 'ISC', file: 'vendor/LICENSE-lucide.txt' },
],
};
