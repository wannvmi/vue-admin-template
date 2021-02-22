// 验证空格
export const validateTrim = (rule, value, callback) => {
  if (value !== value.trim()) {
    callback(new Error())
  } else {
    callback()
  }
}

// 手机号验证
export const validatePhone = (rule, value, callback) => {
  if (value === null || value === '') {
    callback()
  } else {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      callback(new Error())
    } else {
      callback()
    }
  }
}

// 手机号/固话 验证
export const validateIntlPhone = (rule, value, callback) => {
  if (value === null || value === '') {
    callback()
  } else {
    if (
      !/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(
        value
      ) &&
      !/^1[3456789]\d{9}$/.test(value)
    ) {
      callback(new Error())
    } else {
      callback()
    }
  }
}
