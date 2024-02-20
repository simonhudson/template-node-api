import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
dayjs.extend(customParseFormat);

export const dateOfBirthStringIsValid = (value: string | null | undefined): boolean =>
	dayjs(value, 'YYYY-MM-DD', true).isValid();
