const isOfType = (() => {
  // Создайте простой объект без прототипа
  const type = Object.create(null);

  // Проверьте на наличие нулевого типа
  type.null = (x) => x === null;
  //Проверьте на неопределенный тип
  type.undefined = (x) => x === undefined;
  // Проверьте на наличие типа NIL. Либо нулевой, либо неопределенный
  type.nil = (x) => type.null(x) || type.undefined(x);
  // Проверьте на наличие строк и строкового буквального типа. Например: 's', "s", `str`, new line()
  type.string = (x) =>
    !type.nil(x) && (typeof x === "string" || x instanceof String);
  //Проверьте номер или номер буквального типа. например: 12, 30,5, new Number()
  type.number = (x) =>
    !type.nil(x) && // NaN & Infinity Есть тип"number", И это исключает это
    ((!isNaN(x) && isFinite(x) && typeof x === "number") ||
      x instanceof Number);
  // Проверьте на логический или логический литеральный тип. например: true, false, new Boolean()
  type.boolean = (x) =>
    !type.nil(x) && (typeof x === "boolean" || x instanceof Boolean);
  // Проверьте тип массива
  type.array = (x) => !type.nil(x) && Array.isArray(x);
  // Проверьте наличие объекта или объекта буквального типа. например: {}, new Object(), Object.create(null)
  type.object = (x) => ({}.toString.call(x) === "[object Object]");
  // Проверьте на наличие экземпляра типа
  type.type = (x, X) => !type.nil(x) && x instanceof X;
  // Проверьте на установлен тип
  type.set = (x) => type.type(x, Set);
  // Проверьте тип карты
  type.map = (x) => type.type(x, Map);
  // Проверьте тип даты
  type.date = (x) => type.type(x, Date);

  return type;
})();
