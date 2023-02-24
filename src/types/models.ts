/* ---------===== custom models ====--------- */
export interface SearchResult {
  RouteNo: string
  RouteName: string
  Direction: string
  Schedules: {
    Destination: string
    ExpectedLeaveTime: string
    ExpectedCountdown: number
    ScheduleStatus: string
  }[]
}


/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
