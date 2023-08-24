import * as yup from 'yup';

yup.addMethod(yup.mixed, 'nullableNumber', function (message = `Invalid number`) {
  return this.test('nullableNumber', message, function (value) {
    if (value === undefined || !isNaN(value as number)) {
      return true;
    }

    return this.createError({
      path: this.path,
      message: message
    });
  });
});
