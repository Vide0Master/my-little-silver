
//* Data collector от VideoMaster

//* настройки и библиотеки
const cLog = require('./consoleLogger')
const timeout = 60
let cdata = {}
//* темплейт массива коллектора данных
const data_arr_templ = {
    "umnrkd": [],
    "rqsts": 0,
    "err": 0,
    "usrs_prcsd": []
}

class dataCollector {
    static start() {
        cLog(`Запуск сборщика данных, отчеты будут выводиться в консоль каждых ${timeout} минут.`, "i")
        cdata = data_arr_templ
        setTimeout(() => this.data_out(), 1000 * 60 * timeout)
    }
    static data_in(type, data) {
        switch (type) {
            default: {
                cdata.umnrkd.push({ "tag": type, "dat": data })
            }; break;
            case "rqst": {
                cdata.rqsts += 1
            }; break;
            case "err": {
                cdata.err += 1
            }; break;
            case "uprc": {
                if (!cdata.usrs_prcsd.includes(data))
                    cdata.usrs_prcsd.push(data)
            }; break;
        }
    }
    static data_out() {
        let fline = ""
        fline += `\n################## НАЧАЛО СВОДКИ ЗА ПОСЛЕДНИЕ ${timeout} МИНУТ ##################\n`
        fline += `Неотмеченных запросов: ${cdata.umnrkd.length}\n`
        if (cdata.umnrkd.length > 0) {
            cdata.umnrkd.forEach((itm, i) => {
                fline += `${i}|Тэг:${itm.tag}|Данные:${itm.dat}\n`
            });
        }
        fline += `Всего запросов пользователей: ${cdata.rqsts}\n`
        fline += `Всего ошибок: ${cdata.err}\n`
        fline += `Всего обработанных пользователей: ${cdata.usrs_prcsd.length}\n`
        if (cdata.usrs_prcsd.length > 0) {
            cdata.usrs_prcsd.forEach((nm, i) => {
                fline += `${i + 1}|${nm}\n`
            });
        }
        fline+=`################## КОНЕЦ СВОДКИ ##################`
        cLog(fline, 'i')
        cdata = data_arr_templ
    }
};
module.exports = dataCollector;