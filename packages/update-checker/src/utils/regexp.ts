// 匹配到script标签的正则表达式
export const scriptReg = /<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/gi;

// 匹配src属性的正则表达式
export const scriptSrcReg = /<script.*?src=["'](.*?)["'].*?><\/script>/i;
