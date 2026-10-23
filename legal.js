// Legal texts shown in Settings. The website renders an identical copy: appstore/site/legal.js — keep the two files the same.
const SUPPORT_EMAIL = 'yauhenistatuyeu1996@yahoo.com';  // set to the support address before App Store submission; the Contact row hides while empty
const LEGAL_DATE = { ru: '22 октября 2026 г.', en: 'October 22, 2026' };

const LEGAL = {
privacy: { ru: `
<h3>Политика конфиденциальности</h3>
<p class="muted">Terra Live · действует с ${LEGAL_DATE.ru}</p>
<p class="muted">Перевод для удобства. Юридически главная версия — английская; при расхождениях действует она.</p>
<p><b>Коротко:</b> в Terra Live нет аккаунтов, рекламы, аналитики и собственных серверов. Мы не собираем, не храним и не продаём персональные данные.</p>
<h4>Геопозиция</h4>
<p>Если вы разрешите доступ, приложение использует вашу геопозицию на устройстве, чтобы показать погоду и новости рядом с вами и подставить начало маршрута. Для этого координаты (без вашего имени, идентификаторов или истории) отправляются напрямую в сервисы погоды и карт, перечисленные ниже, только на время обработки запроса. Геопозиция никогда не используется для рекламы или отслеживания. Доступ можно отозвать в Настройках iOS в любой момент — приложение продолжит работать.</p>
<h4>Уведомления о дороге (фоновая геопозиция)</h4>
<p>Если вы включите «Уведомления о дороге» и разрешите геопозицию «Всегда», приложение в фоне смотрит, где вы находитесь на сохранённом маршруте, и предупреждает о погоде и закрытиях на 2–3 часа вперёд. Сравнение с маршрутом идёт на устройстве; наружу уходят только координаты точек впереди по маршруту — в погодные службы из списка ниже. Уведомления создаются на устройстве, push-сервера нет. Выключите переключатель — фоновая геопозиция сразу перестаёт использоваться.</p>
<h4>Сервисы, к которым обращается приложение</h4>
<ul>
<li>Apple — Карты, названия мест, Apple Weather (координаты места или области карты).</li>
<li>Национальная метеослужба США (NWS), MET Norway — прогноз погоды (координаты).</li>
<li>NASA GIBS — снимки Земли и снежный покров; Live Cloud Maps / EUMETSAT — облака; CelesTrak — орбиты спутников; GDACS — тропические циклоны (запросы без данных о вас).</li>
<li>Издания новостей — их открытые RSS-ленты (запрос ленты, без данных о вас); сайты мест отдыха — их значки (favicon).</li>
<li>Дорожные службы штатов (Caltrans и системы 511) — снимки дорожных камер загружаются прямо с их серверов, когда вы открываете камеру, как обычная веб-страница: сервер видит ваш IP-адрес и больше ничего.</li>
<li>Cloudflare (terra-live.terra-live.workers.dev) и запасной GitHub (raw.githubusercontent.com) — файлы, которые готовит Terra Live: закрытия дорог, список камер, карта облаков, орбиты спутников; запрос файла без данных о вас.</li>
</ul>
<p>Каждый сервис получает только то, что нужно для ответа на запрос, и действует по собственной политике конфиденциальности.</p>
<h4>Ссылки</h4>
<p>«Подробнее» у новости и ссылки в карточках мест открывают сайт издания или заведения в Safari. Там действуют правила этого сайта.</p>
<h4>Что хранится на устройстве</h4>
<p>Ваши настройки (язык новостей, единицы измерения, вид транспорта, фильтры маршрута и трасс), история поездок и активный маршрут для уведомлений о дороге. Они не покидают устройство; поездку можно удалить из истории, а всё сразу — удалив приложение.</p>
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
<h4>Road alerts (background location)</h4>
<p>If you turn on Road alerts and allow location “Always”, the app checks in the background where you are on your saved route and warns you about weather and closures 2–3 hours ahead. The comparison with the route happens on your device; only coordinates of points ahead on the route are sent, to the weather services listed below. Alerts are created on the device; there is no push server. Turn the switch off and background location stops at once.</p>
<h4>Services the app talks to</h4>
<ul>
<li>Apple — Maps, place names, Apple Weather (coordinates of a place or map area).</li>
<li>US National Weather Service (NWS), MET Norway — forecasts (coordinates).</li>
<li>NASA GIBS — Earth imagery and snow cover; Live Cloud Maps / EUMETSAT — clouds; CelesTrak — satellite orbits; GDACS — tropical cyclones (requests carry no data about you).</li>
<li>News publishers — their public RSS feeds (a feed request, nothing about you); websites of places to stop — their icons (favicons).</li>
<li>State transportation agencies (Caltrans and 511 systems) — traffic camera pictures load directly from their servers when you open a camera, like any web page: the server sees your IP address and nothing else.</li>
<li>Cloudflare (terra-live.terra-live.workers.dev), with GitHub (raw.githubusercontent.com) as a backup — files Terra Live prepares: road closures, the camera list, the cloud map and satellite orbits; a file request, nothing about you.</li>
</ul>
<p>Each service receives only what it needs to answer the request and applies its own privacy policy.</p>
<h4>Links</h4>
<p>“Read more” on a story and links on place cards open the publisher’s or business’s website in Safari, where that site’s rules apply.</p>
<h4>What stays on your device</h4>
<p>Your settings (news language, units, vehicle type, route and highway filters), your trip history and the active trip for road alerts. They never leave the device; delete a trip from the history, or everything by deleting the app.</p>
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
<p>Прогнозы погоды, предупреждения об опасных явлениях (включая метель, ледяной дождь и гололёд — «black ice»), закрытия дорог и цепи, снимки дорожных камер, уведомления о дороге, маршруты, время в пути и места остановок рассчитываются автоматически или берутся у сторонних сервисов и могут быть неточными, устаревшими, запоздалыми или неполными. Снимок камеры может быть старым или недоступным; уведомление может прийти с опозданием или не прийти совсем — iOS сама решает, когда приложению работать в фоне. Они не заменяют официальные предупреждения властей, дорожные знаки и вашу собственную оценку обстановки. <b>Все решения за рулём принимает водитель.</b> Не пользуйтесь приложением во время движения — остановитесь в безопасном месте.</p>
<p><b>Terra Live — информационное приложение, а не профессиональная навигационная система.</b> Маршруты строят сервисы Apple; они не учитывают ограничения для грузового и коммерческого транспорта — высоту и вес, опасные грузы, запреты проезда для грузовиков, мосты и тоннели. На коммерческом транспорте пользуйтесь специализированной навигацией для грузовиков и официальными данными дорожных служб.</p>
<h4>3. Новости и чужой контент</h4>
<p>Заголовки и краткие анонсы принадлежат изданиям и показываются из их открытых лент с указанием источника и ссылкой на оригинал. Сведения о местах (отели, стоянки, парки), их названия и значки принадлежат соответствующим компаниям; классы отелей по звёздам определяются по сети отелей и носят ориентировочный характер. Снимки дорожных камер принадлежат дорожным службам, которые их публикуют, и загружаются с их серверов. Terra Live не связан с этими изданиями, компаниями и государственными службами, не одобрен ими и не отвечает за их содержание, цены и доступность.</p>
<h4>4. Сторонние сервисы</h4>
<p>Приложение зависит от сервисов Apple, NASA, NWS, MET Norway, EUMETSAT, CelesTrak, GDACS, дорожных служб штатов (DOT и 511), Бюро переписи США, Cloudflare, GitHub и изданий. Они могут изменяться, ограничиваться или прекращаться без нашего участия.</p>
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
<p>Forecasts, hazard warnings (including blizzards, freezing rain and black ice), road closures and chain controls, traffic camera pictures, road alerts, routes, travel times and places to stop are computed automatically or come from third parties and may be inaccurate, outdated, delayed or incomplete. A camera picture may be old or unavailable; an alert may arrive late or not at all — iOS decides when the app may run in the background. They do not replace official warnings, road signs or your own judgment. <b>Every decision behind the wheel is the driver’s.</b> Do not use the app while driving — stop in a safe place first.</p>
<p><b>Terra Live is an information app, not a professional navigation system.</b> Routes come from Apple's services and do not account for commercial-vehicle restrictions such as height and weight limits, hazardous materials, truck-prohibited roads, bridges and tunnels. In a commercial vehicle, use dedicated truck navigation and official road information.</p>
<h4>3. News and third-party content</h4>
<p>Headlines and summaries belong to the publishers and are shown from their public feeds with the source named and a link to the original. Information about places (hotels, parking, parks), their names and icons belong to the respective businesses; hotel star classes are derived from the hotel chain and are indicative only. Traffic camera pictures belong to the transportation agencies that publish them and load from their servers. Terra Live is not affiliated with or endorsed by these publishers, businesses or government agencies and is not responsible for their content, prices or availability.</p>
<h4>4. Third-party services</h4>
<p>The app depends on services of Apple, NASA, NWS, MET Norway, EUMETSAT, CelesTrak, GDACS, state transportation agencies (DOT and 511), the U.S. Census Bureau, Cloudflare, GitHub and news publishers. They may change, be limited or stop without our involvement.</p>
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
  { what: 'Road closures, chain controls, traffic cameras', who: 'Caltrans (California DOT), state DOT work-zone feeds (WZDx), state 511 traffic cameras (UDOT, Idaho 511, AZ511, NDOT, New England 511, 511GA, FL511, 511PA, 511WI, 511LA, CTroads, Alaska 511, Ontario 511; Iowa 511, INDOT, 511MN, KanDrive, Nebraska 511, COtrip, SD511, Mass511 via the CARS program); images load from the agencies\' own servers', lic: 'public data' },
  { what: 'Planet positions', who: 'JPL Keplerian elements (Standish), NASA', lic: 'public domain' },
  { what: 'News', who: 'the publishers named on each story, via their public RSS feeds; all rights belong to them', lic: '' },
  { what: 'Place icons', who: 'favicons published by the businesses themselves; trademarks belong to their owners', lic: '' },
  { what: 'three.js', who: '© 2010-2023 three.js authors', lic: 'MIT', file: 'vendor/LICENSE-three.txt' },
  { what: 'satellite.js', who: '© Shashwat Kandadai and UCSC', lic: 'MIT', file: 'vendor/LICENSE-satellite.txt' },
  { what: 'Lucide icons', who: '© Lucide Icons and Contributors', lic: 'ISC', file: 'vendor/LICENSE-lucide.txt' },
],
};
