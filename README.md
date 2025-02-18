#### GeoCoder

Приложение, построенное на основе locationiq, помогает определить координаты, город и страну выбранной точки, также позволяет находить места через поиск

#### Запуск приложения

1. Клонируете репозиторий командой `git clone <ссылка_на_проект>`
2. Устанавливаете зависимости при помощи команды `npm i`
3. Для взаимодействия приложения с [locationiq](https://docs.locationiq.com/reference/reverse-api) необходим плюч доступа, который можно получить по [ссылке](https://locationiq.com/).
4. Создайте в корне проекта файл `.env` и в нём добавьте строчку `VITE_GEOCODE_API_KEY=<ваш_токен_из_3_пункта>`. После этого вы сможете общаться с API.
5. Запустите приложение командой `npm run dev`, dev-server откроется автоматически на порту 5173.

#### Технологии

`React`, `JS`, `React Three Fiber`, `GSAP`, `axios`, `CSS Modules`, `SCSS`

#### Функционал

1. Выбрав точку на земном шаре, приложение показывает координаты, страну, город, если они существуют
2. Земной шар масштабируется на колесико, позволяя точнее выбрать точку
3. В приложении также присутствует поиск места как по названию, так и по координатам, при нажатии Enter, глобус повернется, и появится метка

#### Возможные проблемы

При быстром скролле туда-обратно метка может зависнуть в воздухе
****
без подключения к api на [gh-pages](https://kuzz0k.github.io/GeoCoder/) появляются проблемы анимации при увеличении шара (блок с информацией неправильно трансформируется), также маркер телепортируется без задержки
