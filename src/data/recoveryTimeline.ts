export interface TimelineMilestone {
  minutesSinceQuit: number;
  label: string;
  description: string;
}

// General, widely-cited nicotine-withdrawal patterns adapted for smokeless nicotine (pouches/snus).
// This is educational information, not medical advice - individual experience varies.
export const RECOVERY_TIMELINE: TimelineMilestone[] = [
  {
    minutesSinceQuit: 20,
    label: '20 minut',
    description: 'Tętno i ciśnienie krwi zaczynają wracać w stronę normy.',
  },
  {
    minutesSinceQuit: 8 * 60,
    label: '8 godzin',
    description: 'Poziom nikotyny we krwi zaczyna wyraźnie spadać.',
  },
  {
    minutesSinceQuit: 24 * 60,
    label: '24 godziny',
    description: 'Często najtrudniejszy moment - głód nikotynowy i rozdrażnienie bywają najsilniejsze.',
  },
  {
    minutesSinceQuit: 3 * 24 * 60,
    label: '3 dni',
    description: 'Organizm jest już praktycznie wolny od nikotyny. Objawy odstawienia (niepokój, problemy ze snem) zwykle osiągają szczyt i od teraz powoli słabną.',
  },
  {
    minutesSinceQuit: 7 * 24 * 60,
    label: '1 tydzień',
    description: 'Najtrudniejszy etap fizjologicznego odstawienia masz za sobą. Mózg zaczyna przyzwyczajać się do życia bez nikotyny.',
  },
  {
    minutesSinceQuit: 14 * 24 * 60,
    label: '2 tygodnie',
    description: 'Krążenie krwi zwykle się poprawia, może zmniejszyć się częstotliwość bólów głowy.',
  },
  {
    minutesSinceQuit: 30 * 24 * 60,
    label: '1 miesiąc',
    description: 'Dziąsła i błona śluzowa jamy ustnej mają czas na regenerację - podrażnienia typowe dla snusu zaczynają się goić.',
  },
  {
    minutesSinceQuit: 90 * 24 * 60,
    label: '3 miesiące',
    description: 'Poziom energii i koncentracji często wyraźnie się poprawia, a napady głodu nikotynowego pojawiają się rzadziej i są słabsze.',
  },
  {
    minutesSinceQuit: 365 * 24 * 60,
    label: '1 rok',
    description: 'Długoterminowe ryzyko problemów sercowo-naczyniowych związanych z nikotyną znacząco spada w porównaniu do momentu rzucenia.',
  },
];
