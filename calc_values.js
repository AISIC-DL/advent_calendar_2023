(() => {
  'use strict';

  kintone.events.on([
    'app.record.create.show',
    'app.record.edit.show'
  ], event => {

    const record = event.record;

    const btnCalc = new Kuc.Button({
      type: 'submit',
      content: '<span>計算</span>',
      className: 'btnCalc',
    });
    btnCalc.addEventListener("click", async () => {

      const objRecord = kintone.app.record.get();


      // 日付の計算
      objRecord.record.結果_日付.value = luxon.DateTime.fromISO(objRecord.record.初期値_日付.value)
        .plus({ days: Number(objRecord.record.経過日数_日付.value) }).toFormat('yyyy-MM-dd');


      // 日時の計算
      objRecord.record.結果_日時.value = luxon.DateTime.fromISO(objRecord.record.初期値_日時.value)
        .plus({ days: Number(objRecord.record.経過日数_日時.value), hours: Number(objRecord.record.経過時間_日時.value) });


      // そのまま計算
      let calc1 = 0;
      if (objRecord.record.演算子1.value === '＋') {
        calc1 = Number(objRecord.record.値1_1.value) + Number(objRecord.record.値1_2.value);
      } else if (objRecord.record.演算子1.value === '－') {
        calc1 = Number(objRecord.record.値1_1.value) - Number(objRecord.record.値1_2.value);
      } else if (objRecord.record.演算子1.value === '×') {
        calc1 = Number(objRecord.record.値1_1.value) * Number(objRecord.record.値1_2.value);
      } else if (objRecord.record.演算子1.value === '÷') {
        calc1 = Number(objRecord.record.値1_1.value) / Number(objRecord.record.値1_2.value);
      } else {
        calc1 = 0;
      }

      objRecord.record.結果_計算1.value = calc1;


      // 整数値にして計算
      let calc2 = 0;
      const exp = 1000;
      if (objRecord.record.演算子2.value === '＋') {
        calc2 = (Number(objRecord.record.値2_1.value) * exp + Number(objRecord.record.値2_2.value) * exp) / exp;
      } else if (objRecord.record.演算子2.value === '－') {
        calc2 = (Number(objRecord.record.値2_1.value) * exp - Number(objRecord.record.値2_2.value) * exp) / exp;
      } else if (objRecord.record.演算子2.value === '×') {
        calc2 = (Number(objRecord.record.値2_1.value) * exp * Number(objRecord.record.値2_2.value) * exp) / (exp * exp);
      } else if (objRecord.record.演算子2.value === '÷') {
        calc2 = (Number(objRecord.record.値2_1.value) * exp / Number(objRecord.record.値2_2.value) * exp) / (exp * exp);
      } else {
        calc2 = 0;
      }

      objRecord.record.結果_計算2.value = calc2;


      kintone.app.record.set(objRecord);

    });
    kintone.app.record.getSpaceElement('sp_calc').append(btnCalc);

    return event;
  });
})();
