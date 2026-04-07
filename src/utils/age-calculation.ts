const BIRTH_DATE = new Date("2007-02-22T12:00:00");

export type AgeData = {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getAgeData(): AgeData {
  const now = new Date();
  const diff = now.getTime() - BIRTH_DATE.getTime();

  const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));

  const remainingAfterYears = diff - years * 365.25 * 24 * 60 * 60 * 1000;
  const days = Math.floor(remainingAfterYears / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingAfterYears % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor(
    (remainingAfterYears % (1000 * 60 * 60)) / (1000 * 60),
  );
  const seconds = Math.floor((remainingAfterYears % (1000 * 60)) / 1000);

  return { years, days, hours, minutes, seconds };
}
