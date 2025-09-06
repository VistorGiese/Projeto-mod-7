export interface Artist {
  name: string;
  photoUrl: string;
  time: string;
}

export interface EventMock {
  date: string;
  eventName: string;
  interestedCount: number;
  artists?: Artist[];
}

export const eventsMock: EventMock[] = [
  {
    date: "03",
    eventName: "Festival de Música Urbana",
    interestedCount: 12,
    artists: [
      {
        name: "Rafael Fernandes",
        photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        time: "20:00",
      },
      {
        name: "Thiago Sanatana",
        photoUrl: "https://randomuser.me/api/portraits/men/33.jpg",
        time: "21:00",
      },
    ],
  },
  {
    date: "10",
    eventName: "Noite do Jazz",
    interestedCount: 8,
    artists: [
      {
        name: "Ana Souza",
        photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        time: "19:30",
      },
    ],
  },
  {
    date: "15",
    eventName: "Rock na Praça",
    interestedCount: 20,
  },
];
