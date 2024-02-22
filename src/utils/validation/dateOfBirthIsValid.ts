import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
dayjs.extend(customParseFormat);

export const dateOfBirthIsValid = (value?: string | null): boolean => dayjs(value, 'YYYY-MM-DD', true).isValid();
