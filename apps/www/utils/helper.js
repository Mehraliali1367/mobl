const getBlurDataUrl = () => {
  return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACmAKYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDs6KKKAENRtUhqNqAInqB6meoXoAgeoHqZ6hegCJqjNPamGgApwplPWmBKtTJUC1MlICdKmWoUqZaAJVqVaiWpVoAeKdTRTqACiiigAooooAQ1G1SHpUbUAQvUD1M9QPQBC9QOalc1A5oAjY0wmlY0wmmAop61GDTlNAE61MlV1qdKAJ0qZahSplpATLUq1EtSLQBIKdTRTqACiiigAooooAQ1E1SmonoAheq71O9V3oAgc1Xc1M5qu5pgRsaYTSsajJoAcDUimoQakU0AToanSq6VOlAFhKmSoEqdKQEy1KtRLUq0ASCnUwU4UALRRRQAUUUUAI1QvUrVE9AED1Xkqw9VpKAK8lV3NTyVXemBCxqMmnNUZpgOBqRaiFSLQBYSp0qulWEpAWEqdKrpU6UgJlqVaiWpVoAkFOFNFOFIBaKKKYBRRRQA1qiepWqF6AIHqvJVh6ryUAVZKrvVmSqz0wIGqM1I1MIpgAqRaYBUiigCZKsJUCVOlICdKnSoUqZKQEy1KtRLUq0APFPFMFOFIB1FJRQAtFFFMBrVC9TNUT0AV3qvJVl6rvQBVeoHFWXFQOKYFZhTCKmYUzFADQKkUUgFSKKAHoKnSo1FTIKAJUqdaiQVMtICRalWo1qRaAHinCminCgBaKKKQC0UUUwGtUTVK1RNQBC9V3FWXqBxQBWcVAwq04qFhQBWYU3FTFabtoAYBT1FKFp6rQAqiplFMUVKooAkUVMtRqKlWgB61IKYtSCgBwpwpopwoAWiiigBaKKKAGmo2qQ1G1AETVCwqdqiYUAV2FRMKsMKjYUAQFabtqYim7aAIwtPAp22nAUAIoqVRSAU9RQA9RUi0xRUgoAeKeKaKeKAHClpBS0ALRRRQAtFFFADTTDTzTTQBE1RsKlNRsKAImFRkVMRTCKAISKTFSEUmKQDMU4ClxSgUAKBTwKQCngUAKBUgpop4pgOFOFNFPFACiloFFMBaKKKQC0UUUAIaYaeaYaYDDTDUhphpARkUwipDTDSAjIoxTjSUAJilAopRSAAKeKQU4UwHCnCkFOFMBwpwpopwpgOpaSloAKKKKQC0UUUAIaaaKKYDDTDRRSAYaaaKKQDTSUUUgClFFFACiniiimA4U4UUUwHCniiimAtLRRQAUUUUgP/2Q==";
};
const numberFormat = (number) => {
  return new Intl.NumberFormat().format(number);
};

const phoneFormat = (number) => {
  let phoneNumber = number;
  let pattern = /^(\+?98|0)9\d{9}$/;

  if (pattern.test(phoneNumber)) {
    console.log("شماره موبایل صحیح است.");
    return true;
  } else {
    console.log("شماره موبایل نادرست است.");
    return false;
  }
};

const messageFormat = (message) => {
  const errors = [];
  if (typeof message === "object") {
    Object.keys(message).map((key) => {
      errors.push(message[key]);
    });
    return errors.join();
  }
};
const emailFormat = (email) => {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (regex.test(email)) {
    console.log("Valid Email address");
    return true;
  } else {
    console.log("Invalid Email address");
    return false;
  }
};

export {
  getBlurDataUrl,
  numberFormat,
  phoneFormat,
  messageFormat,
  emailFormat,
};
