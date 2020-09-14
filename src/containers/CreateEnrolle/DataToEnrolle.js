export const enrolleeControlsData = [['Фио','text','name'],['Дата рождения', 'date','age'],['Адрес','text','address'],['Номер телефона','text','phoneNumber'], ['Номер паспорта','text','passNumber']]
export const certificateControlsData = [['Математика','text','math',1],['Физика','text','physics',1],['Химия','text','chemistry',1],['Биология','text','biology',1],['География','text','geography',1],['Русский язык','text','russianLang',1],['Беларусский язык','text','belLang',1],['Беларусская литература','text','belLitr',1],['Русская литература','text','russianLitr',1],['Физическая культура','text','physicalEduc',1],['Иностранный язык','text','foreignLang',1],['История Беларуси','text','historyBel',1], ['Всемирная история','text','historyWorld',1], ['Информатика','text','computerScince',1]]
export const faculty = {
  'ФКП': [
    {speaciality: {name :'Автоматизированные системы обработки информации', numberOfPlaces: 3}, exam1: 'математика', exam2: 'программирование', exam3: 'охрана труда', numberOfPlaces: 3},
    {speaciality: {name :'Информационные технологии и управление в технических системах', numberOfPlaces: 4}, exam1: 'математика', exam2: 'программирование', exam3: 'охрана труда',numberOfPlaces: 3 },
    {speaciality: {name :'Искусственный интеллект', numberOfPlaces: 5}, exam1: 'математика', exam2: 'программирование', exam3: 'охрана труда',numberOfPlaces: 3 },
    {speaciality: {name :'Промышленная электроника', numberOfPlaces: 6}, exam1: 'математика', exam2: 'программирование', exam3: 'охрана труда', numberOfPlaces: 3},
    {speaciality: {name :'Информационные системы и технологии (в игровой индустрии)', numberOfPlaces: 3}, exam1: 'математика', exam2: 'программирование', exam3: 'охрана труда', numberOfPlaces: 3},
  ],
   'ФИТУ': [
    {speaciality: {name :'Инженерно-психологическое обеспечение информационных технологий', numberOfPlaces: 7}, exam1: 'математика', exam2: 'программирование', exam3: 'английский язык', numberOfPlaces: 3},
    {speaciality: {name :'Информационные системы и технологии в обеспечении промышленной безопасности', numberOfPlaces: 8}, exam1: 'математика', exam2: 'программирование', exam3: 'английский язык',numberOfPlaces: 3 },
    {speaciality: {name :'Медицинская электроника', numberOfPlaces:10}, exam1: 'математика', exam2: 'программирование', exam3: 'английский язык', numberOfPlaces: 3},
    {speaciality: {name :'Моделирование и компьютерное проектирование радиоэлектронных средств', numberOfPlaces: 9}, exam1: 'maляth', exam2: 'ша', exam3: 'eng',numberOfPlaces: 3 },
    {speaciality: {name :'Программируемые мобильные системы', numberOfPlaces: 11}, exam1: 'математика', exam2: 'программирование', exam3: 'английский язык',numberOfPlaces: 3 },
  ],
}