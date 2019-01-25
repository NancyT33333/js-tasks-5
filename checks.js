// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var emitter = require('/home/anna/Рабочий стол/Clone of GitHubrep/js-tasks-5/index.js');

// Определим объект для счетчика нотификаций
var notifications = {
    counter: 0,
    count: function () {
        this.counter++;
    }
};

// Определим для хранения логов
var logger = {
    logs: []
};

// Подписываемся на событие new_notification и сразу оповещаем всех подписчиков
emitter
    .on('new_notification', notifications, notifications.count)
    .on('new_notification', logger, function () {
        this.logs.push('Произошло новое событие new_notification');
    })
    .on('new_notification', logger, function () {
        // this указывает на logger
        this.logs.push('Добавлена новая нотификация. Количество - ' + notifications.counter);
    })
    .emit('new_notification');

// Проверяем количество нотификаций
assert.equal(notifications.counter, 1, 'Получена одна нотификация');

// В логе сохранено событие
// Так как обработчик notifications.count отработал первым,
//  в логах сохранено правильное количество нотификаций
assert.deepEqual(logger.logs, [
    'Произошло новое событие new_notification',
    'Добавлена новая нотификация. Количество - 1'
]);

// На время отключаем логгирование, а затем снова включаем
emitter
    .off('new_notification', logger)
    .emit('new_notification')
    .on('new_notification', logger, function () {
        this.logs.push('Новое событие new_notification!');
    })
    .emit('new_notification');

// Проверяем количество нотификаций
assert.equal(notifications.counter, 3, 'Получено три нотификации');
// Проверяем, что логи были отключены, а затем снова подключены
assert.deepEqual(logger.logs, [
    'Произошло новое событие new_notification',
    'Добавлена новая нотификация. Количество - 1',
    'Новое событие new_notification!'
]);

console.info('OK!');

/**

var lecturer = emitter;

var daria = {
    focus: 5,
    wisdom: 1
};

lecturer.on('begin', daria, function () {
    this.focus += 2;
});

lecturer.on('slide', daria, function () {
    this.wisdom += this.focus * 0.25;
    this.focus += 1;
});

var iakov = {
    focus: 5,
    wisdom: 1
};

lecturer.on('begin', iakov, function () {
    this.wisdom = 0;
});

lecturer.on('slide', iakov, function () {
    this.wisdom += this.focus * 0.5;
    this.focus -= 2;
});

lecturer.on('slide.funny', iakov, function () {
    this.focus += 5;
});

var pyotr = {
    focus: 5,
    wisdom: 1
};

lecturer.on('begin', pyotr, function () {
    this.wisdom = 3;
    this.focus = 10;
});

lecturer.on('slide', pyotr, function () {
    this.wisdom += this.focus * 0.1;
});



var roma = {
    focus: 5,
    wisdom: 1
};

lecturer.on('slide', roma, function () {
    this.wisdom += 1 + this.focus * 0.5;
    this.focus -= 2;
});



lecturer.emit('begin');

lecturer.emit('slide.text');
lecturer.emit('slide.text');
lecturer.emit('slide.text');
lecturer.emit('slide.funny');

lecturer.emit('slide.text');
lecturer.emit('slide.funny');

lecturer.off('slide.funny', iakov);

lecturer.emit('slide.text');
lecturer.emit('slide.funny');

lecturer.emit('slide.text');
lecturer.emit('slide.funny');

lecturer.off('slide', roma);

lecturer.emit('slide.text');
lecturer.emit('slide.text');

lecturer.emit('end');  */